import Link from "next/link";
import SetaeMark from "./SetaeMark";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-obsidian border-b border-grid-line">
      <div className="max-w-[1440px] mx-auto px-6 h-20 grid grid-cols-12 md:grid-cols-16 gap-6 items-center">
        {/* Left: Brand Lockup (Spans 4 columns) */}
        <div className="col-span-6 md:col-span-4 flex items-center space-x-3">
          <SetaeMark className="w-8 h-8" />
          <div className="flex items-baseline space-x-2">
            <Link href="/" className="font-space font-bold text-2xl text-offwhite tracking-tight">
              GEQO
            </Link>
            <span className="font-plex-arabic text-xl text-offwhite/80">جيكو</span>
          </div>
        </div>

        {/* Center: Live Utility Status (Spans 8 columns, hidden on small screens) */}
        <div className="hidden md:flex md:col-span-8 justify-center items-center">
          <span className="text-mint font-plex-mono font-medium text-xs sm:text-sm tracking-widest uppercase">
            <span className="animate-pulse mr-2">●</span>
            SYSTEM LIVE // 99.99% WEBSOCKET UPTIME
          </span>
        </div>

        {/* Right: CTA (Spans 4 columns) */}
        <div className="col-span-6 md:col-span-4 flex justify-end">
          <a
            href="#beta-claim-form"
            className="bg-saffron text-obsidian font-bold px-5 py-2.5 text-sm uppercase tracking-wide hover:bg-amber-400 transition-colors"
          >
            Demander la Démo
          </a>
        </div>
      </div>
    </header>
  );
}
