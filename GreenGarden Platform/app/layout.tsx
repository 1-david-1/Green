import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenMatch",
  description: "Two-sided garden work marketplace for Germany"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
