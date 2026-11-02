import Image from "next/image";
import Link from "next/link";
import { Clock3 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { formatInsightDate } from "@/components/insights/InsightMeta";
import { InsightContents } from "@/components/insights/InsightContents";
import { ShareRow } from "@/components/insights/ShareRow";
import { ArrowRight, Button, TextLink } from "@/components/ui/Button";
import { BookDemo } from "@/components/BookDemo";
import { FinalCta } from "@/components/ui/FinalCta";
import { Eyebrow } from "@/components/ui/Proof";
import { splitAtMiddle, withContents } from "@/lib/content/insight-toc";
import { getRelatedInsights } from "@/lib/sanity/insights";
import { insightHref, type InsightPost } from "@/lib/content/insights-types";
import { SITE } from "@/lib/schema";
import { AccentTitle } from "@/components/services/ServicePrimitives";

function Byline({ post, className }: { post: InsightPost; className: string }) {
  const wasUpdated = post.modifiedAt.slice(0, 10) !== post.publishedAt.slice(0, 10);
  return (
    <dl className={`flex flex-wrap items-center gap-x-10 gap-y-4 text-body ${className}`}>
      <div className="flex items-center gap-2.5">
        <dt className="text-muted">Written by</dt>
        <dd className="font-semibold">{post.author.name}</dd>
      </div>
      <div className="flex items-center gap-2.5">
        <dt className="text-muted">Published</dt>
        <dd className="font-semibold">
          <time dateTime={post.publishedAt}>{formatInsightDate(post.publishedAt)}</time>
        </dd>
      </div>
      {wasUpdated && (
        <div className="flex items-center gap-2.5">
          <dt className="text-muted">Updated</dt>
          <dd className="font-semibold">
            <time dateTime={post.modifiedAt}>{formatInsightDate(post.modifiedAt)}</time>
          </dd>
        </div>
      )}
    </dl>
  );
}

// Tags, share and the archive link. The topic itself is already in the hero, so it is not repeated here.
function ArticleExtras({ post, url }: { post: InsightPost; url: string }) {
  const tags = post.categories.map((category) => category.name).filter((name) => name !== post.topic.name);
  return (
    <>
      {tags.length > 0 && (
        <div className="mt-8 border-t border-line pt-5">
          <p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-muted">Related topics</p>
          <p className="mt-2 text-body leading-relaxed text-ink/65">{tags.join(" · ")}</p>
        </div>
      )}
      <div className="mt-8 border-t border-line pt-5">
        <ShareRow title={post.title} url={url} />
      </div>
      <div className="mt-8 border-t border-line pt-5">
        <TextLink href="/insights">All insights</TextLink>
      </div>
    </>
  );
}

export async function InsightArticle({ post }: { post: InsightPost }) {
  const related = await getRelatedInsights(post);
  const { html, items } = withContents(post.contentHtml);
  const [head, tail] = splitAtMiddle(html, items);
  const url = `${SITE}${insightHref(post)}`;

  return (
    <article>
      <div aria-hidden className="read-progress" />

      <header className="hero-grid overflow-x-clip border-b border-line bg-warm">
        {/* pt-4 puts the trail where SiteBreadcrumbs draws it on every other page; its margin then brings the
            heading back to the usual section-md start (16px + 24px trail + this = the section's top padding). */}
        <div className="container-omh section-md pt-4!">
          <Reveal>
            <Breadcrumbs
              items={[{ name: "Home", href: "/" }, { name: "Insights", href: "/insights" }, { name: post.title }]}
              className="mb-[clamp(24px,7.4px+4.42vw,64px)]"
            />

            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">
              {/* Topic and reading time only: the date sits once, in the byline (client, 2 Nov 2026). */}
              {/* No "·" between the two: on a phone it was left dangling at the end of the first line. */}
              <span className="text-amber-deep">{post.topic.name}</span>
              <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
                <Clock3 className="size-4" aria-hidden />
                {post.readingTime} min read
              </span>
            </p>

            {/* Title left, lead image right: the heading row used to leave the
                whole right-hand half of the hero empty. */}
            <div className="mt-6 grid grid-cols-12 items-center gap-x-12 gap-y-9 max-lg:block">
              <div className={post.featuredImage ? "col-span-6" : "col-span-9"}>
                <h1 className="font-sans text-h1 font-semibold text-balance"><AccentTitle text={post.title} /></h1>
                <p className="mt-7 text-lead leading-relaxed text-ink/72">
                  {post.summary}
                </p>
              </div>

              {/* Larger but never cropped (user call, 12 Oct 2026): the title takes
                  six columns and the image six, shown at its own proportions
                  because many lead images are graphics with text in them. */}
              {post.featuredImage && (
                <div className="col-span-6 max-lg:mt-9">
                  <div className="overflow-hidden rounded-media border border-line bg-soft shadow-[0_30px_70px_-50px_rgb(0_0_0/0.55)]">
                    {post.featuredImage.width && post.featuredImage.height ? (
                      <Image
                        src={post.featuredImage.src}
                        alt={post.featuredImage.alt || post.title}
                        width={post.featuredImage.width}
                        height={post.featuredImage.height}
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="block h-auto w-full"
                      />
                    ) : (
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={post.featuredImage.src}
                          alt={post.featuredImage.alt || post.title}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* One byline strip instead of a floating meta panel — the old 3-column
                card left a tall empty gap beside the heading on every post. */}
            <Byline post={post} className="mt-10 border-t border-line pt-6 max-lg:hidden" />
          </Reveal>
        </div>
      </header>

      <section className="border-b border-line bg-surface">
        <div className="container-omh section-md">
          {/* Full container width: contents rail plus a body column that fills
              whatever is left, rather than a narrow centred island. */}
          <div className="grid grid-cols-[minmax(200px,240px)_minmax(0,1fr)] gap-x-[clamp(48px,5vw,88px)] gap-y-10 max-lg:block">
            <aside className="max-lg:hidden">
              <div className="sticky top-28">
                {items.length > 1 && <InsightContents items={items} />}
                <ArticleExtras post={post} url={url} />
              </div>
            </aside>

            {/* Phones (client, 2 Nov 2026): lead image, then contents, then the article, then byline, share and
                the archive link at the end, instead of all of it stacked above the first paragraph. */}
            <Reveal className="min-w-0">
              {items.length > 1 && (
                <div className="mb-10 lg:hidden">
                  <InsightContents items={items} idSuffix="-mobile" />
                </div>
              )}
              <div className="insight-prose" dangerouslySetInnerHTML={{ __html: head }} />
              {tail && (
                <>
                  <aside className="my-14 rounded-card bg-inverse p-9 text-oninverse max-sm:p-6" aria-label="Talk to the team">
                    <p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-oninverse/55">Need a hand with {post.topic.name}?</p>
                    <p className="mt-4 font-sans text-h3 font-semibold text-balance">Talk it through with the team before you change anything.</p>
                    <p className="mt-4 text-body leading-relaxed text-oninverse/72">A free consultation call. We look at what you have in place now and suggest the clearest next step, whether or not you work with us.</p>
                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <Button href="/contact" variant="inverse" small arrow data-event="insight_inline_cta_click">Book a Growth Consultation</Button>
                      <span className="text-[15px] text-oninverse/55">Keep reading below</span>
                    </div>
                  </aside>
                  <div className="insight-prose" dangerouslySetInnerHTML={{ __html: tail }} />
                </>
              )}
              <div className="mt-14 lg:hidden">
                <Byline post={post} className="flex-col items-start! gap-y-2! border-t border-line pt-6" />
                <ArticleExtras post={post} url={url} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-warm">
        <div className="container-omh section-md">
          <Reveal>
            <div className="flex items-end justify-between gap-8 max-lg:block">
              <div>
                <Eyebrow>Keep reading</Eyebrow>
                <h2 className="mt-5 font-sans text-h2 font-semibold">Related insights</h2>
              </div>
              <div className="max-lg:mt-5">
                <TextLink href="/insights">Browse the full archive</TextLink>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-lg:grid-cols-1">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={insightHref(item)}
                  className="surface-card group flex flex-col rounded-card border border-line bg-surface p-7"
                >
                  <p className="font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-amber-deep">
                    {item.topic.name}
                  </p>
                  <h3 className="mt-4 font-sans text-h4 font-semibold leading-snug text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-body leading-relaxed text-ink/66">{item.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-body font-semibold text-amber-deep">
                    Read article
                    <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title="Turn useful ideas into a practical growth plan."
        titleAccent="a practical growth plan."
        body="Tell us what you want to improve and what you have tried so far. We will help you identify the clearest next step."
        primary={{ label: "Discuss Your Priorities", event: "insight_cta_click" }}
        contactEvents={{ phone: "insight_phone_click", email: "insight_email_click" }}
      />
      <BookDemo />
    </article>
  );
}
