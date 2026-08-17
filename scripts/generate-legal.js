const fs = require('fs');
const sanitizeHtml = require('sanitize-html');

const sanitizeConfig = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'ul', 'ol', 'li', 'strong', 'em',
    'a', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
  ],
  allowedAttributes: {
    'a': ['href', 'rel', 'target']
  },
  allowedIframeHostnames: [],
  allowProtocolRelative: false,
  transformTags: {
    'a': (tagName, attribs) => {
      // Enforce rel="noopener noreferrer" for safety
      attribs.rel = 'noopener noreferrer';
      return {
        tagName,
        attribs
      };
    }
  },
  allowedSchemes: ['http', 'https', 'mailto']
};

function processHtml(filename) {
    let html = fs.readFileSync(filename, 'utf-8');
    
    // Replace tokens
    html = html.replace(/\[ICE\]|\[EIN\]|\[RC\]|\[IF\]|\[adresse\]|\[adresse, Casablanca, Maroc\]|\[adresse, Casablanca\]|\[adresse, Wyoming, USA\]|\[adresse, Wyoming\]|\[numéro officiel\]|\[numéro\]|\[Nom\]|\[XXX\]|\[à compléter avant mise en production\]|\[DATE\]|\[DATE D'EFFET — ex. 1er septembre 2026\]|\[ICE: …\]|\[RC: …\]/g, '—');
    
    return html;
}

const termsHtml = processHtml('lib/terms.html');
const privacyHtml = processHtml('lib/privacy.html');

// For terms, split by English Version
const termsParts = termsHtml.split(/<h1>GEQO TERMS OF SERVICE \(English Version\)<\/h1>/i);
const termsFr = sanitizeHtml(termsParts[0], sanitizeConfig);
const termsEn = sanitizeHtml('<h1>GEQO TERMS OF SERVICE (English Version)</h1>' + (termsParts[1] ? termsParts[1].split(/<h1>NOTES DE RÉDACTION \/ DRAFTING NOTES \(à retirer avant publication\)<\/h1>/i)[0] : ''), sanitizeConfig);

const privacyParts = privacyHtml.split(/<h1>GEQO PRIVACY POLICY \(English Version\)<\/h1>/i);
const privacyFr = sanitizeHtml(privacyParts[0], sanitizeConfig);
const privacyEn = sanitizeHtml('<h1>GEQO PRIVACY POLICY (English Version)</h1>' + (privacyParts[1] ? privacyParts[1].split(/<h1>NOTES DE RÉDACTION \/ DRAFTING NOTES \(à retirer avant publication\)<\/h1>/i)[0] : ''), sanitizeConfig);

function generatePage(title, frContent, enContent) {
    return `"use client";
import { useState, useEffect } from "react";
import LanguageToggle from "../../components/LanguageToggle";

export default function LegalPage() {
  const [lang, setLang] = useState<'FR' | 'EN'>('FR');
  
  useEffect(() => {
    // Console warning for unfilled tokens in dev
    if (process.env.NODE_ENV === 'development') {
      console.warn("Unfilled corporate tokens rendered as —");
    }
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-offwhite py-24 selection:bg-mint selection:text-obsidian">
      <div className="max-w-[760px] mx-auto px-6">
        
        <div className="mb-12 border-b border-grid-line pb-8">
          <LanguageToggle lang={lang} setLang={setLang} />
          
          <div className="bg-[#141414] border border-[#262626] p-4 text-sm font-plex-mono text-[#A3A3A3] mb-8">
            Version 1.1 — Entrée en vigueur : — · Dernière mise à jour : —
          </div>
        </div>

        <article className="prose prose-invert prose-headings:font-space prose-headings:text-saffron prose-a:text-mint prose-a:no-underline hover:prose-a:underline prose-p:font-plex-sans prose-li:font-plex-sans prose-h1:text-3xl prose-h2:text-2xl prose-strong:text-offwhite max-w-none">
          {lang === 'FR' ? (
            <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(frContent)} }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(enContent)} }} />
          )}
        </article>
      </div>
    </div>
  );
}
`;
}

fs.mkdirSync('app/terms', { recursive: true });
fs.writeFileSync('app/terms/page.tsx', generatePage('Conditions Générales — GEQO', termsFr, termsEn));

fs.mkdirSync('app/privacy', { recursive: true });
fs.writeFileSync('app/privacy/page.tsx', generatePage('Politique de Confidentialité — GEQO', privacyFr, privacyEn));

console.log("Pages generated successfully.");
