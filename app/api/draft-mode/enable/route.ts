import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/lib/sanity/client";
import { readToken } from "@/lib/sanity/token";

// Called by the Studio's Presentation tool. It checks the short-lived secret the Studio creates for the
// signed-in editor, then turns on Next.js draft mode, so draft posts render for that browser only.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
});
