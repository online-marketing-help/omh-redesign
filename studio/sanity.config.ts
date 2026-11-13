import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { defineDocuments, defineLocations, presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { enquiry } from "./schemaTypes/enquiry";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

// Two workspaces, because they hold different kinds of data. `production` is a
// public dataset — anyone can read it without a token, which is what lets the
// site fetch the blog. Form submissions carry names, emails and phone numbers,
// so they live in a private dataset instead, readable only when signed in here.
// Draft preview (21 Oct 2026): the Presentation tool opens the site with draft mode on, so a post can be
// checked before it is published. The site turns that on at /api/draft-mode/enable after checking a
// short-lived secret this Studio creates, and marks every draft preview noindex. Each post links to its
// page through "locations". SANITY_STUDIO_PREVIEW_ORIGIN=http://localhost:3000 previews a local build.
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_ORIGIN || "https://onlinemarketinghelp.co.uk";

export default defineConfig([
  {
    name: "omh",
    title: "Online Marketing Help",
    basePath: "/content",
    projectId: "qr5jqq87",
    dataset: "production",
    plugins: [
      structureTool({ structure }),
      presentationTool({
        title: "Preview",
        // Opens on /insights, which lists every draft at the top while previewing.
        previewUrl: { origin: previewOrigin, preview: "/insights", previewMode: { enable: "/api/draft-mode/enable" } },
        resolve: {
          // Which post a page shows, so "Documents on this page" opens it for editing.
          mainDocuments: defineDocuments([{ route: "/:slug", filter: `_type == "post" && slug.current == $slug` }]),
          locations: {
            post: defineLocations({
              select: { title: "title", slug: "slug.current" },
              resolve: (doc) => ({
                locations: doc?.slug
                  ? [{ title: doc.title || "Untitled", href: `/${doc.slug}` }]
                  : [],
                message: doc?.slug ? undefined : "Add a slug to preview this post.",
              }),
            }),
          },
        },
      }),
      visionTool(),
    ],
    schema: { types: schemaTypes },
  },
  {
    name: "enquiries",
    title: "Form submissions",
    basePath: "/enquiries",
    projectId: "qr5jqq87",
    dataset: "enquiries",
    plugins: [structureTool()],
    schema: { types: [enquiry] },
  },
]);
