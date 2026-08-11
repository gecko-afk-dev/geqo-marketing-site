import Link from "next/link";
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
            
            <div className="font-plex-sans text-xs text-[#737373] leading-relaxed max-w-lg space-y-2">
              <p>
                « GEQO est une plateforme logicielle détenue par GEQO LLC (Wyoming, USA) et exploitée au Maroc par GEQO SARL AU (Casablanca, Maroc). »
              </p>
              <p className="opacity-80">
                "GEQO is a software platform owned by GEQO LLC (Wyoming, USA) and operated in Morocco by GEQO SARL AU (Casablanca, Morocco). GEQO LLC is the technology provider; GEQO SARL AU manages local merchant services."
              </p>
              <p className="pt-2 font-plex-mono uppercase tracking-widest text-[#525252]">
                GEQO SARL AU (IF: —, ICE: —, RC: —, Casablanca)
                <br />
                GEQO LLC (EIN: —, Wyoming)
              </p>
            </div>
          </div>

          {/* Legal Compliance & Links */}
          <div className="md:col-span-6 flex flex-col justify-end space-y-6">
            <div className="flex flex-wrap gap-4 text-sm font-plex-mono tracking-wide">
              <Link href="/terms" className="text-offwhite hover:text-saffron transition-colors">
                Conditions Générales
              </Link>
              <span className="text-grid-line">|</span>
              <Link href="/privacy" className="text-offwhite hover:text-saffron transition-colors">
                Politique de Confidentialité
              </Link>
            </div>
            
            <div className="space-y-2">
              <p className="font-plex-sans text-xs text-[#737373] leading-relaxed">
                Conforme à la Loi 31-08 édictant des mesures de protection du consommateur. 0% commission s'applique aux commandes directes traitées via le système GEQO (hors frais de livraison).
              </p>
              <p className="font-plex-sans text-xs text-[#737373] leading-relaxed">
                <Link href="/privacy#garantie" className="text-mint hover:underline">
                  Conforme Loi 09-08 (CNDP) · Aucune vente de données — jamais.
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-plex-mono text-[#525252] tracking-wider uppercase">
          <span>© {new Date().getFullYear()} GEQO SARL AU. ALL RIGHTS RESERVED.</span>
          <div className="mt-4 md:mt-0 flex gap-4">
            <a href="https://wa.me/212000000000" className="hover:text-mint transition-colors">WhatsApp Contact</a>
            {/* Additional social links can go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
