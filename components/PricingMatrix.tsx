export default function PricingMatrix() {
  const tiers = [
    {
      name: "STARTER",
      price: "0 MAD",
      period: "/ mo",
      features: [
        "3.00 MAD / order toll",
        "-75 MAD Grace Period",
        "1 KDS Screen",
        "WhatsApp PWA Ordering"
      ],
      cta: "Start Free",
      isPopular: false
    },
    {
      name: "PRO",
      price: "499 MAD",
      period: "/ mo TTC",
      features: [
        "Unlimited GMV (0% Toll)",
        "2 KDS Screens",
        "Dispatch + Driver PIN",
        "WhatsApp PWA Ordering"
      ],
      cta: "Lock Founder Price",
      isPopular: true
    },
    {
      name: "SCALE",
      price: "949 MAD",
      period: "/ mo TTC",
      features: [
        "Unlimited GMV (0% Toll)",
        "Unlimited KDS Screens",
        "Full CRM + GEQO Boost",
        "Dedicated Account Manager"
      ],
      cta: "Contact Sales",
      isPopular: false
    }
  ];

  return (
    <section className="py-24 bg-obsidian border-b border-grid-line">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="font-space font-bold text-4xl text-offwhite mb-4">
            Transparent Pricing
          </h2>
          <p className="font-plex-sans text-[#A3A3A3] text-lg max-w-2xl mx-auto">
            Zero hidden fees. Predictable utility pricing designed to scale with your volume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative border border-grid-line p-8 flex flex-col ${
                tier.isPopular ? "bg-[#1C1C1C]" : "bg-[#141414]"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-0 w-full h-1 bg-saffron" />
              )}
              
              <div className="mb-8">
                <span className="font-plex-mono text-sm uppercase tracking-widest text-[#A3A3A3]">
                  {tier.name}
                </span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-space font-bold text-4xl text-offwhite">{tier.price}</span>
                  <span className="font-plex-sans text-[#737373]">{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-mint mt-1">●</span>
                    <span className="font-plex-sans text-[#D4D4D4]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full font-bold uppercase tracking-wide py-3 px-4 transition-colors ${
                  tier.isPopular
                    ? "bg-saffron text-obsidian hover:bg-amber-400"
                    : "border border-neutral-700 text-offwhite hover:border-neutral-500"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Prix Fondateur Banner */}
        <div className="max-w-5xl mx-auto bg-saffron text-obsidian font-bold p-4 text-center tracking-wide font-plex-mono uppercase">
          [PRIX FONDATEUR LOCK] First 300 spots locked at 399 MAD/mo for life
        </div>
      </div>
    </section>
  );
}
