/* Case studies are unpublished until the client signs them off (8 Nov 2026).
   While false: /case-studies and every /case-studies/* page return 404, they
   are out of the sitemap, nav, footer and search, every link to them is
   dropped, and the sections that only showcase them are hidden.
   Flip to true to bring all of it back. */
export const CASE_STUDIES_LIVE = false;

export const isHiddenHref = (href: string) =>
  !CASE_STUDIES_LIVE && /^\/case-studies(\/|$|#|\?)/.test(href);
