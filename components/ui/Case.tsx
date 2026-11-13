import { TextLink } from "@/components/ui/Button";
import { Fpo, VerifiedSlot } from "@/components/ui/Proof";

export type CaseMeta = {
  sector: string;
  challenge: string;
  work: string;
  period?: string; // omit → verified slot
  result?: string; // omit → verified slot
  href: string;
  sampleNote?: string;
};

// Future Elementor widget: "OMH Featured Case Study"
export function CaseStudyFeature({ c, media }: { c: CaseMeta; media: React.ReactNode }) {
  const rows: [string, React.ReactNode][] = [
    ["Challenge", c.challenge],
    ["Work", c.work],
    ["Period", c.period ?? <VerifiedSlot>Period: pending</VerifiedSlot>],
    ["Result", c.result ?? <VerifiedSlot>Verified result: pending</VerifiedSlot>],
  ];
  return (
    <div className="grid grid-cols-[7fr_5fr] items-start gap-8 max-lg:grid-cols-1">
      {media}
      <div className="rounded-card border border-line bg-surface p-8 max-sm:p-6">
        <p className="font-sans text-xl font-semibold">{c.sector}</p>
        {c.sampleNote && <p className="mt-1 text-body text-muted">{c.sampleNote}</p>}
        <dl className="mt-4">
          {rows.map(([dt, dd]) => (
            <div key={dt} className="grid grid-cols-[92px_1fr] gap-x-4 border-t border-line py-3">
              <dt className="pt-0.5 text-[14px] font-semibold uppercase tracking-[0.12em] text-muted">{dt}</dt>
              <dd className="text-bsm text-ink/85">{dd}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4">
          <TextLink href={c.href}>Read the case study</TextLink>
        </div>
      </div>
    </div>
  );
}

// Convenience media slot used until real evidence assets arrive
export function CaseEvidenceFpo() {
  return (
    <Fpo
      ratio="16/10"
      tag="Evidence · 16:10"
      title="Verified campaign data"
      note="Real dashboard screenshot for this case, with client permission." source="/images/home/campaign-review.webp" alt="Illustrative campaign review" />
  );
}
