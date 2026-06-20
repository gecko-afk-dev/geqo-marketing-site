import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="GEQO">
      <span className="text-2xl font-bold tracking-tight text-gray-900">
        GEQO
      </span>
      <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
        BETA
      </span>
    </Link>
  );
}
