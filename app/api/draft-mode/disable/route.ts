import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

// "Exit preview": turns draft mode off and returns to the same page, now showing published content.
export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  const to = request.nextUrl.searchParams.get("redirect") ?? "/";
  // Same-site paths only, so this can't be used to bounce people to another site.
  const path = to.startsWith("/") && !to.startsWith("//") ? to : "/";
  return NextResponse.redirect(new URL(path, request.url));
}
