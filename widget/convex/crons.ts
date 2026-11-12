import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

/* =========================================================================
   Scheduled work.

   One job so far, and it exists because of a promise the attachment code
   made and could not keep on its own: a file that is uploaded and never
   attached has nothing to delete it at the time, because nothing knows
   whether the attach is still coming.
   ========================================================================= */

const crons = cronJobs();

/* Nightly, well outside UK office hours, because it is housekeeping and
   should never be competing with a visitor's upload. */
crons.daily(
  "reclaim unattached files",
  { hourUTC: 3, minuteUTC: 20 },
  internal.attachments.sweepOrphans,
  {},
);

export default crons;
