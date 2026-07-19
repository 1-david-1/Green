"use client";

import { useMemo, useState } from "react";
import { calendarSlots, gigs, providers } from "@/lib/mock-data";
import { evaluatePsttg, type ProviderVerificationResult } from "@/lib/policy";

type Locale = "DE" | "EN";

const copy = {
  DE: {
    headline: "GreenMatch",
    subheadline: "Vertrauensbasierter Marktplatz für Gartenarbeit in Deutschland",
    workToday: "Ich arbeite heute",
    noWorkToday: "Ich arbeite heute nicht",
    bidding: "Bieten & Verhandeln",
    calendar: "Kalender",
    compliance: "Compliance",
    newBadge: "Ich bin neu",
    proBadge: "Professioneller Betrieb",
    submitBid: "Gebot abgeben",
    requestSlot: "Slot anfragen",
    availability: "Verfügbarkeit",
    trust: "Trust-Score",
    insurance: "Versicherung enthalten"
  },
  EN: {
    headline: "GreenMatch",
    subheadline: "A trust-first marketplace for garden work in Germany",
    workToday: "I work today",
    noWorkToday: "I do not work today",
    bidding: "Bidding & negotiation",
    calendar: "Calendar",
    compliance: "Compliance",
    newBadge: "I'm new",
    proBadge: "Professional business",
    submitBid: "Submit bid",
    requestSlot: "Request slot",
    availability: "Availability",
    trust: "Trust score",
    insurance: "Insurance included"
  }
} as const;

const verificationPreview: ProviderVerificationResult = {
  category: "Youth",
  age: 16,
  verified: true,
  restrictions: [
    "max 120 minutes/day",
    "work only between 08:00 and 18:00",
    "max 5 days/week",
    "monthly earnings cap of 100 EUR",
    "only light and safe tasks"
  ],
  requiresParentalConsent: true,
  requiredDocuments: ["parental_consent"]
};

export function Dashboard() {
  const [locale, setLocale] = useState<Locale>("DE");
  const [workingToday, setWorkingToday] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState(providers[0].id);
  const [bidValue, setBidValue] = useState("55");
  const [psttgTransactions, setPsttgTransactions] = useState(22);
  const [psttgRevenue, setPsttgRevenue] = useState(1640);
  const [taxIdVerified, setTaxIdVerified] = useState(false);

  const activeProvider = useMemo(
    () => providers.find((provider) => provider.id === selectedProvider) ?? providers[0],
    [selectedProvider]
  );

  const psttgResult = useMemo(
    () => evaluatePsttg({ transactions: psttgTransactions, revenueEuro: psttgRevenue, taxIdVerified }),
    [psttgTransactions, psttgRevenue, taxIdVerified]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] border border-forest-200/70 bg-white/70 shadow-soft">
        <div className="grid-pattern px-6 py-5 sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-forest-200 bg-forest-50 px-4 py-2 text-sm font-medium text-forest-700">
                <span className="h-2 w-2 rounded-full bg-forest-500" />
                {locale === "DE" ? "Zweiseitige Plattform" : "Two-sided platform"}
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-forest-900 sm:text-5xl">
                {copy[locale].headline}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-forest-800 sm:text-lg">
                {copy[locale].subheadline}. {locale === "DE"
                  ? "Mit eBay-artigem Bieten, privater Stammhelfer-Liste, Kalenderfreigaben und compliance-orientierter Provider-Steuerung."
                  : "With eBay-style bidding, private favorite crews, calendar availability, and compliance-first provider controls."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setLocale(locale === "DE" ? "EN" : "DE")}
                className="rounded-full border border-forest-200 bg-white px-4 py-2 text-sm font-medium text-forest-800 transition hover:border-forest-300 hover:bg-forest-50"
              >
                {locale}
              </button>
              <button
                type="button"
                onClick={() => setWorkingToday((value) => !value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  workingToday
                    ? "bg-forest-700 text-white hover:bg-forest-800"
                    : "bg-soil-200 text-soil-900 hover:bg-soil-300"
                }`}
              >
                {workingToday ? copy[locale].workToday : copy[locale].noWorkToday}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-[1.75rem] border border-white/60 bg-white/80 p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-forest-900">{copy[locale].bidding}</h2>
                <p className="mt-1 text-sm text-forest-700">
                  {locale === "DE"
                    ? "Inserate, Gegenangebote, Chat und finaler Vertragsabschluss in einem Flow."
                    : "Listings, counter-offers, chat, and contract finalization in one flow."}
                </p>
              </div>
              <div className="rounded-2xl bg-forest-50 px-4 py-3 text-right">
                <div className="text-xs uppercase tracking-[0.24em] text-forest-500">{copy[locale].trust}</div>
                <div className="text-lg font-semibold text-forest-900">92%</div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {gigs.map((gig) => (
                <article key={gig.id} className="rounded-3xl border border-forest-100 bg-forest-50/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-forest-900">{gig.title}</h3>
                      <p className="mt-1 text-sm text-forest-700">{gig.location}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-forest-700">
                      {gig.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-forest-800">{gig.summary}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-full bg-white px-3 py-1 text-forest-800">{gig.budget}</span>
                    <span className="rounded-full bg-white px-3 py-1 text-forest-800">{gig.mode}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-forest-800">
                  {locale === "DE" ? "Finales Gebot" : "Final bid"}
                </span>
                <input
                  value={bidValue}
                  onChange={(event) => setBidValue(event.target.value)}
                  className="w-full rounded-2xl border border-forest-200 bg-white px-4 py-3 text-forest-900 outline-none transition focus:border-forest-400"
                />
              </label>
              <button className="rounded-2xl bg-forest-700 px-5 py-3 font-semibold text-white transition hover:bg-forest-800">
                {copy[locale].submitBid}
              </button>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/60 bg-white/80 p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-forest-900">{copy[locale].calendar}</h2>
                <p className="mt-1 text-sm text-forest-700">
                  {locale === "DE"
                    ? "Freie Zeitfenster werden als Buchungs-Slots dargestellt."
                    : "Available time windows are rendered as booking slots."}
                </p>
              </div>
              <div className={`rounded-full px-4 py-2 text-sm font-semibold ${workingToday ? "bg-forest-100 text-forest-800" : "bg-soil-100 text-soil-800"}`}>
                {workingToday ? copy[locale].workToday : copy[locale].noWorkToday}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {calendarSlots.map((day) => (
                <div key={day.day} className="rounded-3xl border border-forest-100 bg-white p-4">
                  <div className="text-sm font-semibold text-forest-900">{day.day}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {day.hours.map((hour) => (
                      <span
                        key={hour}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          workingToday ? "bg-forest-50 text-forest-800" : "bg-soil-50 text-soil-800"
                        }`}
                      >
                        {hour}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] border border-white/60 bg-white/80 p-5 shadow-soft">
            <h2 className="text-2xl font-semibold text-forest-900">{copy[locale].compliance}</h2>
            <div className="mt-4 rounded-3xl bg-forest-50 p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-forest-500">
                {locale === "DE" ? "Verifizierungs-Vorschau" : "Verification preview"}
              </div>
              <div className="mt-2 text-lg font-semibold text-forest-900">{verificationPreview.category}</div>
              <p className="mt-2 text-sm text-forest-700">
                {locale === "DE"
                  ? "Jugendliche werden automatisch auf leichte Tätigkeiten, Zeitfenster und Stundenlimits begrenzt."
                  : "Youth providers are automatically limited to light tasks, time windows, and hour caps."}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {verificationPreview.restrictions.map((restriction) => (
                <div key={restriction} className="rounded-2xl border border-forest-100 bg-white px-4 py-3 text-sm text-forest-800">
                  {restriction}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/60 bg-white/80 p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-forest-900">PStTG monitor</h2>
              <span className="rounded-full bg-soil-100 px-3 py-1 text-xs font-semibold text-soil-800">
                {psttgResult.status}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-forest-500">Tx</span>
                <input
                  type="number"
                  value={psttgTransactions}
                  onChange={(event) => setPsttgTransactions(Number(event.target.value))}
                  className="w-full rounded-2xl border border-forest-200 bg-white px-3 py-2 text-forest-900 outline-none focus:border-forest-400"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-forest-500">EUR</span>
                <input
                  type="number"
                  value={psttgRevenue}
                  onChange={(event) => setPsttgRevenue(Number(event.target.value))}
                  className="w-full rounded-2xl border border-forest-200 bg-white px-3 py-2 text-forest-900 outline-none focus:border-forest-400"
                />
              </label>
              <label className="flex items-end gap-2 rounded-2xl border border-forest-100 bg-forest-50 px-3 py-2">
                <input
                  type="checkbox"
                  checked={taxIdVerified}
                  onChange={(event) => setTaxIdVerified(event.target.checked)}
                  className="h-4 w-4 rounded border-forest-300 text-forest-600"
                />
                <span className="text-sm text-forest-800">Tax ID verified</span>
              </label>
            </div>

            <div className="mt-4 rounded-3xl border border-forest-100 bg-white p-4">
              <div className="text-sm font-semibold text-forest-900">{psttgResult.message}</div>
              <p className="mt-2 text-sm leading-6 text-forest-700">{psttgResult.nextAction}</p>
            </div>
            <button className="mt-4 w-full rounded-2xl bg-soil-700 px-4 py-3 font-semibold text-white transition hover:bg-soil-800">
              {copy[locale].requestSlot}
            </button>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-forest-50 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-forest-500">Selected provider</div>
                <div className="mt-1 text-base font-semibold text-forest-900">{activeProvider.name}</div>
                <div className="text-sm text-forest-700">
                  {activeProvider.badge === "I'm new" ? copy[locale].newBadge : copy[locale].proBadge}
                </div>
              </div>
              <div className="rounded-2xl bg-soil-50 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-soil-500">{copy[locale].availability}</div>
                <div className="mt-1 text-base font-semibold text-soil-900">{activeProvider.availability}</div>
                <div className="text-sm text-soil-700">{copy[locale].insurance}</div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/60 bg-white/80 p-5 shadow-soft">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-500">
              {locale === "DE" ? "Stammhelfer-Netzwerk" : "Favorite crew network"}
            </div>
            <div className="mt-3 space-y-3">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`w-full rounded-3xl border p-4 text-left transition ${
                    selectedProvider === provider.id
                      ? "border-forest-400 bg-forest-50"
                      : "border-forest-100 bg-white hover:border-forest-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-forest-900">{provider.name}</div>
                      <div className="text-sm text-forest-700">{provider.price}</div>
                    </div>
                    <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-forest-700">
                      {provider.badge === "I'm new" ? copy[locale].newBadge : copy[locale].proBadge}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {provider.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-forest-100 px-3 py-1 text-xs text-forest-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </section>
  );
}
