/* What the assistant's reply looks like by the time somebody reads it.

   The widget renders every bubble with `textContent`, never innerHTML,
   because the knowledge base is edited by people and must never be able to
   inject markup into a visitor's browser. The consequence is that markdown
   is not rendered, it is displayed: a model that writes "**SEO Seed:** £850"
   puts the asterisks on screen, and a bubble full of asterisks is the single
   clearest signal that nobody is on the other end.

   The prompt tells the model not to write them. This removes them anyway,
   because a prompt is a request to a model and this is a guarantee.

   What it deliberately does NOT do is shorten anything. A reply cut off mid
   sentence is worse than a long one: the visitor loses the part that
   mattered and cannot tell that anything is missing. Length belongs to the
   prompt, and `looksOverlong` exists so that when the prompt is losing, it
   shows up somewhere rather than nowhere.

   Plain JavaScript, no imports, like everything in gates/: the same text is
   asserted by the tests and bundled into the "Clean Reply" Code node in
   01-chat. */

/* Long enough that a real answer with a price, a condition and a question
   fits comfortably; short enough that a four-package dump does not. Measured
   in characters because that is what a bubble is bounded by. */
var LONG_CHARS = 420;

function tidy(raw) {
  if (raw == null) return "";
  var t = String(raw);

  /* A fenced block, which the model occasionally wraps a whole answer in. */
  t = t.replace(/```+[a-zA-Z]*\n?/g, "");

  /* Headings: the words are wanted, the hashes are not. */
  t = t.replace(/^[ \t]*#{1,6}[ \t]+/gm, "");

  /* Bold and emphasis. Paired markers only, and non-greedy, so the pair that
     opens nearest the content is the pair that closes it. */
  t = t.replace(/\*\*([^\n*]+?)\*\*/g, "$1");
  t = t.replace(/__([^\n_]+?)__/g, "$1");

  /* Single-asterisk emphasis, but only where it really is emphasis: an
     asterisk with no space after it, and a matching one with no space
     before. "5 * 3" keeps its asterisk because of that; "*monthly*" does
     not. */
  t = t.replace(/\*(\S[^\n*]*?\S|\S)\*/g, "$1");

  /* Underscore emphasis has to be stricter still, because `session_id` and
     `first_name` are words that appear in this product's own conversations.
     Only when the underscores sit at the edge of the word. */
  t = t.replace(/(^|[\s(])_(\S[^\n_]*?\S|\S)_(?=[\s.,!?)]|$)/g, "$1$2");

  /* A list the model wrote despite being asked not to. The marker becomes
     something that reads as text rather than as syntax, and NOTHING is
     removed: deleting a package from a price answer is the one edit that
     could not be forgiven. */
  t = t.replace(/^[ \t]*[-*+][ \t]+/gm, "• ");

  /* A wall of blank lines, down to one blank line, which is a paragraph. */
  t = t.replace(/\n{3,}/g, "\n\n");

  /* Trailing spaces on each line, then the ends. */
  t = t.replace(/[ \t]+$/gm, "");
  return t.trim();
}

/**
 * Does this read as too long for a chat bubble?
 *
 * Reported, never acted on. It is here so that "the assistant has started
 * writing essays again" is something that can be seen in the logs and
 * asserted in a test, rather than something somebody notices in a client
 * meeting three weeks later.
 */
function looksOverlong(text) {
  return String(text == null ? "" : text).length > LONG_CHARS;
}

export { tidy, looksOverlong, LONG_CHARS };
