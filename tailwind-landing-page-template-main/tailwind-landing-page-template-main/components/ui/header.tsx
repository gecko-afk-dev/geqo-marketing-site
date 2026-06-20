import Link from "next/link";
import Logo from "./logo";
import { useTranslation } from "@/lib/i18n/use-translation";
import { Locale } from "@/lib/i18n/translations";

export default function Header() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <header className="z-30 mt-2 w-full md:mt-6 transition-all duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <div className="flex gap-2 text-sm font-medium">
                <button 
                  onClick={() => setLocale("en")}
                  className={`px-2 py-1 rounded transition ${locale === "en" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLocale("fr")}
                  className={`px-2 py-1 rounded transition ${locale === "fr" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
                >
                  FR
                </button>
                <button 
                  onClick={() => setLocale("ar")}
                  className={`px-2 py-1 rounded transition ${locale === "ar" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
                >
                  AR
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
