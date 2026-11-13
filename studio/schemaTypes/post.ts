import { defineArrayMember, defineField, defineType } from "sanity";
import { DownloadIcon } from "@sanity/icons/Download";
import { BulbOutlineIcon } from "@sanity/icons/BulbOutline";

// Mirrors lib/content/insights-types.ts. The pull script (scripts/pull-sanity.mjs)
// serialises these documents back into content/insights-*.json, so field names
// here intentionally match the InsightPost type the site already renders.
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Details" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      group: "content",
      description: "The web address for this post, e.g. onlinemarketinghelp.co.uk/your-post-name",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "One or two sentences shown on the Insights listing page.",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "featuredImage",
      title: "Main image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers and search engines.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Article",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          // Only the styles the site's .insight-prose CSS already targets — adding
          // more here would render unstyled. ponytail: no custom block types until asked.
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Heading 5", value: "h5" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bulleted", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "Address",
                    type: "url",
                    validation: (rule) =>
                      rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                  defineField({
                    name: "newTab",
                    title: "Open in a new tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
              // Inline download: highlight words, attach a file. Renders as a small
              // brand button sitting in the sentence, so it never breaks the paragraph.
              {
                name: "fileLink",
                title: "Download file",
                icon: DownloadIcon,
                type: "object",
                fields: [
                  defineField({
                    name: "file",
                    title: "File",
                    type: "file",
                    validation: (rule) => rule.required(),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
        // "The short version" box: a title and a few points. Replaces pasting the
        // <aside class="omh-callout"> HTML by hand; the site styles it in both themes.
        defineArrayMember({
          type: "object",
          name: "callout",
          title: "Callout box",
          icon: BulbOutlineIcon,
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              initialValue: "The short version",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "body",
              title: "Points",
              type: "array",
              description: "Usually a bulleted list. Plain paragraphs work too.",
              validation: (rule) => rule.required(),
              of: [
                defineArrayMember({
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [
                    { title: "Bulleted", value: "bullet" },
                    { title: "Numbered", value: "number" },
                  ],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Italic", value: "em" },
                    ],
                    annotations: [
                      {
                        name: "link",
                        title: "Link",
                        type: "object",
                        fields: [
                          defineField({
                            name: "href",
                            title: "Address",
                            type: "url",
                            validation: (rule) =>
                              rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
                          }),
                          defineField({
                            name: "newTab",
                            title: "Open in a new tab",
                            type: "boolean",
                            initialValue: false,
                          }),
                        ],
                      },
                    ],
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({ title: title || "Callout", subtitle: "Callout box" }),
          },
        }),
        // Downloadable file (PDF, zip, template…) shown as a button in the article.
        // Stored as a Sanity file asset, same CDN as images. ponytail: no size cap in
        // schema; Sanity's own asset limit applies.
        defineArrayMember({
          type: "object",
          name: "download",
          title: "Download button",
          icon: DownloadIcon,
          fields: [
            defineField({
              name: "file",
              title: "File",
              type: "file",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Button text",
              type: "string",
              description: "e.g. Download the checklist (PDF). Leave blank to use the file name.",
              validation: (rule) => rule.max(80),
            }),
          ],
          preview: {
            select: { title: "label", file: "file.asset.originalFilename" },
            prepare: ({ title, file }) => ({ title: title || file || "Download", subtitle: file ? `Download · ${file}` : "Download" }),
          },
        }),
        // The 6 legacy posts containing tables land here verbatim, so the import
        // is lossless. Not offered as a new-content option in any meaningful way.
        defineArrayMember({
          type: "object",
          name: "rawHtml",
          title: "Raw HTML (legacy)",
          fields: [defineField({ name: "html", type: "text", rows: 8 })],
          preview: { select: { title: "html" }, prepare: ({ title }) => ({ title: "HTML block", subtitle: String(title ?? "").slice(0, 60) }) },
        }),
      ],
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "reference",
      group: "meta",
      to: [{ type: "topic" }],
      description: "The single topic this post is filed under on the Insights page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "meta",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      group: "meta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Feature on the Insights page",
      type: "boolean",
      group: "meta",
      description: "Featured posts appear in the highlighted row at the top. Pick three.",
      initialValue: false,
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "meta",
      of: [defineArrayMember({ type: "reference", to: [{ type: "term" }] })],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "meta",
      of: [defineArrayMember({ type: "reference", to: [{ type: "term" }] })],
    }),
    defineField({
      name: "seoTitle",
      title: "Search engine title",
      type: "string",
      group: "seo",
      description:
        "Shown as the blue link in Google. Aim for under 60 characters. Leave blank to use the post title.",
      validation: (rule) => rule.max(70).warning("Google usually cuts titles off after ~60 characters."),
    }),
    defineField({
      name: "seoDescription",
      title: "Search engine description",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "The grey text under the link in Google. Aim for 120-155 characters. Leave blank to use the summary.",
      validation: (rule) =>
        rule.max(165).warning("Google usually cuts descriptions off after ~155 characters."),
    }),
    defineField({
      name: "focusKeywords",
      title: "Focus keywords",
      type: "array",
      group: "seo",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description: "The search terms this post is written to rank for.",
    }),
    defineField({
      name: "legacyUrl",
      title: "Old WordPress address",
      type: "url",
      group: "seo",
      description: "Set automatically during the import. Leave as-is.",
      readOnly: true,
    }),
    defineField({
      name: "legacyId",
      title: "WordPress post ID",
      type: "string",
      group: "seo",
      description: "Set automatically during the import. Leave as-is.",
      readOnly: true,
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "topic.name", media: "featuredImage" },
  },
});
