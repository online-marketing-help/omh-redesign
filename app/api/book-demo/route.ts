import { NextResponse } from "next/server";
import { demoTimes } from "@/lib/book-demo";
import { freeSlots } from "@/widget/gates/availability.js";

/*
  Puts a demo request in OMH's Google Calendar at the slot the visitor picked in
  components/BookDemo.tsx. The same submit also posts to /api/enquiry, which
  stores and emails the lead, so a calendar failure never loses one.

  The calendar write runs in a Google Apps Script web app on OMH's own Google
  account (setup and script: docs/google-calendar-booking.md), so there is no
  Cloud project or service-account key to look after. Set on the server:
    GOOGLE_BOOKING_WEBHOOK — the script's web app URL (ends in /exec)
    GOOGLE_BOOKING_SECRET  — the same string as SECRET in the script
*/

const DAY = 864e5;

function script() {
  const webhook = process.env.GOOGLE_BOOKING_WEBHOOK;
  const secret = process.env.GOOGLE_BOOKING_SECRET;
  return webhook && secret ? { webhook, secret } : null;
}

/**
 * Which of the offered times are still free on a date.
 *
 * GET /api/book-demo?date=2026-11-18  ->  { times: ["09:30", "14:00"] }
 *
 * The calendar is asked every time rather than cached. A cached answer is a
 * stale answer, and "free" computed from a stale answer is the double
 * booking this is here to prevent.
 *
 * **`asked: false` means we could not ask, and the form then offers every
 * time, exactly as it did before this route existed.** That is failing
 * open, deliberately: the authoritative check is the lock in the Apps
 * Script, which runs in the same breath as the write and refuses the
 * second booking whatever this route said. A form that offers nothing
 * because a Google script timed out turns away real customers to prevent
 * a clash that is already prevented.
 *
 * What must never happen is the reverse: an answer we could not understand
 * being reported as `asked: true` with an empty list, which reads as "fully
 * booked" and silently closes the diary. So the shape of the reply is
 * checked, not just its `ok` flag.
 */
export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "A date is required." }, { status: 400 });
  }

  /* The same window the POST enforces: a weekday, inside three weeks. The
     POST had it and the GET did not, which left a public, uncached,
     unlimited oracle over the agency's diary for any date anyone typed,
     and a cheap way to exhaust the Apps Script's daily quota. Exhausting
     it matters more than it sounds: every visitor then falls to the
     `asked: false` path, where all six times are offered. */
  const day = new Date(`${date}T12:00:00Z`);
  const ahead = (day.getTime() - Date.now()) / DAY;
  if (day.getUTCDay() % 6 === 0 || !(ahead > -1 && ahead < 21)) {
    return NextResponse.json({ asked: true, times: [], reason: "outside the window" });
  }

  const cfg = script();
  /* Not configured is not the same as nothing free. The booking POST already
     refuses in this state, so saying so here keeps the form honest instead
     of showing six times that cannot be booked. */
  if (!cfg) return NextResponse.json({ asked: false, times: [], reason: "not_configured" });

  try {
    const response = await fetch(cfg.webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: cfg.secret, action: "freebusy", date }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    const d = (await response.json()) as { ok?: boolean; busy?: unknown; allDay?: boolean };
    if (!d?.ok) throw new Error("the script did not answer with ok");
    /* `freeSlots` returns nothing for a `busy` that is not an array, which
       is the right default for it and the wrong thing to label `asked:
       true` here: an older script, a renamed field or a typo would print
       "nothing free" on a completely empty day. An answer we cannot read
       is not an answer. */
    if (!Array.isArray(d.busy)) throw new Error("the script answered without a busy list");

    /* A day blocked out as all-day is "away", so nothing on it is offered,
       whatever the half-hour blocks say. That IS an authoritative empty. */
    if (d.allDay) return NextResponse.json({ asked: true, times: [], reason: "away" });

    return NextResponse.json({
      asked: true,
      times: freeSlots(date, d.busy as never, demoTimes, Date.now()),
    });
  } catch (error) {
    console.error("Could not read availability from Google Calendar:", error);
    return NextResponse.json({ asked: false, times: [], reason: "unreachable" });
  }
}

export async function POST(request: Request) {
  const webhook = process.env.GOOGLE_BOOKING_WEBHOOK;
  const secret = process.env.GOOGLE_BOOKING_SECRET;
  if (!webhook || !secret) {
    console.error("GOOGLE_BOOKING_WEBHOOK/GOOGLE_BOOKING_SECRET are not set — demo not added to the calendar.");
    return NextResponse.json({ error: "Calendar is not configured." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  // Honeypot filled: the enquiry route keeps it as spam; nothing goes in the calendar.
  if (body.hp) return NextResponse.json({ ok: true });

  const text = (key: string) => String(body[key] ?? "").trim().slice(0, 300);
  const date = text("date");
  const time = text("time");
  const name = text("name");
  const email = text("email");

  // Trust boundary: a listed time, on a weekday, within the next three weeks.
  const day = new Date(`${date}T12:00:00Z`);
  const ahead = (day.getTime() - Date.now()) / DAY;
  const validSlot =
    /^\d{4}-\d{2}-\d{2}$/.test(date) && demoTimes.includes(time) && day.getUTCDay() % 6 !== 0 && ahead > -1 && ahead < 21;
  if (!validSlot || !name || !email.includes("@")) {
    return NextResponse.json({ error: "Pick a listed day and time, and add your name and email." }, { status: 400 });
  }

  const business = text("business");
  const description = [
    "Requested on the website. Email the customer to confirm, or offer another time.",
    "",
    `Name: ${name}`,
    `Business: ${business}`,
    `Industry: ${text("industry")}`,
    `Based in: ${text("city")}`,
    `Phone: ${text("phone")}`,
    `Email: ${email}`,
    `Booked from: ${text("page")}`,
  ].join("\n");

  let result = "";
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        date,
        time,
        title: `Demo request: ${name}${business ? `, ${business}` : ""}`,
        description,
        /* So the slot is in their own diary with a reminder on it, rather
           than only in OMH's. The script only adds a guest when this is
           present. */
        guest: email,
      }),
      signal: AbortSignal.timeout(20_000),
    });
    // Apps Script answers 200 whatever happens, so the body is the result.
    result = (await response.text()).trim();
  } catch (error) {
    console.error("Could not add the demo to Google Calendar:", error);
    return NextResponse.json({ error: "Could not add the booking to the calendar." }, { status: 502 });
  }

  /* Somebody got there first, inside the seconds between this form being
     filled in and submitted. Its own status and its own message, because the
     visitor has to do something about it: pick another time. A 502 here would
     read as "our fault, try again later" and they would try the same slot. */
  if (result === "taken") {
    return NextResponse.json(
      { error: "taken", message: "That time has just been taken. Pick another and it is yours." },
      { status: 409 },
    );
  }
  if (result !== "ok") {
    console.error("Apps Script replied:", result.slice(0, 200));
    return NextResponse.json({ error: "Could not add the booking to the calendar." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
