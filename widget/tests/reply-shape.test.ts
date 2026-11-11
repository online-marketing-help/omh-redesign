import { tidy, looksOverlong } from "../gates/reply-shape.js";

/* =========================================================================
   What the assistant's reply looks like by the time a visitor sees it.

   The widget renders every bubble with `textContent`, never innerHTML, and
   that is deliberate: the knowledge base is edited by people and must never
   be able to inject markup. The consequence is that markdown is not
   rendered, it is DISPLAYED. A model that writes "**SEO Seed:** £850"
   produces a bubble containing the asterisks, which is exactly what makes a
   reply read as machine output.

   So the asterisks are removed here rather than hoped away in the prompt. A
   prompt is an instruction to a model and the model is free to ignore it;
   this runs on every reply.

   What it must NOT do is shorten anything. A reply cut off mid-sentence is
   worse than a long one: the visitor loses the part that mattered and has no
   way to know something was removed. Length is the prompt's job, and
   `looksOverlong` exists only so that failure is visible rather than silent.
   ========================================================================= */

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}

console.log("\n== markdown is not rendered here, so it must not be written ==");
{
  eq("bold loses its asterisks and keeps its words",
     tidy("**SEO Seed:** £850 a month"), "SEO Seed: £850 a month");
  eq("underscore bold too", tidy("__SEO Seed__ is the entry package"), "SEO Seed is the entry package");
  eq("single-asterisk emphasis goes", tidy("That is *monthly*, not a total"), "That is monthly, not a total");
  eq("a heading becomes a line", tidy("### Our packages\nFour of them."), "Our packages\nFour of them.");
  eq("a code fence goes", tidy("```\n£850 a month\n```"), "£850 a month");

  /* The one that matters most: a price must survive untouched. */
  eq("a price keeps its punctuation", tidy("**SEO Tree:** £4,100 a month"), "SEO Tree: £4,100 a month");
  eq("an email address is not emphasis",
     tidy("Email support@onlinemarketinghelp.co.uk"), "Email support@onlinemarketinghelp.co.uk");
  eq("an underscore inside a word stays",
     tidy("The field is called session_id here"), "The field is called session_id here");
  eq("a bare asterisk is left alone", tidy("5 * 3 is 15"), "5 * 3 is 15");
}

console.log("\n== a list, if one gets through ==");
{
  /* The prompt tells it not to write lists. This is what happens when it
     does anyway: the content is kept, because deleting a package from a
     price answer is the one unforgivable edit. */
  eq("a dash bullet becomes a middot",
     tidy("- SEO Seed, £850\n- SEO Shoot, £1,600"), "• SEO Seed, £850\n• SEO Shoot, £1,600");
  eq("an asterisk bullet too", tidy("* Websites\n* SEO"), "• Websites\n• SEO");
  eq("a numbered list keeps its numbers", tidy("1. Name\n2. Phone"), "1. Name\n2. Phone");
  eq("nothing is dropped from a list",
     tidy("- a\n- b\n- c").split("\n").length, 3);
}

console.log("\n== whitespace ==");
{
  eq("a wall of blank lines closes up", tidy("One.\n\n\n\n\nTwo."), "One.\n\nTwo.");
  eq("one blank line is a paragraph and survives", tidy("One.\n\nTwo."), "One.\n\nTwo.");
  eq("trailing space goes", tidy("  Hello.   "), "Hello.");
  eq("empty in, empty out", tidy(""), "");
  eq("nothing in, empty out", tidy(null as never), "");
}

console.log("\n== length is reported, never enforced ==");
{
  const long = "A sentence about packages. ".repeat(20);
  eq("a long reply is not cut", tidy(long).length > 400, true);
  eq("but it is reported as overlong", looksOverlong(tidy(long)), true);
  eq("a normal reply is not",
     looksOverlong("SEO runs from £850 to £4,100 a month on a six to nine month contract. " +
                   "Which one fits depends on how competitive your keywords are. " +
                   "Want me to go through what the entry package covers?"), false);
  /* The boundary is a real one, not a round number nobody chose. */
  eq("the threshold is a sentence count a person would notice",
     looksOverlong("One. Two. Three. Four."), false);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
