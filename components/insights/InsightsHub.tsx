import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/ui/Button";
import { BookDemo } from "@/components/BookDemo";
import { FinalCta } from "@/components/ui/FinalCta";
import { Eyebrow } from "@/components/ui/Proof";
import { InsightMeta } from "@/components/insights/InsightMeta";
import { InsightImage } from "@/components/insights/ArchiveRow";
import { InsightsArchive } from "@/components/insights/InsightsArchive";
import { getFeaturedInsights, getInsightTopics, getInsightsIndex } from "@/lib/sanity/insights";
import { imageRatio, insightHref, type InsightIndexEntry } from "@/lib/content/insights-types";

const pageSize = 12;

function archiveHref({ topic, query, page }: { topic?: string; query?: string; page?: number }) {
  const params = new URLSearchParams();
  if (topic) params.set("topic", topic);
  if (query) params.set("q", query);
  if (page && page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `/insights?${search}` : "/insights";
}


function FeaturedStories({ posts }: { posts: InsightIndexEntry[] }) {
  const [lead, ...picks] = posts;
  if (!lead) return null;

  return (
    <section className="border-b border-line bg-surface">
      <div className="container-omh section-md">
        <Reveal>
          <div className="mb-10 flex items-center gap-4 text-[14px] font-semibold uppercase tracking-[0.17em] text-muted">
            <span className="h-0.5 w-7 bg-amber" />
            Featured insight
            <span className="h-px flex-1 bg-line" />
          </div>
          <Link
            href={insightHref(lead)}
            className="group grid grid-cols-12 items-center gap-x-12 gap-y-8 max-lg:block"
          >
            <span className="relative col-span-7 block aspect-[16/10] overflow-hidden rounded-media border border-line bg-soft max-lg:mb-8" style={imageRatio(lead)}>
              <InsightImage post={lead} priority />
            </span>
            <span className="col-span-5 block">
              <InsightMeta post={lead} />
              <span className="mt-6 block font-sans text-[clamp(32px,26px+1.45vw,50px)] font-semibold leading-[1.08] text-balance">
                {lead.title}
              </span>
              <span className="mt-5 block text-body leading-relaxed text-ink/70">{lead.summary}</span>
              <span className="mt-7 inline-flex items-center gap-2 font-semibold text-amber-deep">
                Read the insight
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </span>
          </Link>

          {/* Three cards with their lead images (client, 3 Nov 2026): the old two-column list left the third pick
              alone with an empty half beside it. Each image keeps its own proportions, as on the home page. */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {picks.map((post) => (
              <Link
                key={post.slug}
                href={insightHref(post)}
                className="surface-card group flex flex-col overflow-hidden rounded-card border border-line bg-warm"
              >
                <span className="relative block aspect-[16/10] overflow-hidden border-b border-line bg-soft" style={imageRatio(post)}>
                  <InsightImage post={post} />
                </span>
                <span className="flex flex-1 flex-col p-7">
                  <InsightMeta post={post} />
                  <span className="mt-4 block font-sans text-[clamp(21px,19px+0.45vw,25px)] font-semibold leading-snug">
                    {post.title}
                  </span>
                  <span className="mt-4 block text-body leading-relaxed text-ink/68">{post.summary}</span>
                  <span className="mt-auto flex items-center justify-between gap-6 pt-7 font-semibold text-amber-deep">
                    Read the insight
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface transition-colors group-hover:border-teal group-hover:bg-teal group-hover:text-white">
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}




export async function InsightsHub({ topic = "", query = "", page = 1 }: { topic?: string; query?: string; page?: number }) {
  const [insightsIndex, insightTopics, featuredInsights] = await Promise.all([
    getInsightsIndex(),
    getInsightTopics(),
    getFeaturedInsights(),
  ]);

  const activeTopic = insightTopics.some((candidate) => candidate.slug === topic) ? topic : "";
  const cleanQuery = query.trim();
  const needle = cleanQuery.toLocaleLowerCase("en-GB");
  const showingCurated = !activeTopic && !needle;
  const archiveSource = showingCurated ? insightsIndex.filter((post) => !post.featured) : insightsIndex;
  const filtered = archiveSource.filter((post) => {
    if (activeTopic && post.topic.slug !== activeTopic) return false;
    if (!needle) return true;
    return [post.title, post.summary, post.topic.name, ...post.categories.map((category) => category.name)]
      .join(" ")
      .toLocaleLowerCase("en-GB")
      .includes(needle);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(Math.max(1, Number.isFinite(page) ? Math.floor(page) : 1), pageCount);

  return (
    <>
      <section className="hero-grid relative overflow-hidden border-b border-line bg-warm">
        <div className="container-omh section-md">
          <Reveal>
            <Eyebrow>Insights</Eyebrow>
            <div className="mt-8 grid grid-cols-12 items-start gap-x-12 gap-y-10 max-lg:block">
              <div className="col-span-7">
                <h1 className="font-sans text-display font-semibold text-balance">
                  Practical thinking for <span className="text-amber-deep">better marketing decisions</span>.
                </h1>
                <p className="mt-7 text-lead leading-relaxed text-ink/72">
                  Plain-English guidance on websites, SEO, paid media and digital growth, written
                  to help you judge options, ask better questions and choose the clearest next step.
                </p>
                <p className="mt-8 flex items-center gap-4 border-t border-line pt-7 text-body leading-relaxed text-ink/75">
                  <span aria-hidden className="h-px w-10 shrink-0 bg-amber" />
                  Useful when you are planning the work, and when you need to challenge it.
                </p>
              </div>

              {/* The right half used to be empty. It now carries the fastest
                  route into the archive: the shape of it, and a way in. */}
              <div className="col-span-5 max-lg:mt-10">
                <div className="rounded-card border border-line bg-surface p-8 max-sm:p-6">
                  <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <dt className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">
                        Articles
                      </dt>
                      <dd className="mt-2 font-sans text-h2 font-semibold leading-none">
                        {insightsIndex.length}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">
                        Topics
                      </dt>
                      <dd className="mt-2 font-sans text-h2 font-semibold leading-none">
                        {insightTopics.length}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-8 border-t border-line pt-6 text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Browse by topic
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {insightTopics.slice(0, 8).map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={archiveHref({ topic: item.slug })}
                          className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-label text-ink/75 transition-colors hover:border-teal hover:text-amber-deep"
                        >
                          {item.name}
                          <span className="text-body text-muted">{item.postCount}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <InsightsArchive
          entries={insightsIndex}
          topics={insightTopics}
          activeTopic={activeTopic}
          initialQuery={cleanQuery}
          initialPage={currentPage}
          featured={<FeaturedStories posts={featuredInsights} />}
        />

      <FinalCta
        title="Need help applying this to your business?"
        titleAccent="applying this to your business?"
        body="Tell us what you are working on, what is getting in the way, and how you will measure success. We will recommend a practical next step."
        primary={{ label: "Book a Growth Consultation", event: "insights_hub_cta_click" }}
        contactEvents={{ phone: "insights_hub_phone_click", email: "insights_hub_email_click" }}
      />
      <BookDemo />
    </>
  );
}
