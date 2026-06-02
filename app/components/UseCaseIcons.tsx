import React from "react";

const s = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons: Record<string, React.ReactNode> = {
  "At home": (
    <svg {...s}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 21v-7h6v7" />
    </svg>
  ),
  "The office": (
    <svg {...s}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  "The gym": (
    <svg {...s}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Hotels: (
    <svg {...s}>
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  ),
  Travel: (
    <svg {...s}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.9.5-.8 1.1.1.4.3.7.6.9l4.8 3.4-2.6 4.1c-.3.5-.2 1.1.3 1.4l1.3 1c.4.3 1 .2 1.3-.2l4.1-2.6 3.4 4.8c.3.4.7.6 1.1.6.1 0 .3 0 .4-.1.5-.1.9-.6.7-1.1z" />
    </svg>
  ),
  Outdoors: (
    <svg {...s}>
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  ),
};

export function UseCaseIcon({ tag }: { tag: string }) {
  return <>{icons[tag] ?? null}</>;
}