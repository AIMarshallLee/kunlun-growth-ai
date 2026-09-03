import { Bodoni_Moda, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-en-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-en-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-en-mono",
  weight: ["400", "500"],
  display: "swap",
});

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable}`} lang="en">
      {children}
    </div>
  );
}
