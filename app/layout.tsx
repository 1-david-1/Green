import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "GreenMatch",
  description: "GreenMatch ist der vertrauensbasierte Marktplatz für Gartenarbeit in Deutschland."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-[linear-gradient(180deg,#f8fbf9_0%,#eef5f0_42%,#e9efea_100%)] text-forest-900 font-sans antialiased selection:bg-emerald-200">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
