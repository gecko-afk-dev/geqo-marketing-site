"use client";

export default function LanguageToggle({ 
  lang, 
  setLang 
}: { 
  lang: 'FR' | 'EN'; 
  setLang: (lang: 'FR' | 'EN') => void 
}) {
  return (
    <div className="flex justify-end mb-8 font-plex-mono text-sm">
      <div className="bg-[#141414] p-1 rounded border border-[#262626] flex gap-1">
        <button
          onClick={() => setLang('FR')}
          role="button"
          aria-pressed={lang === 'FR'}
          className={`px-4 py-2 rounded transition-colors ${
            lang === 'FR' ? 'bg-[#262626] text-offwhite font-bold' : 'text-[#737373] hover:text-[#A3A3A3]'
          }`}
        >
          FR
        </button>
        <button
          onClick={() => setLang('EN')}
          role="button"
          aria-pressed={lang === 'EN'}
          className={`px-4 py-2 rounded transition-colors ${
            lang === 'EN' ? 'bg-[#262626] text-offwhite font-bold' : 'text-[#737373] hover:text-[#A3A3A3]'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}
