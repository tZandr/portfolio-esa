import type { Metadata } from "next";
import { Familjen_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";

/* next/font downloads and self-hosts these at build time. Nothing is
   requested from Google at runtime, which keeps visitor IPs out of
   Google's hands — the GDPR question that a plain <link> to Google Fonts
   raises for an EU site. */
const grotesk = Familjen_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const mono = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ESA — Game Audio",
  description:
    "Sound design and implementation for games. Wwise, FMOD, Unreal.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
