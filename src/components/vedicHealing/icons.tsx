export function ApproachIcon({ name }: { name: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  if (name === "energy") {
    return (
      <svg {...common}>
        <path d="M13 3 6 13h6l-1 8 7-10h-6l1-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "chakra") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 2.8v2.2M12 19v2.2M2.8 12h2.2M19 12h2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "breath") {
    return (
      <svg {...common}>
        <path d="M5 15c2.2-4.5 4.2-6.6 7-6.6S16.8 10.5 19 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 18.2c1.2-2.2 2.4-3.2 4-3.2s2.8 1 4 3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "sound") {
    return (
      <svg {...common}>
        <path d="M8 9.5v5l4 2.2V7.3L8 9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14.2 9.2c1.2.8 1.8 1.8 1.8 2.8s-.6 2-1.8 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M16.4 7.2c1.8 1.3 2.8 3 2.8 4.8s-1 3.5-2.8 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "leaf") {
    return (
      <svg {...common}>
        <path d="M5 16.5C8 8 14 5.5 19 5c.2 5-1.2 11-8.5 14-1.2-2.2-3.2-3.6-5.5-2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9.2 14.2c1.4-1.6 3.2-3.2 5.6-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 4.2c0 0-4.2 4.4-4.2 7.4 0 2.2 1.8 3.8 4.2 3.8s4.2-1.6 4.2-3.8C16.2 8.6 12 4.2 12 4.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 15.4V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
