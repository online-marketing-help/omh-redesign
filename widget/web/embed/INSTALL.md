# OMH Assistant: installing it on onlinemarketinghelp.co.uk

Written for the web developer who maintains the WordPress site.

One file, one script tag. No build step, no plugin, no npm.

---

## What it is

A chat and voice assistant that answers from Online Marketing Help's own
content: services, what each package includes, prices, contract lengths, and
booking a free 30 minute consultation. It never invents an answer. Anything
outside what it has been given is passed to the team instead.

It appears as a small "Ask the assistant" pill in the bottom right. Everything
else is hidden until a visitor opens it.

---

## Install

Add this one line immediately before `</body>` on every page:

```html
<script src="https://ohm-assistant-online-marketing-help.vercel.app/ohm-assistant.js" defer></script>
```

The file is hosted on Online Marketing Help's own Vercel account, so there is
nothing to upload and updates reach the site without touching WordPress.

If you would rather serve it yourself, download `ohm-assistant.js` from this
repository, put it in `wp-content/uploads/ohm/`, and point the tag at
`/wp-content/uploads/ohm/ohm-assistant.js` instead. Both work; the hosted copy
just means you are not the one redeploying when the widget changes.

In WordPress that is usually the theme's `footer.php`, or a "scripts in footer"
box if the theme has one. Putting it in the header also works; `defer` keeps it
from blocking the page either way.

That is the whole installation. The endpoints are already baked into the file.

### If the theme has no footer hook

Any plugin that inserts raw HTML into the footer will do. Add the same one line.
Do not paste the contents of the `.js` file into the page.

---

## See it working first

Open **https://ohm-assistant-online-marketing-help.vercel.app**
and try it there before you touch the site. That page is the same widget, the
same live backend, just hosted on its own.

## Checking it worked on the site

1. Load any page. A dark "Ask the assistant" pill appears bottom right.
2. Click it, type **"How much is local SEO?"**, press enter. Within a few
   seconds it should answer with £450, £600 and £700 a month, and say the
   figures are monthly with a 50% deposit.
3. Open the **Voice** tab, press **Start call**, allow the microphone. You
   should be talking to it within a couple of seconds.

If the chat replies "Sorry, I cannot reach our system right now", see
**Troubleshooting** below.

---

## Options

Set these on the script tag. None are required.

| Attribute | Default | What it does |
|---|---|---|
| `data-position` | `right` | `left` moves the pill and panel to the bottom left. |
| `data-chat-url` | the live chat webhook | Point the chat at a different endpoint. |
| `data-voice-token-url` | the live voice webhook | Point voice at a different endpoint. |

```html
<script src="https://ohm-assistant-online-marketing-help.vercel.app/ohm-assistant.js" defer
        data-position="left"></script>
```

### Opening it from your own button

The site can open the panel from an existing "Chat to us" link:

```html
<button onclick="OhmAssistant.open()">Chat to us</button>
<button onclick="OhmAssistant.open('voice')">Talk to us</button>
```

`OhmAssistant.close()` closes it again.

---

## Things worth knowing

**It will not fight your theme.** The whole widget lives in a shadow root, so
theme CSS cannot reach inside it and its CSS cannot leak out. This was tested
against a page that forces `button { all: unset; font: 28px Comic Sans }` and
`svg { width: 200px }`; the panel renders correctly and the theme's own buttons
are untouched.

**Including it twice is safe.** If both the theme and a plugin load it, the
second copy does nothing rather than opening a second panel.

**Voice is lazy.** The voice library is only downloaded when someone opens the
Voice tab. A visitor who only chats downloads 5.4 KB.

**The domain matters.** The endpoints only accept requests from an allow-list:
the live site and `www`, the preview at `omh-redesign.vercel.app`, and
`localhost` on ports 3000, 3001 and 3002 for development. This is deliberate:
it stops anyone else embedding the widget and spending our budget.

It also means **it will not work from any other domain** until that domain is
added. The symptom is specific and worth recognising: the pill appears, the
panel opens, and every message comes back "Sorry, I cannot reach our system
right now". That is a blocked origin, not a broken agent. Send the URL and it
takes a minute to add.

Next takes port 3000 if it is free and walks up when it is not, which is why
3001 and 3002 are on the list too.

**The conversation is kept.** Chat and voice share one thread, so a caller who
typed first does not have to repeat themselves, and what the voice agent says is
written into the same window where the visitor can read it back.

---

## Troubleshooting

**"Sorry, I cannot reach our system right now."**
The browser could not reach the webhook. Open the browser console. If you see a
CORS message naming the origin, the domain you are testing from is not on the
allow-list; see above. Anything else means the n8n workflow is paused.

**The pill does not appear at all.**
Check the script actually loads (Network tab, 200 not 404), and that it is not
being deferred into a part of the page the theme never renders. There is no
error message for a file that was never fetched.

**The voice tab says the microphone was blocked.**
The site must be served over HTTPS, and the visitor must allow the microphone.
Browsers refuse microphone access on plain HTTP, except on `localhost`.

**Nothing works after a theme update.**
Theme updates overwrite `footer.php`. Re-add the script tag. Keeping the tag in
a plugin or a child theme avoids this.

---

## For whoever maintains this later

The file is built, not written by hand:

```
node web/embed/build.mjs                   # src/embed.js -> dist/ohm-assistant.js
node web/embed/test/verify.mjs             # Chromium, with a fake microphone
node web/embed/test/verify.mjs webkit      # Safari engine
```

`verify.mjs` drives the built file in a real browser against the live webhooks,
inside a deliberately hostile page, and asserts on what a visitor sees. It needs
port 4477, which is on the webhook's CORS allow-list. Last run: 22 passed in
Chromium, 21 in WebKit, zero failures.
