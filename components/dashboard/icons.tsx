/* One icon family, one stroke weight, one corner treatment.

   These are Lucide glyphs drawn inline rather than pulled from a package:
   the set is small, it keeps the dashboard free of another dependency, and
   inline SVG inherits currentColor so both themes are handled for free.

   Every icon is decorative by default. Where one carries meaning on its own
   it is given a <title>, and where it sits beside its own label the caller
   leaves aria-hidden in place. */

type P = { className?: string; title?: string };

function Svg({ children, className = "h-4 w-4", title }: P & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

export const IconOverview = (p: P) => (
  <Svg {...p}><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></Svg>
);
export const IconPhone = (p: P) => (
  <Svg {...p}><path d="M6.5 3h3l1.5 4.5-2 1.4a12 12 0 0 0 5.1 5.1l1.4-2L20 13.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" /></Svg>
);
export const IconChat = (p: P) => (
  <Svg {...p}><path d="M20 14a2 2 0 0 1-2 2H8l-4 3.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" /><path d="M8.5 9.5h7M8.5 12.5h4" /></Svg>
);
export const IconLead = (p: P) => (
  <Svg {...p}><circle cx="9" cy="8" r="3.4" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M18 8.5v5M20.5 11h-5" /></Svg>
);
export const IconCalendar = (p: P) => (
  <Svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Svg>
);
export const IconClock = (p: P) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></Svg>
);
export const IconUp = (p: P) => (
  <Svg {...p}><path d="M5 15l7-7 7 7" /></Svg>
);
export const IconDown = (p: P) => (
  <Svg {...p}><path d="M5 9l7 7 7-7" /></Svg>
);
export const IconFlat = (p: P) => (
  <Svg {...p}><path d="M5 12h14" /></Svg>
);
export const IconPlay = (p: P) => (
  <Svg {...p}><path d="M8 5.5v13l11-6.5Z" /></Svg>
);
export const IconSearch = (p: P) => (
  <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></Svg>
);
export const IconSort = (p: P) => (
  <Svg {...p}><path d="M8 9.5 12 5l4 4.5M8 14.5 12 19l4-4.5" /></Svg>
);
export const IconInbox = (p: P) => (
  <Svg {...p}><path d="M3 13h5l1.5 3h5L16 13h5" /><path d="M5.5 5h13l2.5 8v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z" /></Svg>
);
export const IconBack = (p: P) => (
  <Svg {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Svg>
);
export const IconMic = (p: P) => (
  <Svg {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" /></Svg>
);
export const IconCheck = (p: P) => (
  <Svg {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Svg>
);
export const IconLink = (p: P) => (
  <Svg {...p}><path d="M10 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1.5 1.5" /><path d="M14 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5L12.5 17" /></Svg>
);

export const IconLock = (p: P) => (
  <Svg {...p}><rect x="4" y="10.5" width="16" height="10.5" rx="2" /><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" /></Svg>
);
export const IconEye = (p: P) => (
  <Svg {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.75" /></Svg>
);
export const IconEyeOff = (p: P) => (
  <Svg {...p}><path d="M9.9 5.8A8.7 8.7 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3 3.8M6.4 7.7A17 17 0 0 0 2.5 12S6 18.5 12 18.5c1.2 0 2.3-.2 3.3-.6" /><path d="M10 10a2.75 2.75 0 0 0 3.9 3.9" /><path d="m4 4 16 16" /></Svg>
);
export const IconArrow = (p: P) => (
  <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
);
export const IconSignOut = (p: P) => (
  <Svg {...p}><path d="M14 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8" /><path d="M11 12h10M17 7.5l4.5 4.5L17 16.5" /></Svg>
);

/* Two people, one handing the conversation to the other: the handover queue. */
export const IconHandover = (p: P) => (
  <Svg {...p}><circle cx="7" cy="7.5" r="3" /><path d="M2.5 19a4.5 4.5 0 0 1 9 0" /><circle cx="17.5" cy="7.5" r="3" /><path d="M14 19a3.5 3.5 0 0 1 7 0" /><path d="M9.5 13.5h5m-1.8-1.8 1.8 1.8-1.8 1.8" /></Svg>
);
export const IconSend = (p: P) => (
  <Svg {...p}><path d="M4 12 20 4l-8 16-2.5-5.5Z" /><path d="m9.5 14.5 6-6" /></Svg>
);
export const IconAlert = (p: P) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5M12 16.2v.3" /></Svg>
);

export const NAV_ICON = {
  "/dashboard": IconOverview,
  "/dashboard/handover": IconHandover,
  "/dashboard/calls": IconPhone,
  "/dashboard/chats": IconChat,
  "/dashboard/leads": IconLead,
  "/dashboard/bookings": IconCalendar,
} as const;
