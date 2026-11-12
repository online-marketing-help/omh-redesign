# Demo bookings → Google Calendar

The "Book a 30-minute demo" tab (`components/BookDemo.tsx`) sends each request
two ways:

1. `/api/enquiry`: stored in Sanity and emailed like every other form, with the
   page it came from in the subject (`New enquiry — Demo booking (/seo-services)`).
2. `/api/book-demo`: adds a 30-minute event to OMH's Google Calendar at the slot
   the visitor picked, with their details and the full page URL in the
   description.

The calendar step runs through a Google Apps Script web app on OMH's own Google
account, so there is no Google Cloud project or service-account key. Until it is
set up, step 1 still works and the route logs `Calendar is not configured`.

## Setup (about 5 minutes)

1. Signed in to the Google account whose calendar should get the bookings, open
   <https://script.new>. Name the project "OMH demo bookings".
2. Replace everything in `Code.gs` with the script below. Change `SECRET` to a
   long random string, and keep a copy of it for step 6.
3. **Project Settings** (gear icon): check that **Time zone** is
   `(GMT+00:00) London`.
4. **Deploy → New deployment**. Type: **Web app**. Execute as: **Me**. Who has
   access: **Anyone**. Click Deploy.
5. Approve the permissions prompt. Google warns that the app is unverified,
   because it is your own script: Advanced → Go to OMH demo bookings. Copy the
   **Web app URL** (it ends in `/exec`).
6. Add two environment variables wherever the site runs (Vercel: Settings →
   Environment Variables, Production and Preview; VPS: `/opt/omh/.env`), then
   redeploy:
   ```
   GOOGLE_BOOKING_WEBHOOK=<the Web app URL>
   GOOGLE_BOOKING_SECRET=<the same string as SECRET>
   ```
7. Test it: book a slot on any service page and check the calendar.

"Anyone" access is safe here: the script does nothing unless the request
carries the secret, and only the site's server knows it.

If you edit the script later, use **Deploy → Manage deployments → Edit →
Version: New version**. That keeps the same URL. A *new* deployment gets a new
URL, and the env var would need updating.

## Script

```js
// OMH demo bookings: adds website demo requests to this account's calendar.
const SECRET = 'paste-a-long-random-string-here';
// Leave as-is for your main calendar, or paste a shared calendar's ID
// (Calendar settings -> Integrate calendar -> Calendar ID).
const CALENDAR_ID = 'primary';

const SLOT_MINUTES = 30;

function calendar_() {
  return CALENDAR_ID === 'primary'
    ? CalendarApp.getDefaultCalendar()
    : CalendarApp.getCalendarById(CALENDAR_ID);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.secret !== SECRET) return ContentService.createTextOutput('forbidden');

  // What is already in the diary on this date. The website asks this before
  // it offers any times, so a slot that is taken is never offered at all.
  if (data.action === 'freebusy') {
    const dayStart = Utilities.parseDate(data.date + ' 00:00', 'Europe/London', 'yyyy-MM-dd HH:mm');
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
    const busy = calendar_().getEvents(dayStart, dayEnd)
      // An all-day block is "away", not a 30-minute meeting, so it rules the
      // whole day out rather than one slot.
      .filter(function (ev) { return !ev.isAllDayEvent(); })
      .map(function (ev) {
        return {
          start: Utilities.formatDate(ev.getStartTime(), 'Europe/London', "yyyy-MM-dd'T'HH:mm:ss"),
          end: Utilities.formatDate(ev.getEndTime(), 'Europe/London', "yyyy-MM-dd'T'HH:mm:ss"),
        };
      });
    const allDay = calendar_().getEventsForDay(dayStart)
      .some(function (ev) { return ev.isAllDayEvent(); });
    return json_({ ok: true, busy: busy, allDay: allDay });
  }

  const start = Utilities.parseDate(data.date + ' ' + data.time, 'Europe/London', 'yyyy-MM-dd HH:mm');
  const end = new Date(start.getTime() + SLOT_MINUTES * 60 * 1000);

  // THE LOCK IS THE WHOLE POINT. Two people submitting the same slot in the
  // same second both saw it free on the website, and only a check that is in
  // the same breath as the write can refuse the second one. Everything before
  // this is a courtesy; this is the guarantee.
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return ContentService.createTextOutput('busy');
  try {
    const clash = calendar_().getEvents(start, end)
      .filter(function (ev) { return !ev.isAllDayEvent(); });
    if (clash.length) return ContentService.createTextOutput('taken');

    const options = { description: data.description };
    // An invite, so it is in the visitor's own diary and they get the
    // reminder. Only when an email came through: createEvent throws on an
    // empty guest string rather than ignoring it.
    if (data.guest) {
      options.guests = data.guest;
      options.sendInvites = true;
    }
    calendar_().createEvent(data.title, start, end, options);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}
```

Three answers now come back from the booking call, and the website treats each
one differently: `ok`, `taken` (somebody got there first, offer the other
times) and `busy` (the lock could not be taken in twenty seconds, so try
again). Anything else is a failure.

## What it does not do (yet)

- **Working hours are not read from the calendar.** The six offered times are
  still the fixed list in `lib/book-demo.ts`; what the calendar decides is
  which of them are free. A week where OMH works different hours has to be
  blocked out in the diary to show on the site.
