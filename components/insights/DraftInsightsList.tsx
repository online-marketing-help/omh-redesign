import Link from "next/link";
import { getDraftInsights } from "@/lib/sanity/insights";

// Shown on /insights only while draft mode is on: a way into every draft, since drafts are not linked from
// anywhere on the public site. "Unpublished changes" marks drafts of posts that are already live.
export async function DraftInsightsList() {
  const drafts = await getDraftInsights();
  return (
    <section className="border-b border-line bg-surface">
      <div className="container-omh py-10">
        <h2 className="font-sans text-h4 font-semibold">
          Drafts <span className="text-body font-normal text-muted">· preview only, hidden from visitors and search engines</span>
        </h2>
        {drafts.length === 0 ? (
          <p className="mt-4 text-body text-muted">No drafts right now.</p>
        ) : (
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {drafts.map((d) => (
              <li key={d.slug}>
                <Link href={`/${d.slug}`} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4 hover:text-amber-deep">
                  <span className="font-sans text-[18px] font-semibold">{d.title || "Untitled draft"}</span>
                  <span className="text-body text-muted">
                    {d.published ? "Unpublished changes" : "Not published yet"} · edited{" "}
                    {new Date(d.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
