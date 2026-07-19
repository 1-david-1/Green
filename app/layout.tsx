import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenMatch",
  description: "GreenMatch ist der vertrauensbasierte Marktplatz für Gartenarbeit in Deutschland."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
