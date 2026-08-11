export default function SetaeMark({
  className = "",
  mono = false,
}: {
  className?: string;
  mono?: boolean;
}) {
  const color = mono ? "currentColor" : "#F59E0B";

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* 16-Column Grid abstractly used to size components */}
      {/* Top Row: 3 angular lines */}
      <line x1="12" y1="32" x2="24" y2="12" stroke={color} strokeWidth="6" strokeLinecap="square" />
      <line x1="28" y1="32" x2="40" y2="12" stroke={color} strokeWidth="6" strokeLinecap="square" />
      <line x1="44" y1="32" x2="56" y2="12" stroke={color} strokeWidth="6" strokeLinecap="square" />

      {/* Bottom Row: 3 micro-pads */}
      <rect x="8" y="40" width="12" height="12" fill={color} />
      <rect x="26" y="40" width="12" height="12" fill={color} />
      <rect x="44" y="40" width="12" height="12" fill={color} />
    </svg>
  );
}
