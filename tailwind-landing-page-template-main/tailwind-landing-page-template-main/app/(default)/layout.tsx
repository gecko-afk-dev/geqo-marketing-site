"use client";

import Navbar from "@/components/Navbar";
import { useEffect } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="grow bg-[#0A0A0A] text-neutral-50">{children}</main>
    </>
  );
}
