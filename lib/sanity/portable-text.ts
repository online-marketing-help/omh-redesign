import { toHTML, type PortableTextHtmlComponents } from "@portabletext/to-html";

// Serialises a post body to the bare tags .insight-prose styles, matching the
// markup the site rendered before Sanity so article pages are unchanged.
// The TOC builder (lib/content/insight-toc) parses this HTML, so the tag set
// here and the CSS there have to stay in step.

const escape = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Sanity's CDN forces a download (instead of opening a PDF in the tab) when
// `?dl=<filename>` is on the asset URL.
const downloadHref = (url: unknown, filename: unknown) =>
  url ? `${escape(url)}?dl=${encodeURIComponent(String(filename ?? "download"))}` : "#";

const prettySize = (bytes: unknown) => {
  const n = Number(bytes);
  if (!n) return "";
  return n >= 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
};

const downloadIcon =
  '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>';

const components: Partial<PortableTextHtmlComponents> = {
  block: {
    normal: ({ children }) => `<p>${children}</p>`,
    h2: ({ children }) => `<h2>${children}</h2>`,
    h3: ({ children }) => `<h3>${children}</h3>`,
    h4: ({ children }) => `<h4>${children}</h4>`,
    h5: ({ children }) => `<h5>${children}</h5>`,
    blockquote: ({ children }) => `<blockquote>${children}</blockquote>`,
  },
  marks: {
    strong: ({ children }) => `<strong>${children}</strong>`,
    em: ({ children }) => `<em>${children}</em>`,
    link: ({ children, value }) => {
      const rel = value?.newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escape(value?.href)}"${rel}>${children}</a>`;
    },
    fileLink: ({ children, value }) =>
      `<a class="insight-download insight-download--inline" href="${downloadHref(value?.url, value?.filename)}" download>${downloadIcon}<span>${children}</span></a>`,
  },
  types: {
    download: ({ value }) => {
      const label = escape(value?.label || value?.filename || "Download");
      const meta = [String(value?.extension ?? "").toUpperCase(), prettySize(value?.size)].filter(Boolean).join(" · ");
      return `<p class="insight-download-row"><a class="insight-download" href="${downloadHref(value?.url, value?.filename)}" download>${downloadIcon}<span>${label}</span>${meta ? `<small>${meta}</small>` : ""}</a></p>`;
    },
    image: ({ value }) =>
      `<img src="${escape(value.src)}" alt="${escape(value.alt)}" loading="lazy" decoding="async">`,
    // Same markup as the legacy pasted <aside class="omh-callout"> HTML, so one
    // CSS rule styles both.
    callout: ({ value }) =>
      `<aside class="omh-callout" role="note"><p class="omh-callout-title"><strong>${escape(value?.title)}</strong></p>${toHTML(value?.body ?? [], { components })}</aside>`,
    // Posts whose original WordPress markup did not survive conversion to rich
    // text are stored verbatim, so those pages render exactly as they always did.
    rawHtml: ({ value }) => value?.html ?? "",
  },
  list: {
    bullet: ({ children }) => `<ul>${children}</ul>`,
    number: ({ children }) => `<ol>${children}</ol>`,
  },
  listItem: {
    bullet: ({ children }) => `<li>${children}</li>`,
    number: ({ children }) => `<li>${children}</li>`,
  },
};

export const toArticleHtml = (blocks: unknown) =>
  Array.isArray(blocks) ? toHTML(blocks, { components }) : "";
