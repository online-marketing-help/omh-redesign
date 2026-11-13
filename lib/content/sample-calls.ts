// The AI voice agent sample call recordings (client, 22 Oct 2026), one per industry, in public/audio/.
// Lengths read from the MP3 headers. Used by the Sample calls carousel on /ai-voice-agents (client,
// 22 Oct 2026) and the clinic call grid on /ai-voice-agents/healthcare, so a file or length only changes here.
// Cards use the player hooks in VoiceAgentsScript ([data-audio-card], [data-audio-toggle], [data-audio-wave]).

export const sampleCalls = {
  estate: { file: "estate-agency-sample-call.mp3", seconds: 75, icon: "home", tint: 1, name: "Estate agency call" },
  dental: { file: "dental-sample-call.mp3", seconds: 51, icon: "tooth", tint: 3, name: "Dental call" },
  healthcare: { file: "healthcare-sample-call.mp3", seconds: 76, icon: "stethoscope", tint: 2, name: "Clinic call" },
  plumbers: { file: "plumbers-sample-call.mp3", seconds: 55, icon: "drop", tint: 4, name: "Plumber call" },
  heating: { file: "heating-sample-call.mp3", seconds: 75, icon: "flame", tint: 1, name: "Heating engineer call" },
  builders: { file: "builders-sample-call.mp3", seconds: 90, icon: "hard-hat", tint: 3, name: "Builder call" },
  law: { file: "law-firm-sample-call.mp3", seconds: 65, icon: "scale", tint: 2, name: "Law firm call" },
  cars: { file: "car-dealership-sample-call.mp3", seconds: 83, icon: "car", tint: 4, name: "Car dealership call" },
  // /ai-voice-agents/healthcare, one per clinic call type (client, 22 Oct 2026)
  clinicBooking: { file: "AI Voice Agent for Clinics & Healthcare/1-Appointment Booking.MP3", seconds: 76, icon: "calendar", tint: 1, name: "Clinic appointment booking call" },
  clinicReschedule: { file: "AI Voice Agent for Clinics & Healthcare/2-Appointment Cancellation & Rescheduling.MP3", seconds: 52, icon: "replay", tint: 3, name: "Clinic rescheduling call" },
  clinicFaqs: { file: "AI Voice Agent for Clinics & Healthcare/3-General Information & FAQs.MP3", seconds: 49, icon: "message", tint: 2, name: "Clinic FAQ call" },
  clinicNewPatient: { file: "AI Voice Agent for Clinics & Healthcare/4-New Patient Registration & Enquiry.MP3", seconds: 58, icon: "user", tint: 4, name: "Clinic new patient call" },
  clinicReminder: { file: "AI Voice Agent for Clinics & Healthcare/5-Appointment Follow-up & Reminders.MP3", seconds: 36, icon: "clock", tint: 1, name: "Clinic reminder call" },
  clinicHandover: { file: "AI Voice Agent for Clinics & Healthcare/6-Patient Enquiry, Triage Routing & Human Handover.MP3", seconds: 52, icon: "phone-forwarded", tint: 3, name: "Clinic triage handover call" },
} as const;
export type SampleCall = keyof typeof sampleCalls;

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const bars = [30, 55, 80, 45, 65, 90, 50, 35, 70, 85, 40, 60, 75, 30, 50, 65, 45, 80, 55, 35, 60, 40, 70, 90, 50, 65, 30, 75, 45, 85, 55, 40];
const svg = (name: string, cls: string) => `<svg class="icon${cls ? " " + cls : ""}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;

type Call = { file: string; seconds: number; icon: string; tint: number; name: string };

/** A playable sample call card. `offset` shifts the waveform so neighbouring cards don't look identical. */
export const sampleCard = (key: SampleCall, opts: { title: string; caption: string; offset?: number }) => card(sampleCalls[key], opts);

/**
 * One industry's recordings by call type (client, 3 Nov 2026), titles verbatim from the client's script docs.
 * Files live at public/audio/<folder>/<n>-<title>.mp3, with an em dash in the title written as "-".
 */
export const callTypeCards = (folder: string, name: string, calls: [n: number, title: string, seconds: number, icon: string, caption: string][]) =>
  calls
    .map(([n, title, seconds, icon, caption], i) =>
      card({ file: `${folder}/${n}-${title.replace(/—/g, "-")}.mp3`, seconds, icon, tint: [1, 3, 2, 4][i % 4], name: `${name}: ${title}` }, { title, caption, offset: i * 4 }),
    )
    .join("\n");

function card(c: Call, { title, caption, offset = 0 }: { title: string; caption: string; offset?: number }) {
  const wave = bars.map((_, i) => `<i style="--h:${bars[(i + offset) % bars.length]}%"></i>`).join("");
  return `      <figure class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]" data-audio-card>
        <div class="audio-panel relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-${c.tint})]">
          <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true">${svg(c.icon, "!h-[150px] !w-[150px]")}</span>
          <button type="button" class="audio-toggle" data-audio-toggle aria-label="Play the recording: ${title}" data-track="feedback_audio_play" data-track-name="${c.name}">${svg("play", "i-play")}${svg("pause", "i-pause")}</button>
          <div class="absolute inset-x-4 bottom-3 flex items-center gap-3">
            <div class="audio-wave" data-audio-wave role="slider" tabindex="0" aria-label="Recording position" aria-valuemin="0" aria-valuemax="${c.seconds}" aria-valuenow="0" aria-valuetext="0:00 of ${clock(c.seconds)}">${wave}</div>
            <span class="audio-time tnum" data-audio-time>0:00 / ${clock(c.seconds)}</span>
          </div>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">${title}</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-muted">${caption}</p>
        </figcaption>
        <audio preload="none" src="/audio/${c.file.split("/").map(encodeURIComponent).join("/")}" data-audio></audio>
      </figure>`;
}
