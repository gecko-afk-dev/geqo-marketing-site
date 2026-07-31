import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5"
      aria-label="GEQO — WhatsApp ordering platform"
    >
      {/* SVG mark — rendered at fixed height, width scales with viewBox aspect */}
      <Image
        src="/geqo-logo.svg"
        alt="GEQO logo"
        width={36}
        height={34}
        priority
        className="h-[34px] w-auto"
      />
      {/* Wordmark fallback text (screen-readers + no-img fallback) */}
      <span className="sr-only">GEQO</span>
      {/* BETA badge */}
      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200">
        BETA
      </span>
    </Link>
  );
}
