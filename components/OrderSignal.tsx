"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { swissItemVariants } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Not natively provided by framer-motion — useTransform accepts an arbitrary mapping fn.
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

function BoldCaption({ text }: { text: string }) {
  const [lead, ...rest] = text.split(" — ");
  if (rest.length === 0) return <>{text}</>;
  return (
    <>
      {lead} — <strong>{rest.join(" — ")}</strong>
    </>
  );
}

const SCENE_WINDOWS: [number, number][] = [
  [0.0, 0.36],
  [0.32, 0.68],
  [0.64, 1.0],
];
const ACTIVE_PADDING = 0.04;

function useSceneLocal(progress: MotionValue<number>, index: number) {
  const [start, end] = SCENE_WINDOWS[index];
  return useTransform(progress, (p) => smoothstep(start, end, p));
}

function useSceneActive(progress: MotionValue<number>, index: number) {
  const [start, end] = SCENE_WINDOWS[index];
  const [active, setActive] = useState(index === 0);
  useMotionValueEvent(progress, "change", (p) => {
    const next = p >= start - ACTIVE_PADDING && p <= end + ACTIVE_PADDING;
    setActive((prev) => (prev === next ? prev : next));
  });
  return active;
}

const NODE_LEFT = [16, 50, 84];

function SceneWrapper({
  index,
  active,
  children,
}: {
  index: number;
  active: boolean;
  children: React.ReactNode;
}) {
  const wrapperStyle: CSSProperties = { left: `${NODE_LEFT[index]}%` };

  return (
    <motion.div
      dir="ltr"
      animate={{ opacity: active ? 1 : 0.28, scale: active ? 1 : 0.94 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={wrapperStyle}
      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
}

function PhoneScene({ progress }: { progress: MotionValue<number> }) {
  const local = useSceneLocal(progress, 0);
  const active = useSceneActive(progress, 0);
  const readColor = useTransform(local, (l) => (l > 0.5 ? "#05CD99" : "#525252"));

  return (
    <SceneWrapper index={0} active={active}>
      <div className="w-[168px] h-[344px] bg-[#050505] border border-[#262626] rounded-[32px] p-2 flex flex-col overflow-hidden">
        <div className="h-5 flex items-center justify-center">
          <div className="w-16 h-3 bg-[#050505] rounded-b-xl border border-t-0 border-[#262626]" />
        </div>
        <div className="flex items-center gap-2 px-2 py-2 border-b border-[#1C1C1C]">
          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 fill-none stroke-[#A3A3A3]" strokeWidth={1.5}>
            <path d="M7 1 L3 5 L7 9" />
          </svg>
          <div className="w-5 h-5 rounded-full bg-[#262626] flex items-center justify-center text-[10px]">
            🌮
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-plex-sans text-[9px] text-offwhite">Tacos El Bahia</span>
            <span className="font-plex-sans text-[7px] text-mint">GEQO · en ligne</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1.5 px-2 py-2 justify-end">
          <div className="self-start max-w-[85%] bg-[#1C1C1C] text-offwhite text-[8px] rounded-lg rounded-bl-none px-2 py-1.5">
            Bghiti tchouf l-menu? 🌮
          </div>
          <div className="self-end max-w-[85%] bg-[#0B5E4C] text-offwhite text-[8px] rounded-lg rounded-br-none px-2 py-1.5">
            <div>2× Tacos Poulet, 1× Coca 33cl</div>
            <div className="flex items-center justify-end gap-1 mt-1 text-[6px] text-[#A3A3A3]">
              <span>18:04</span>
              <motion.svg
                viewBox="0 0 16 10"
                className="w-2.5 h-1.5"
                stroke={readColor}
                fill="none"
                strokeWidth={1.5}
              >
                <path d="M1 5 L4 8 L9 2" />
                <path d="M6 5 L9 8 L15 1" />
              </motion.svg>
            </div>
          </div>
          <div className="self-start max-w-[85%] bg-[#1C1C1C] text-offwhite text-[8px] rounded-lg rounded-bl-none px-2 py-1.5">
            Commande reçue ✅ · 18 min
          </div>
        </div>
        <div className="h-6 mx-1 mb-1 rounded-full bg-[#1C1C1C] border border-[#262626]" />
      </div>
    </SceneWrapper>
  );
}

function GlowCard({ card, glow }: { card: string; glow: MotionValue<boolean> }) {
  const boxShadow = useTransform(glow, (g) => (g ? "0 0 8px rgba(245,158,11,0.7)" : "none"));
  const borderColor = useTransform(glow, (g) => (g ? "#F59E0B" : "#262626"));
  return (
    <motion.div
      style={{ boxShadow, borderColor }}
      className="bg-[#141414] border rounded px-1 py-1 text-[6px] text-[#D4D4D4] leading-tight"
    >
      {card}
    </motion.div>
  );
}

function TabletScene({ progress }: { progress: MotionValue<number> }) {
  const local = useSceneLocal(progress, 1);
  const active = useSceneActive(progress, 1);
  const glow = useTransform(local, (l) => l >= 0.15 && l <= 0.9);
  const noGlow = useMotionValue(false);
  const columns = [
    { label: "NOUVEAU", cards: ["#1042 · Tacos Poulet"], glow },
    { label: "EN CUISINE", cards: ["#1041 · Tacos Bœuf", "#1040 · Panini"], glow: noGlow },
    { label: "PRÊT", cards: ["#1039 · Coca 33cl"], glow: noGlow },
  ];

  return (
    <SceneWrapper index={1} active={active}>
      <div className="w-[296px] h-[198px] bg-[#0A0A0A] border border-[#262626] rounded-xl p-2 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-1 pb-1 border-b border-[#1C1C1C]">
          <span className="font-plex-mono text-[8px] text-offwhite uppercase tracking-wide">
            GEQO KDS — TACOS EL BAHIA
          </span>
          <span className="font-plex-mono text-[7px] text-[#737373]">18:04</span>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-1 pt-1.5">
          {columns.map((col) => (
            <div key={col.label} className="flex flex-col gap-1">
              <span className="font-plex-mono text-[6px] text-[#737373] uppercase tracking-wide">
                {col.label}
              </span>
              {col.cards.map((card) => (
                <GlowCard key={card} card={card} glow={col.glow} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </SceneWrapper>
  );
}

function RouteScene({ progress }: { progress: MotionValue<number> }) {
  const local = useSceneLocal(progress, 2);
  const active = useSceneActive(progress, 2);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);
  const hasPulsedRef = useRef(false);

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, []);

  useMotionValueEvent(local, "change", (l) => {
    if (l >= 0.72 && !hasPulsedRef.current) {
      hasPulsedRef.current = true;
      setPulseKey((k) => k + 1);
    } else if (l < 0.72) {
      hasPulsedRef.current = false;
    }
  });

  const dashOffset = useTransform(local, (l) => pathLength * (1 - smoothstep(0.05, 0.7, l)));
  const checkOpacity = useTransform(local, (l) => smoothstep(0.8, 0.86, l));

  return (
    <SceneWrapper index={2} active={active}>
      <svg width="140" height="120" viewBox="0 0 140 120" fill="none">
        <circle cx="16" cy="16" r="6" className="stroke-[#404040]" strokeWidth={2} fill="#0A0A0A" />
        <path d="M16 16 C 60 16, 40 100, 100 96" stroke="#262626" strokeWidth={2} fill="none" />
        <motion.path
          ref={pathRef}
          d="M16 16 C 60 16, 40 100, 100 96"
          stroke="#F59E0B"
          strokeWidth={2}
          fill="none"
          strokeDasharray={pathLength}
          style={{ strokeDashoffset: dashOffset }}
        />
        {pulseKey > 0 && (
          <motion.circle
            key={pulseKey}
            cx={100}
            cy={96}
            r={10}
            className="stroke-saffron"
            strokeWidth={2}
            fill="none"
            initial={{ opacity: 0.7, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
        <path d="M100 82 C 90 82, 84 90, 100 108 C 116 90, 110 82, 100 82 Z" fill="#F59E0B" />
        <motion.path
          d="M95 95 L99 99 L106 90"
          stroke="#0A0A0A"
          strokeWidth={2}
          fill="none"
          style={{ opacity: checkOpacity }}
        />
      </svg>
    </SceneWrapper>
  );
}

function NodeLabels() {
  const { t } = useLanguage();
  const labels = [t("order_signal_node_1"), t("order_signal_node_2"), t("order_signal_node_3")];
  return (
    <>
      {NODE_LEFT.map((left, i) => (
        <div
          key={i}
          style={{ left: `${left}%` }}
          className="absolute bottom-0 -translate-x-1/2 font-plex-mono text-[10px] text-[#737373] uppercase tracking-wide whitespace-nowrap rtl:text-right text-left"
        >
          {labels[i]}
        </div>
      ))}
    </>
  );
}

function SrOnlyNodeList() {
  const { t } = useLanguage();
  const labels = [t("order_signal_node_1"), t("order_signal_node_2"), t("order_signal_node_3")];
  return (
    <ol className="sr-only">
      {labels.map((label, i) => (
        <li key={i}>{label}</li>
      ))}
    </ol>
  );
}

function ThroughLine({ widthPct, caption }: { widthPct: MotionValue<string>; caption: string }) {
  return (
    <div className="w-full max-w-[760px] mx-auto mt-10">
      <div className="relative h-px bg-grid-line">
        <motion.div className="absolute inset-y-0 left-0 bg-saffron" style={{ width: widthPct }} />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-saffron"
          style={{ left: widthPct }}
        />
      </div>
      <p className="mt-4 text-center font-plex-sans text-sm text-[#A3A3A3] rtl:text-right text-left">
        <BoldCaption text={caption} />
      </p>
    </div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const { t } = useLanguage();
  const opacity = useTransform(progress, [0, 0.02, 0.04], [1, 1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute top-8 flex flex-col items-center gap-2 font-plex-mono text-xs text-[#737373] uppercase tracking-widest rtl:text-right text-left"
    >
      <span>{t("order_signal_hint")}</span>
      <motion.svg
        viewBox="0 0 10 10"
        className="w-3 h-3 stroke-[#737373] fill-none"
        strokeWidth={1.5}
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M1 3 L5 7 L9 3" />
      </motion.svg>
    </motion.div>
  );
}

const CAPTION_KEYS = ["order_signal_caption_1", "order_signal_caption_2", "order_signal_caption_3"] as const;

function ScrollScrubbedStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [captionIdx, setCaptionIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
    setCaptionIdx((prev) => (prev === next ? prev : next));
  });

  const widthPct = useTransform(scrollYProgress, (p) => `${p * 100}%`);

  return (
    <div ref={containerRef} className="relative h-[330vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <ScrollHint progress={scrollYProgress} />

        <div className="relative w-full max-w-[760px] h-[280px] md:h-[430px] mx-auto" aria-hidden="true">
          <PhoneScene progress={scrollYProgress} />
          <TabletScene progress={scrollYProgress} />
          <RouteScene progress={scrollYProgress} />
          <NodeLabels />
        </div>

        <ThroughLine widthPct={widthPct} caption={t(CAPTION_KEYS[captionIdx])} />
      </div>
      <SrOnlyNodeList />
    </div>
  );
}

function StaticFallback() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-10 py-8">
      <div dir="ltr" className="flex flex-col md:flex-row items-center justify-center gap-10 flex-wrap" aria-hidden="true">
        <div className="w-[168px] h-[344px] bg-[#050505] border border-[#262626] rounded-[32px] p-2 flex flex-col overflow-hidden">
          <div className="h-5 flex items-center justify-center">
            <div className="w-16 h-3 bg-[#050505] rounded-b-xl border border-t-0 border-[#262626]" />
          </div>
          <div className="flex items-center gap-2 px-2 py-2 border-b border-[#1C1C1C]">
            <div className="w-5 h-5 rounded-full bg-[#262626] flex items-center justify-center text-[10px]">🌮</div>
            <div className="flex flex-col leading-none">
              <span className="font-plex-sans text-[9px] text-offwhite">Tacos El Bahia</span>
              <span className="font-plex-sans text-[7px] text-mint">GEQO · en ligne</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1.5 px-2 py-2 justify-end">
            <div className="self-start max-w-[85%] bg-[#1C1C1C] text-offwhite text-[8px] rounded-lg rounded-bl-none px-2 py-1.5">
              Bghiti tchouf l-menu? 🌮
            </div>
            <div className="self-end max-w-[85%] bg-[#0B5E4C] text-offwhite text-[8px] rounded-lg rounded-br-none px-2 py-1.5">
              <div>2× Tacos Poulet, 1× Coca 33cl</div>
              <div className="flex items-center justify-end gap-1 mt-1 text-[6px] text-[#A3A3A3]">
                <span>18:04</span>
                <svg viewBox="0 0 16 10" className="w-2.5 h-1.5 stroke-mint" fill="none" strokeWidth={1.5}>
                  <path d="M1 5 L4 8 L9 2" />
                  <path d="M6 5 L9 8 L15 1" />
                </svg>
              </div>
            </div>
            <div className="self-start max-w-[85%] bg-[#1C1C1C] text-offwhite text-[8px] rounded-lg rounded-bl-none px-2 py-1.5">
              Commande reçue ✅ · 18 min
            </div>
          </div>
          <div className="h-6 mx-1 mb-1 rounded-full bg-[#1C1C1C] border border-[#262626]" />
        </div>

        <div className="w-[296px] h-[198px] bg-[#0A0A0A] border border-[#262626] rounded-xl p-2 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-1 pb-1 border-b border-[#1C1C1C]">
            <span className="font-plex-mono text-[8px] text-offwhite uppercase tracking-wide">
              GEQO KDS — TACOS EL BAHIA
            </span>
            <span className="font-plex-mono text-[7px] text-[#737373]">18:04</span>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-1 pt-1.5">
            {[
              { label: "NOUVEAU", cards: ["#1042 · Tacos Poulet"], glow: true },
              { label: "EN CUISINE", cards: ["#1041 · Tacos Bœuf", "#1040 · Panini"], glow: false },
              { label: "PRÊT", cards: ["#1039 · Coca 33cl"], glow: false },
            ].map((col) => (
              <div key={col.label} className="flex flex-col gap-1">
                <span className="font-plex-mono text-[6px] text-[#737373] uppercase tracking-wide">{col.label}</span>
                {col.cards.map((card) => (
                  <div
                    key={card}
                    className={`bg-[#141414] border rounded px-1 py-1 text-[6px] text-[#D4D4D4] leading-tight ${col.glow ? "border-saffron shadow-[0_0_8px_rgba(245,158,11,0.7)]" : "border-[#262626]"}`}
                  >
                    {card}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <svg width="140" height="120" viewBox="0 0 140 120" fill="none">
          <circle cx="16" cy="16" r="6" className="stroke-[#404040]" strokeWidth={2} fill="#0A0A0A" />
          <path d="M16 16 C 60 16, 40 100, 100 96" stroke="#F59E0B" strokeWidth={2} fill="none" />
          <path d="M100 82 C 90 82, 84 90, 100 108 C 116 90, 110 82, 100 82 Z" fill="#F59E0B" />
          <path d="M95 95 L99 99 L106 90" stroke="#0A0A0A" strokeWidth={2} fill="none" />
        </svg>
      </div>

      <div className="w-full max-w-[760px] mx-auto">
        <div className="relative h-px bg-grid-line">
          <div className="absolute inset-y-0 left-0 bg-saffron w-full" />
        </div>
        <p className="mt-4 text-center font-plex-sans text-sm text-[#A3A3A3] rtl:text-right text-left">
          <BoldCaption text={t("order_signal_caption_3")} />
        </p>
      </div>

      <SrOnlyNodeList />
    </div>
  );
}

// useReducedMotion() can resolve synchronously on the client (matchMedia read
// during render) before hydration completes, which would mismatch the SSR
// output — always false — and swap the whole subtree. Gate it behind mount so
// the first client render matches the server, then adopt the real value.
function useSafeReducedMotion() {
  const detected = useReducedMotion();
  const [safe, setSafe] = useState(false);
  useEffect(() => {
    setSafe(!!detected);
  }, [detected]);
  return safe;
}

export default function OrderSignal() {
  const { t } = useLanguage();
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <section className="py-16 md:py-24 border-b border-grid-line bg-[#050505]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div
          variants={swissItemVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 rtl:text-right text-left"
        >
          <span className="font-plex-mono text-xs text-saffron uppercase tracking-widest">
            {t("order_signal_eyebrow")}
          </span>
          <h2 className="font-space font-bold text-4xl text-offwhite mt-4">
            {t("order_signal_title")}
          </h2>
        </motion.div>

        {prefersReducedMotion ? <StaticFallback /> : <ScrollScrubbedStage />}
      </div>
    </section>
  );
}
