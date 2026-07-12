import type { SVGProps } from "react";

/** Custom stroke icon set — consistent 1.7px stroke, currentColor. */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c.8-3.6 3.6-5.4 7-5.4s6.2 1.8 7 5.4" />
    </svg>
  );
}

export function IconFolder(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 7.5V18a1.8 1.8 0 0 0 1.8 1.8h14.4A1.8 1.8 0 0 0 21 18V9.3a1.8 1.8 0 0 0-1.8-1.8h-6.9L10.2 5H4.8A1.8 1.8 0 0 0 3 6.8Z" />
      <path d="M3 10h18" />
    </svg>
  );
}

export function IconBriefcase(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="7.4" width="18" height="12.6" rx="1.8" />
      <path d="M8.6 7.4V5.6A1.6 1.6 0 0 1 10.2 4h3.6a1.6 1.6 0 0 1 1.6 1.6v1.8M3 12.4h18" />
    </svg>
  );
}

export function IconGradCap(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 4 10 4.6L12 13.2 2 8.6Z" />
      <path d="M6.4 10.6v4.8c0 1.3 2.5 2.6 5.6 2.6s5.6-1.3 5.6-2.6v-4.8M22 8.6v5.2" />
    </svg>
  );
}

export function IconGear(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M19.5 12a7.5 7.5 0 0 0-.12-1.32l2-1.55-1.9-3.26-2.36.94a7.6 7.6 0 0 0-2.28-1.32L14.5 3h-5l-.34 2.49a7.6 7.6 0 0 0-2.28 1.32l-2.36-.94-1.9 3.26 2 1.55a7.4 7.4 0 0 0 0 2.64l-2 1.55 1.9 3.26 2.36-.94c.68.57 1.45 1.02 2.28 1.32L9.5 21h5l.34-2.49a7.6 7.6 0 0 0 2.28-1.32l2.36.94 1.9-3.26-2-1.55c.08-.43.12-.87.12-1.32Z" />
    </svg>
  );
}

export function IconEnvelope(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5.4" width="18" height="13.2" rx="1.8" />
      <path d="m3.6 7 8.4 6 8.4-6" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export function IconExternal(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 4h6v6M20 4l-9.5 9.5M19 13.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4.5" />
    </svg>
  );
}

export function IconGitHub(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 19.2c-4.2 1.3-4.2-2.1-6-2.5m12 4.3v-3.1a2.7 2.7 0 0 0-.76-2.1c2.53-.28 5.2-1.24 5.2-5.63a4.37 4.37 0 0 0-1.2-3 4.07 4.07 0 0 0-.08-3.05s-.98-.3-3.23 1.2a11.1 11.1 0 0 0-5.86 0C6.82 3.82 5.84 4.1 5.84 4.1a4.07 4.07 0 0 0-.08 3.06 4.37 4.37 0 0 0-1.2 3.04c0 4.35 2.66 5.32 5.2 5.63a2.7 2.7 0 0 0-.76 2.07v3.1" />
    </svg>
  );
}

export function IconLinkedIn(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="2.4" />
      <path d="M7.4 10.2v6.6M7.4 7.3v.02M11.3 16.8v-3.9a2.6 2.6 0 0 1 5.2 0v3.9M11.3 10.2v1.4" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-6.6-5.4-6.6-10.4a6.6 6.6 0 0 1 13.2 0C18.6 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.3" />
    </svg>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 13.8 9 19.5 11 13.8 13 12 18.5 10.2 13 4.5 11 10.2 9Z" />
      <path d="M19 3.8v3.4M20.7 5.5h-3.4" />
    </svg>
  );
}

export function IconCopy(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="9" y="9" width="11" height="11" rx="1.8" />
      <path d="M5.5 14.5H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 2 2v.5" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}
