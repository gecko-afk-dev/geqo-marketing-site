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
      <button
        onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
        className="bg-[#141414] text-offwhite border border-[#262626] px-4 py-2 rounded hover:bg-[#262626] transition-colors font-bold tracking-widest"
      >
        {lang === 'FR' ? 'FR / EN' : 'EN / FR'}
      </button>
    </div>
  );
}
