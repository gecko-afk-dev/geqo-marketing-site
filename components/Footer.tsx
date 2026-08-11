import SetaeMark from "./SetaeMark";

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-grid-line pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-grid-line pb-12 mb-8">
          
          {/* Brand & Corporate Entities */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center space-x-3">
              <SetaeMark className="w-8 h-8" mono={true} />
              <span className="font-space font-bold text-xl text-offwhite tracking-tight">
                GEQO
              </span>
              <span className="font-plex-arabic text-xl text-offwhite/80">جيكو</span>
            </div>
            
            <p className="font-plex-mono text-xs text-[#737373] uppercase tracking-wide">
              GEQO SARL AU (Morocco) & GEQO LLC (Wyoming, US)
            </p>

            <p className="font-plex-sans text-sm text-[#A3A3A3]">
              Pronunciation : GEQO — pronounced "GEK-oh" (like gecko, minus the 'c')
            </p>
          </div>

          {/* Legal Compliance */}
          <div className="md:col-span-6 flex flex-col justify-end">
            <p className="font-plex-sans text-xs text-[#737373] leading-relaxed max-w-xl">
              Conforme à la Loi 31-08 édictant des mesures de protection du consommateur. 0% commission s'applique aux commandes directes traitées via le système GEQO (hors frais de livraison).
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-plex-mono text-[#525252] tracking-wider uppercase">
          <span>© {new Date().getFullYear()} GEQO SYSTEM. ALL RIGHTS RESERVED.</span>
          <span className="mt-4 md:mt-0">Space Grotesk · IBM Plex Mono · IBM Plex Sans Arabic</span>
        </div>
      </div>
    </footer>
  );
}
