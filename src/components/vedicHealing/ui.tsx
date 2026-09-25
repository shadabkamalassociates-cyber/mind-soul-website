import type { ReactNode } from "react";

export const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-[#3D3D8F] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(61,61,143,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2F2F70]";

export const secondaryButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-[#3D3D8F]/25 bg-white/90 px-6 py-3 text-[14px] font-semibold text-[#3D3D8F] transition duration-300 hover:-translate-y-0.5 hover:border-[#3D3D8F]/40 hover:bg-white";

export function VedicHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-[680px] text-center" : "max-w-[640px] text-left"}>
      {eyebrow ? (
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C9A06A]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 text-[30px] font-medium leading-[1.15] sm:text-[38px] lg:text-[44px] ${light ? "text-white" : "text-[#1A1A4A]"}`}
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-[15px] leading-7 sm:text-[16px] ${light ? "text-white/80" : "text-[#5C5C7A]"}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function VedicSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-[1200px]">{children}</div>
    </section>
  );
}
