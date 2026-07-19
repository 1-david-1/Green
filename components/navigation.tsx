"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Locale = "DE" | "EN";

const copy = {
  DE: {
    home: "Home",
    booking: "Buchung",
    dispatch: "Dispatch",
    login: "Anfrage starten",
    brand: "GreenMatch",
    slogan: "On-demand Gartenvermittlung"
  },
  EN: {
    home: "Home",
    booking: "Booking",
    dispatch: "Dispatch",
    login: "Start request",
    brand: "GreenMatch",
    slogan: "On-demand garden dispatch"
  }
};

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("DE");
  const t = copy[locale];

  const handleBooking = () => {
    router.push("/booking");
  };

  const navItems = [
    { path: "/", label: t.home },
    { path: "/booking", label: t.booking },
    { path: "/dispatch", label: t.dispatch }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-left group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-forest-700 to-forest-500 text-lg font-black text-white shadow-soft transition-transform group-hover:scale-105">
            G
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-forest-900">{t.brand}</div>
            <div className="text-xs font-medium uppercase tracking-[0.26em] text-forest-500">
              {t.slogan}
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-forest-100 bg-white px-2 py-2 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (pathname?.startsWith(item.path) && item.path !== "/");
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "min-h-11 rounded-full px-4 flex items-center justify-center text-sm font-semibold transition",
                  isActive ? "bg-forest-700 text-white" : "text-forest-700 hover:bg-forest-50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLocale((value) => (value === "DE" ? "EN" : "DE"))}
            className="min-h-11 rounded-full border border-forest-100 bg-white px-4 text-sm font-semibold text-forest-800 transition hover:bg-forest-50"
          >
            {locale}
          </button>
          <button
            type="button"
            onClick={handleBooking}
            className="min-h-11 rounded-full bg-forest-700 px-4 text-sm font-semibold text-white transition hover:bg-forest-800"
          >
            {t.login}
          </button>
        </div>
      </div>
    </header>
  );
}
