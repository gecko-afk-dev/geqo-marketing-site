export default function FeatureGrid() {
  const features = [
    {
      title: "Vue 3 Kitchen Display System",
      description: "High-contrast screen readable from 3 meters away through smoke and glare.",
      meta: "KDS SLA: < 15 MIN",
      highlight: "CRITICAL RED THRESHOLDS",
    },
    {
      title: "Next.js 15 WhatsApp PWA",
      description: "Customer texts WhatsApp -> receives JWT magic link -> builds cart in a sub-second webview with $0 GPS tracking via Leaflet.js.",
      meta: "LATENCY: < 50ms",
      highlight: "ZERO-DOWNLOAD APP",
    },
    {
      title: "Dispatch & Driver PIN Verification",
      description: "Driver verifies delivery with a native 4-digit WhatsApp PIN. Zero dispute claims, zero fake deliveries.",
      meta: "100% AUDIT TRAIL",
      highlight: "FRAUD-PROOF DISPATCH",
    },
    {
      title: "Customer CRM Ownership",
      description: "You own 100% of your diner contact data. Export raw CSV or trigger WhatsApp re-engagement campaigns via GEQO Boost.",
      meta: "DATA EXPORT: CSV/JSON",
      highlight: "RETARGETING ENGINE",
    },
  ];

  return (
    <section className="py-24 border-b border-grid-line bg-[#050505]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-12 md:grid-cols-16 gap-6 mb-16">
          <div className="col-span-12 md:col-span-14 lg:col-span-10 md:col-start-2">
            <h2 className="font-space font-bold text-4xl text-offwhite mb-4">
              Industrial-Grade Engineering
            </h2>
            <p className="font-plex-sans text-[#A3A3A3] text-lg max-w-2xl">
              Engineered exclusively for high-volume Moroccan kitchens. No fluff, just pure utility.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-grid-line bg-[#0A0A0A] p-8 flex flex-col hover:border-neutral-600 transition-colors"
            >
              <div className="font-plex-mono text-xs text-saffron uppercase tracking-widest mb-6">
                [{String(index + 1).padStart(2, "0")}] {feature.highlight}
              </div>
              <h3 className="font-space font-bold text-xl text-offwhite mb-4">
                {feature.title}
              </h3>
              <p className="font-plex-sans text-[#A3A3A3] text-sm flex-grow mb-8 leading-relaxed">
                {feature.description}
              </p>
              <div className="border-t border-grid-line pt-4 mt-auto">
                <span className="font-plex-mono text-xs text-[#737373] tracking-wide">
                  {feature.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
