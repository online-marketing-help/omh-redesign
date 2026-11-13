// Server-only token for reading drafts while previewing. Use a dedicated Viewer token
// (sanity.io/manage → API → Tokens) as SANITY_API_READ_TOKEN; the existing write token is a
// fallback so preview works before that is added. Never import this from a client component.
export const readToken = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
