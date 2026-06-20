import "./css/style.css";

import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/i18n-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata = {
  title: "GEQO | 0% Commission WhatsApp Ordering",
  description: "Automate your entire ordering system directly inside WhatsApp. 0% Commission.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${arabic.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
        <I18nProvider>
          <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
