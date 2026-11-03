import { IconInbox } from "./icons";

/* The small pieces every dashboard screen is built from. Each one exists
   because it was repeated on three screens, not because a design system
   ought to have it. */

export function Card({
  children,
  title,
  note,
  action,
  className = "",
  pad = true,
  rise,
}: {
  children: React.ReactNode;
  title?: string;
  note?: string;
  action?: React.ReactNode;
  className?: string;
  pad?: boolean;
  /** Position in the entrance wave. See the keyframes in dashboard/layout. */
  rise?: number;
}) {
  return (
    <section
      /* min-w-0: a grid item defaults to min-width:auto, so without this the
         card grows to its longest unbroken line and pushes the page sideways. */
      className={`min-w-0 rounded-2xl border border-line bg-surface ${className}`}
      data-rise={rise === undefined ? undefined : ""}
      style={{
        /* The layered elevation plus the inset hairline, both defined in
           dashboard/layout as tokens: an edge with two tones rather than one
           flat 1px line. */
        boxShadow: "var(--e1), var(--ring-inset)",
        ...(rise === undefined ? {} : ({ "--i": rise } as React.CSSProperties)),
      }}
    >
      {title && (
        <header className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3.5 sm:px-5">
          <div className="min-w-0">
            <h2 className="font-sans text-[14px] font-semibold tracking-[-.01em]">{title}</h2>
            {note && <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{note}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={pad ? "p-4 sm:p-5" : ""}>{children}</div>
    </section>
  );
}

/** A status word. Never colour alone: the word itself carries the meaning. */
export function Pill({ kind, children }: { kind?: string; children?: React.ReactNode }) {
  const label = children ?? kind ?? "";
  const map: Record<string, string> = {
    hot: "border-[#c4572f]/45 bg-[#c4572f]/12 text-[#9a3f1e] dark:text-[#e8a583]",
    warm: "border-[rgb(var(--accent-rgb)/.6)] bg-[rgb(var(--accent-rgb)/.18)] text-[var(--dash-accent-text)]",
    cold: "border-line bg-warm text-muted",
    voice: "border-line bg-warm text-muted",
    chat: "border-line bg-warm text-muted",
    confirmed: "border-[#067647]/35 bg-[#067647]/10 text-[#067647] dark:text-[#6ec49b]",
    cancelled: "border-line bg-warm text-muted line-through",
  };
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-md border px-2 py-[3px] font-sans text-[11px] font-semibold uppercase tracking-[.07em] ${
        map[String(kind)] || map.cold
      }`}
    >
      {label}
    </span>
  );
}

/** An empty state with a reason and, where there is one, a next step. */
export function Empty({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-warm text-muted">
        <IconInbox className="h-5 w-5" />
      </span>
      <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-muted">{children}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/** A table that keeps its header in view and scrolls sideways when narrow. */
export function Table({ children, minWidth = 760 }: { children: React.ReactNode; minWidth?: number }) {
  return (
    /* overflow-x-auto makes this div a scroll container, and a sticky <th> then
       sticks to the div rather than the page, so it never engages. Above xl the table fits and the wrapper goes back to visible, which
       hands the sticky headers to the viewport where they belong. Below it the
       wrapper scrolls sideways and the headers simply scroll with it. */
    <div
      className="overflow-x-auto xl:overflow-x-visible rounded-2xl border border-line bg-surface"
      style={{ boxShadow: "var(--e1), var(--ring-inset)" }}
    >
      <table className="w-full border-collapse text-[14px]" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}

/* A sticky header passes over the rows beneath it, so it needs its own ground
   rather than the card's: backdrop-blur with a near-opaque surface keeps the
   column labels legible while a hint of the row underneath still moves, which
   is what tells you the table is scrolling and not the page. */
export const th =
  "sticky top-0 z-10 border-b border-line bg-[color-mix(in_oklab,var(--color-surface)_88%,transparent)] px-4 py-3 text-left font-sans text-[11px] font-semibold uppercase tracking-[.08em] text-muted backdrop-blur-sm";
export const td = "border-b border-line px-4 py-3 align-top";
/** Rows light up under the pointer, which is how a long list stays readable. */
export const tr = "transition-colors duration-150 hover:bg-warm";
export const num = "tabular-nums text-right";
