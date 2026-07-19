"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CinematicLandingHero } from "@/components/ui/cinematic-landing-hero";
import { cn } from "@/lib/utils";
import { evaluatePsttg, validateWorkSlot } from "@/lib/policy";

type Locale = "DE" | "EN";
type View = "landing" | "booking" | "dispatch";
type AppTab = "dashboard" | "helpers" | "profile";
type RequestMode = "customer" | "helper";

type GreenMatchExperienceProps = {
  initialView?: View;
  initialDate?: string;
  initialTime?: string;
  initialLocation?: string;
  initialTask?: string;
  initialMode?: RequestMode;
};

type HelperProfile = {
  id: string;
  name: string;
  role: "Youth" | "Adult-Casual" | "Adult-Pro";
  distanceKm: number;
  hourlyRate: number;
  rating: number;
  trustScore: number;
  responseMins: number;
  workingToday: boolean;
  isNew: boolean;
  location: string;
  skills: string[];
  about: string;
  avatar: string;
};

const helpers: HelperProfile[] = [
  {
    id: "prov-1",
    name: "Jonas Müller",
    role: "Youth",
    distanceKm: 3.2,
    hourlyRate: 12,
    rating: 4.8,
    trustScore: 92,
    responseMins: 18,
    workingToday: true,
    isNew: false,
    location: "Düsseldorf-Süd",
    skills: ["Unkraut jäten", "Gießen", "Laub harken", "Rasen mähen"],
    about: "Schnelle Hilfe für leichte Arbeiten. Ideal für spontane Garten-Anfragen am Wochenende.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "prov-2",
    name: "Gartenbau Meissner",
    role: "Adult-Pro",
    distanceKm: 7.6,
    hourlyRate: 48,
    rating: 4.9,
    trustScore: 99,
    responseMins: 9,
    workingToday: true,
    isNew: false,
    location: "Düsseldorf-Nord",
    skills: ["Baumschnitt > 2m", "Heckenschnitt", "Pflasterarbeiten", "Teichbau"],
    about: "Professioneller Betrieb mit Versicherung, Material und priorisiertem Dispatch.",
    avatar: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "prov-3",
    name: "Sarah Schmidt",
    role: "Adult-Casual",
    distanceKm: 11.4,
    hourlyRate: 18,
    rating: 4.5,
    trustScore: 86,
    responseMins: 22,
    workingToday: false,
    isNew: true,
    location: "Köln-Süd",
    skills: ["Rasen mähen", "Unkraut jäten", "Gießen", "Pflanzberatung"],
    about: "Zuverlässig für regelmäßige Einsätze. Freundlich, flexibel und gut bewertet.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "prov-4",
    name: "Nordgrün Service",
    role: "Adult-Pro",
    distanceKm: 18.8,
    hourlyRate: 52,
    rating: 4.7,
    trustScore: 97,
    responseMins: 14,
    workingToday: true,
    isNew: false,
    location: "Leverkusen",
    skills: ["Schädlingsbekämpfung", "Pflasterarbeiten", "Wurzelentfernung", "Baggerarbeiten"],
    about: "Für anspruchsvollere Aufträge mit Team, Material und straffer Dispatch-Zeit.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=240"
  }
];

const weeklySlots = [
  { day: "Mon", time: "14:00 - 16:00" },
  { day: "Tue", time: "09:00 - 12:00" },
  { day: "Wed", time: "15:00 - 18:00" },
  { day: "Thu", time: "10:00 - 13:00" },
  { day: "Fri", time: "08:00 - 10:00" },
  { day: "Sat", time: "10:00 - 12:00" },
  { day: "Sun", time: "geschlossen" }
];

const invoiceItems = [
  { label: "Arbeitskosten", value: "EUR 180.00" },
  { label: "Materialkosten", value: "EUR 24.50" },
  { label: "Servicegebühr", value: "EUR 18.00" },
  { label: "Haftpflicht-Umlage", value: "EUR 3.60" }
];

const copy = {
  DE: {
    home: "Home",
    booking: "Buchung",
    dispatch: "Dispatch",
    login: "Anfrage starten",
    register: "Als Helfer starten",
    request: "Wann brauchst du Gartenarbeit?",
    requestLead: "Datum, Uhrzeit und Ort oben angeben, dann dispatchen wir passende Helfer in deiner Nähe.",
    requestButton: "Verfügbarkeit prüfen",
    appTitle: "GreenMatch Dispatch",
    start: "Los geht's",
    summary: "Live-Dispatch",
    helpers: "Verfügbare Helfer",
    profile: "Profil",
    radius: "Radius",
    search: "Suche",
    workingToday: "Ich arbeite heute",
    notWorkingToday: "Heute keine Zeit",
    trust: "Trust",
    rating: "Bewertung",
    response: "Antwortzeit",
    ticket: "Dispatch-Ticket",
    availability: "Verfügbarkeit",
    annual: "Vermittlungsübersicht",
    filterHint: "Filter nach Nähe, Antwortzeit und Aufgabenart.",
    profileHint: "Dein Profil, Verfügbarkeit und Dispatch-Rolle.",
    checkout: "Rechnungsansicht",
    heroMetric: "Live-Dispatches",
    modeCustomer: "Ich brauche Hilfe",
    modeHelper: "Ich biete Hilfe",
    landingBullets: ["Datum, Uhrzeit und Ort", "Sofort anfragen", "Direkt in die Dispatch-App"],
    landingCards: [
      { title: "Anfrage statt Inserat", text: "Ein Request führt zur Vermittlung. Keine Liste, sondern ein direkter Dispatch-Flow." },
      { title: "Live-Dispatch", text: "Status, Antwortzeit und Verfügbarkeit werden sofort sichtbar." },
      { title: "Zwei Rollen", text: "Kunden und Helfer bekommen getrennte Oberflächen mit klaren Aufgaben." }
    ]
  },
  EN: {
    home: "Home",
    booking: "Booking",
    dispatch: "Dispatch",
    login: "Start request",
    register: "Join as helper",
    request: "When do you need garden work?",
    requestLead: "Enter date, time, and location above and we dispatch matching helpers nearby.",
    requestButton: "Check availability",
    appTitle: "GreenMatch Dispatch",
    start: "Let's go",
    summary: "Live dispatch",
    helpers: "Available helpers",
    profile: "Profile",
    radius: "Radius",
    search: "Search",
    workingToday: "I work today",
    notWorkingToday: "Not available today",
    trust: "Trust",
    rating: "Rating",
    response: "Response",
    ticket: "Dispatch ticket",
    availability: "Availability",
    annual: "Dispatch overview",
    filterHint: "Filter by distance, response time, and task type.",
    profileHint: "Your profile, availability, and dispatch role.",
    checkout: "Invoice view",
    heroMetric: "Live dispatches",
    modeCustomer: "I need help",
    modeHelper: "I offer help",
    landingBullets: ["Date, time, and location", "Request instantly", "Straight into the dispatch app"],
    landingCards: [
      { title: "Request, not listings", text: "A request triggers the match. No directory, just an on-demand dispatch flow." },
      { title: "Live dispatch", text: "Status, response time, and availability are visible right away." },
      { title: "Two roles", text: "Customers and helpers get separate surfaces with clear jobs." }
    ]
  }
} as const;

function buildQuery(params: Record<string, string>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  return search.toString();
}

export function GreenMatchExperience({
  initialView = "landing",
  initialDate = "",
  initialTime = "",
  initialLocation = "",
  initialTask = "",
  initialMode = "customer"
}: GreenMatchExperienceProps) {
  const router = useRouter();
  const [view, setView] = useState<View>(initialView);
  const [locale, setLocale] = useState<Locale>("DE");
  const [mode, setMode] = useState<RequestMode>(initialMode);
  const [appTab, setAppTab] = useState<AppTab>("dashboard");
  const [distanceKm, setDistanceKm] = useState(12);
  const [search, setSearch] = useState("");
  const [needDate, setNeedDate] = useState(initialDate);
  const [needTime, setNeedTime] = useState(initialTime);
  const [needLocation, setNeedLocation] = useState(initialLocation);
  const [needTask, setNeedTask] = useState(initialTask);

  const t = copy[locale];

  const filteredHelpers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return helpers
      .filter((helper) => helper.distanceKm <= distanceKm)
      .filter((helper) => {
        if (!term) return true;
        return (
          helper.name.toLowerCase().includes(term) ||
          helper.location.toLowerCase().includes(term) ||
          helper.skills.some((skill) => skill.toLowerCase().includes(term))
        );
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [distanceKm, search]);

  const psttg = evaluatePsttg({ transactions: 22, revenueEuro: 1640, taxIdVerified: false });
  const slotCheck = validateWorkSlot({
    dateOfBirth: "2010-06-10",
    startTime: "14:00",
    endTime: "16:00",
    taskKey: "weeding",
    alreadyWorkedMinutesToday: 60,
    workedDaysThisWeek: 2,
    earnedThisMonthEuro: 48
  });

  const navigate = (path: string) => router.push(path);
  const openBooking = () => {
    const query = buildQuery({
      date: needDate,
      time: needTime,
      location: needLocation,
      task: needTask,
      mode
    });
    navigate(`/booking${query ? `?${query}` : ""}`);
  };
  const openDispatch = () => {
    const query = buildQuery({ mode });
    setAppTab(mode === "helper" ? "helpers" : "dashboard");
    navigate(`/dispatch${query ? `?${query}` : ""}`);
  };

  const dispatchStats =
    mode === "helper"
      ? [
          { label: locale === "DE" ? "Eingehende Requests" : "Incoming requests", value: "12", hint: locale === "DE" ? "Warten auf Annahme" : "Waiting for acceptance" },
          { label: locale === "DE" ? "Bestätigt" : "Confirmed", value: "7", hint: locale === "DE" ? "Auftrag gesichert" : "Job secured" },
          { label: locale === "DE" ? "Treuhand" : "Escrow", value: "EUR 1,820", hint: locale === "DE" ? "Aktiv" : "Active" }
        ]
      : [
          { label: locale === "DE" ? "Offene Requests" : "Open requests", value: "12", hint: locale === "DE" ? "Warten auf Dispatch" : "Waiting for dispatch" },
          { label: locale === "DE" ? "Gematcht" : "Matched", value: "7", hint: locale === "DE" ? "Helfer bestätigt" : "Helpers confirmed" },
          { label: locale === "DE" ? "Treuhand" : "Escrow", value: "EUR 1,820", hint: locale === "DE" ? "Gesichert" : "Secured" }
        ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbf9_0%,#eef5f0_42%,#e9efea_100%)] text-forest-900">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => setView("landing")} className="flex items-center gap-3 text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-forest-700 to-forest-500 text-lg font-black text-white shadow-soft">
              G
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-forest-900">GreenMatch</div>
              <div className="text-xs font-medium uppercase tracking-[0.26em] text-forest-500">
                {locale === "DE" ? "On-demand Gartenvermittlung" : "On-demand garden dispatch"}
              </div>
            </div>
          </button>

          <div className="hidden items-center gap-2 rounded-full border border-forest-100 bg-white px-2 py-2 md:flex">
            {(["landing", "booking", "dispatch"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={cn(
                  "min-h-11 rounded-full px-4 text-sm font-semibold transition",
                  view === item ? "bg-forest-700 text-white" : "text-forest-700 hover:bg-forest-50"
                )}
              >
                {item === "landing" ? t.home : item === "booking" ? t.booking : t.dispatch}
              </button>
            ))}
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
              onClick={openBooking}
              className="min-h-11 rounded-full bg-forest-700 px-4 text-sm font-semibold text-white transition hover:bg-forest-800"
            >
              {t.login}
            </button>
          </div>
        </div>
      </header>

      {view === "landing" && (
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <section className="surface booking-strip">
            <label className="field">
              <span>{locale === "DE" ? "Wann?" : "When?"}</span>
              <input value={needDate} onChange={(e) => setNeedDate(e.target.value)} type="date" className="input" />
            </label>
            <label className="field">
              <span>{locale === "DE" ? "Uhrzeit" : "Time"}</span>
              <input value={needTime} onChange={(e) => setNeedTime(e.target.value)} type="time" className="input" />
            </label>
            <label className="field booking-wide">
              <span>{locale === "DE" ? "Ort / PLZ" : "Location / ZIP"}</span>
              <input value={needLocation} onChange={(e) => setNeedLocation(e.target.value)} placeholder="Düsseldorf 40210" className="input" />
            </label>
            <label className="field booking-wide">
              <span>{locale === "DE" ? "Was soll gemacht werden?" : "What needs doing?"}</span>
              <input value={needTask} onChange={(e) => setNeedTask(e.target.value)} placeholder={locale === "DE" ? "Rasen mähen, Hecke schneiden..." : "Lawn mowing, hedge trimming..."} className="input" />
            </label>
            <button type="button" onClick={openBooking} className="btn-primary booking-button">
              {t.requestButton}
            </button>
          </section>

          <CinematicLandingHero
            brandName="GreenMatch"
            tagline1={locale === "DE" ? "Gartenhilfe" : "Garden help"}
            tagline2={locale === "DE" ? "auf Abruf." : "on demand."}
            cardHeading={locale === "DE" ? "Dispatch first." : "Dispatch first."}
            cardDescription={
              locale === "DE"
                ? "Der Kunde stellt die Anfrage, die Plattform verteilt sie an verfügbare Helfer. Genau wie ein On-demand-Dienst, nur für Gartenarbeit."
                : "Customers submit a request and the platform routes it to available helpers. On-demand matching, built for garden work."
            }
            metricValue={42}
            metricLabel={t.heroMetric}
            ctaHeading={t.request}
            ctaDescription={locale === "DE" ? "Buchung starten" : "Start booking"}
            primaryActionLabel={t.login}
            secondaryActionLabel={t.register}
            onPrimaryAction={openBooking}
            onSecondaryAction={() => setView("dispatch")}
          />

          <section className="mt-6 grid gap-4 md:grid-cols-3">
            {t.landingCards.map((card) => (
              <article key={card.title} className="surface landing-card">
                <h3 className="text-lg font-semibold text-forest-900">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-forest-700">{card.text}</p>
              </article>
            ))}
          </section>
        </main>
      )}

      {view === "booking" && (
        <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <section className="surface booking-panel">
            <div className="eyebrow">{t.booking}</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-forest-900">{t.request}</h1>
            <p className="mt-3 text-sm leading-7 text-forest-700">{t.requestLead}</p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <label className="field">
                <span>{locale === "DE" ? "Datum" : "Date"}</span>
                <input value={needDate} onChange={(e) => setNeedDate(e.target.value)} type="date" className="input" />
              </label>
              <label className="field">
                <span>{locale === "DE" ? "Uhrzeit" : "Time"}</span>
                <input value={needTime} onChange={(e) => setNeedTime(e.target.value)} type="time" className="input" />
              </label>
              <label className="field md:col-span-2">
                <span>{locale === "DE" ? "Ort / PLZ" : "Location / ZIP"}</span>
                <input value={needLocation} onChange={(e) => setNeedLocation(e.target.value)} placeholder="Düsseldorf 40210" className="input" />
              </label>
              <label className="field md:col-span-2">
                <span>{locale === "DE" ? "Aufgabe" : "Task"}</span>
                <input value={needTask} onChange={(e) => setNeedTask(e.target.value)} placeholder={locale === "DE" ? "Unkraut jäten, Rasen mähen..." : "Weeding, mowing..."} className="input" />
              </label>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setMode("customer")}
                className={cn("min-h-12 rounded-2xl border px-4 text-left text-sm font-semibold transition", mode === "customer" ? "border-forest-500 bg-forest-50 text-forest-900" : "border-forest-100 bg-white text-forest-700")}
              >
                {t.modeCustomer}
              </button>
              <button
                type="button"
                onClick={() => setMode("helper")}
                className={cn("min-h-12 rounded-2xl border px-4 text-left text-sm font-semibold transition", mode === "helper" ? "border-forest-500 bg-forest-50 text-forest-900" : "border-forest-100 bg-white text-forest-700")}
              >
                {t.modeHelper}
              </button>
            </div>

            <button type="button" onClick={openDispatch} className="mt-6 min-h-12 w-full rounded-2xl bg-forest-700 px-5 text-sm font-semibold text-white transition hover:bg-forest-800">
              {locale === "DE" ? "Anfrage bestätigen" : "Confirm request"}
            </button>

            <div className="mt-5 rounded-3xl border border-forest-100 bg-forest-50 p-4 text-sm text-forest-800">
              {mode === "helper"
                ? locale === "DE"
                  ? "Helfer-Flow: Die Anfrage geht direkt in die Queue."
                  : "Helper flow: the request goes straight into the queue."
                : locale === "DE"
                  ? "Kunden-Flow: Wir dispatchen passende Helfer in deiner Nähe."
                  : "Customer flow: we dispatch matching helpers near you."}
            </div>
          </section>

          <aside className="space-y-6">
            <article className="surface booking-preview">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-forest-900">{locale === "DE" ? "Vorschau" : "Preview"}</h3>
                  <p className="mt-1 text-sm text-forest-600">{locale === "DE" ? "So wird die Anfrage dispatcht." : "This is how the request is dispatched."}</p>
                </div>
                <span className="status-pill">{filteredHelpers.length}</span>
              </div>
              <div className="mt-4 grid gap-3">
                <div className="info-row"><span>{locale === "DE" ? "Wann" : "When"}</span><strong>{needDate || "—"}</strong></div>
                <div className="info-row"><span>{locale === "DE" ? "Zeit" : "Time"}</span><strong>{needTime || "—"}</strong></div>
                <div className="info-row"><span>{locale === "DE" ? "Ort" : "Location"}</span><strong>{needLocation || "—"}</strong></div>
                <div className="info-row"><span>{locale === "DE" ? "Aufgabe" : "Task"}</span><strong>{needTask || "—"}</strong></div>
              </div>
            </article>

            <article className="surface booking-preview">
              <h3 className="text-xl font-semibold text-forest-900">{locale === "DE" ? "Passende Helfer" : "Matching helpers"}</h3>
              <div className="mt-4 space-y-3">
                {filteredHelpers.slice(0, 3).map((helper) => (
                  <div key={helper.id} className="rounded-2xl border border-forest-100 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <strong className="text-forest-900">{helper.name}</strong>
                          <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">{helper.role}</span>
                        </div>
                        <p className="mt-1 text-sm text-forest-600">
                          {helper.location} • {helper.distanceKm.toFixed(1)} km • {helper.responseMins} {t.response}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs uppercase tracking-[0.22em] text-forest-500">{t.rating}</div>
                        <div className="text-lg font-semibold text-forest-900">{helper.rating.toFixed(1)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </main>
      )}

      {view === "dispatch" && (
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-soft">
            <div className="flex flex-col gap-4 border-b border-forest-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-forest-500">{t.appTitle}</div>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-forest-900">
                  {mode === "helper"
                    ? locale === "DE"
                      ? "Helfer-Queue"
                      : "Helper queue"
                    : locale === "DE"
                      ? "Dispatch-Zentrale"
                      : "Dispatch center"}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {(["dashboard", "helpers", "profile"] as AppTab[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setAppTab(tab)}
                    className={cn("min-h-11 rounded-full px-4 text-sm font-semibold transition", appTab === tab ? "bg-forest-700 text-white" : "bg-forest-50 text-forest-700 hover:bg-forest-100")}
                  >
                    {tab === "dashboard" ? t.summary : tab === "helpers" ? t.helpers : t.profile}
                  </button>
                ))}

                <div className="ml-2 flex items-center gap-3 rounded-full border border-forest-100 bg-white px-3 py-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-700 text-sm font-semibold text-white">
                    M
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-semibold text-forest-900">Mara Becker</div>
                    <div className="text-xs text-forest-500">{mode === "helper" ? t.modeHelper : t.modeCustomer}</div>
                  </div>
                  <button type="button" onClick={() => setView("landing")} className="ml-2 min-h-11 rounded-full border border-forest-100 px-4 text-sm font-semibold text-forest-700">
                    {locale === "DE" ? "Zur Startseite" : "Back home"}
                  </button>
                </div>
              </div>
            </div>

            {appTab === "dashboard" && (
              <section className="grid gap-6 p-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    {dispatchStats.map((card) => (
                      <article key={card.label} className="rounded-[1.5rem] border border-forest-100 bg-forest-50 p-5">
                        <div className="text-xs uppercase tracking-[0.22em] text-forest-500">{card.label}</div>
                        <div className="mt-2 text-2xl font-semibold text-forest-900">{card.value}</div>
                        <div className="mt-1 text-xs text-forest-600">{card.hint}</div>
                      </article>
                    ))}
                  </div>

                  <section className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-forest-900">{t.summary}</h3>
                        <p className="mt-1 text-sm text-forest-600">
                          {locale === "DE" ? "Anfrage -> Match -> Annahme -> Anfahrt -> Abschluss." : "Request -> match -> accept -> arrive -> finish."}
                        </p>
                      </div>
                      <span className="rounded-full bg-forest-50 px-3 py-2 text-xs font-semibold text-forest-700">{psttg.status}</span>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-4">
                      {[locale === "DE" ? "Anfrage offen" : "Request open", locale === "DE" ? "Gematcht" : "Matched", locale === "DE" ? "Annahme" : "Accepted", locale === "DE" ? "Unterwegs" : "On the way"].map((step, index) => (
                        <div key={step} className={cn("rounded-2xl border p-4 text-sm font-semibold", index < 2 ? "border-forest-200 bg-forest-50 text-forest-900" : "border-forest-100 bg-white text-forest-600")}>
                          {step}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-2xl border border-forest-100 bg-white p-4 text-sm text-forest-700">
                      {psttg.message}
                      <div className="mt-2 text-forest-600">{psttg.nextAction}</div>
                    </div>
                  </section>
                </div>

                <aside className="space-y-6">
                  <section className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                    <h3 className="text-xl font-semibold text-forest-900">{t.annual}</h3>
                    <div className="mt-4 grid gap-3">
                      {[
                        { label: locale === "DE" ? "Requests" : "Requests", value: "22" },
                        { label: locale === "DE" ? "Umsatz" : "Revenue", value: "EUR 1,640" },
                        { label: locale === "DE" ? "Annahmen" : "Acceptances", value: "14" }
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between rounded-2xl bg-forest-50 px-4 py-3">
                          <span className="text-sm text-forest-600">{row.label}</span>
                          <strong className="text-sm text-forest-900">{row.value}</strong>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                    <h3 className="text-xl font-semibold text-forest-900">{t.checkout}</h3>
                    <div className="mt-4 space-y-3">
                      {invoiceItems.map((item) => (
                        <div key={item.label} className="flex items-center justify-between rounded-2xl bg-forest-50 px-4 py-3">
                          <span className="text-sm text-forest-600">{item.label}</span>
                          <strong className="text-sm text-forest-900">{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  </section>
                </aside>
              </section>
            )}

            {appTab === "helpers" && (
              <section className="grid gap-6 p-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-6">
                  <article className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-forest-900">{t.helpers}</h3>
                        <p className="mt-1 text-sm text-forest-600">{t.filterHint}</p>
                      </div>
                      <span className="rounded-full bg-forest-50 px-3 py-2 text-xs font-semibold text-forest-700">{filteredHelpers.length}</span>
                    </div>

                    <div className="mt-5 grid gap-4">
                      <label className="grid gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">{t.search}</span>
                        <input value={search} onChange={(event) => setSearch(event.target.value)} className="min-h-12 rounded-2xl border border-forest-100 px-4 outline-none focus:border-forest-400" placeholder={locale === "DE" ? "Name, Ort oder Skill" : "Name, location, or skill"} />
                      </label>
                      <label className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">{t.radius}</span>
                          <strong className="text-sm text-forest-900">{distanceKm} km</strong>
                        </div>
                        <input type="range" min={5} max={25} step={1} value={distanceKm} onChange={(event) => setDistanceKm(Number(event.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-forest-100 accent-forest-700" />
                      </label>
                    </div>
                  </article>

                  <article className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                    <h3 className="text-xl font-semibold text-forest-900">{locale === "DE" ? "Geografische Vorschau" : "Geographic preview"}</h3>
                    <div className="mt-4 rounded-[1.75rem] border border-forest-100 bg-[radial-gradient(circle_at_center,rgba(47,141,70,0.14),transparent_26%),linear-gradient(180deg,#f7faf8_0%,#edf6f0_100%)] p-5">
                      <div className="relative h-56 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/70">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(31,90,49,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(31,90,49,0.05)_1px,transparent_1px)] bg-[size:36px_36px]" />
                        {filteredHelpers.slice(0, 3).map((helper, index) => (
                          <div key={helper.id} className={cn("absolute h-6 w-6 rounded-full border-2 border-white shadow-lg", index === 0 ? "left-16 top-20 bg-emerald-500" : index === 1 ? "left-44 top-32 bg-forest-700" : "right-20 top-16 bg-soil-500")} title={`${helper.name} • ${helper.distanceKm} km`} />
                        ))}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="rounded-full border border-forest-200 bg-white/90 px-4 py-2 text-sm font-semibold text-forest-800">{distanceKm} km</div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="space-y-4">
                  {filteredHelpers.map((helper) => (
                    <article key={helper.id} className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <img src={helper.avatar} alt={helper.name} className="h-16 w-16 rounded-2xl object-cover" />
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-lg font-semibold text-forest-900">{helper.name}</h4>
                              {helper.isNew && <span className="rounded-full bg-soil-100 px-3 py-1 text-xs font-semibold text-soil-800">{locale === "DE" ? "Neu" : "New"}</span>}
                              <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">{helper.role}</span>
                            </div>
                            <p className="mt-1 text-sm text-forest-600">{helper.location} • {helper.distanceKm.toFixed(1)} km • {helper.responseMins} {t.response}</p>
                            <p className="mt-2 text-sm leading-6 text-forest-700">{helper.about}</p>
                          </div>
                        </div>
                        <div className="rounded-2xl bg-forest-50 px-4 py-3 text-right">
                          <div className="text-xs uppercase tracking-[0.22em] text-forest-500">{t.rating}</div>
                          <div className="text-lg font-semibold text-forest-900">{helper.rating.toFixed(1)}</div>
                          <div className="text-xs text-forest-600">{helper.hourlyRate} EUR/h</div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {helper.skills.map((skill) => (
                          <span key={skill} className="rounded-full bg-forest-50 px-3 py-2 text-xs font-semibold text-forest-700">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-forest-100 bg-white px-4 py-3">
                        <span className="text-sm text-forest-600">{helper.workingToday ? t.workingToday : t.notWorkingToday}</span>
                        <strong className="text-sm text-forest-900">
                          {helper.trustScore}% {t.trust}
                        </strong>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {appTab === "profile" && (
              <section className="grid gap-6 p-5 lg:grid-cols-[0.95fr_1.05fr]">
                <article className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                  <h3 className="text-xl font-semibold text-forest-900">{t.profile}</h3>
                  <p className="mt-1 text-sm text-forest-600">{t.profileHint}</p>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">{locale === "DE" ? "Vorname" : "First name"}</span>
                      <input defaultValue="Mara" className="min-h-12 rounded-2xl border border-forest-100 px-4" />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">{locale === "DE" ? "Nachname" : "Last name"}</span>
                      <input defaultValue="Becker" className="min-h-12 rounded-2xl border border-forest-100 px-4" />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">E-Mail</span>
                      <input defaultValue="mara@example.com" className="min-h-12 rounded-2xl border border-forest-100 px-4" />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">{locale === "DE" ? "Steuer-ID" : "Tax ID"}</span>
                      <input placeholder="12345678901" className="min-h-12 rounded-2xl border border-forest-100 px-4" />
                    </label>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-forest-100 bg-forest-50 px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold text-forest-900">{locale === "DE" ? "Arbeitsmodus" : "Working mode"}</div>
                      <div className="text-xs text-forest-600">{locale === "DE" ? "Sichtbar im Kalender" : "Visible in calendar"}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMode(mode === "customer" ? "helper" : "customer")}
                      className="min-h-11 rounded-full bg-forest-700 px-4 text-sm font-semibold text-white"
                    >
                      {mode === "customer" ? t.modeCustomer : t.modeHelper}
                    </button>
                  </div>
                </article>

                <article className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-forest-900">{locale === "DE" ? "Wochenplanung" : "Weekly plan"}</h3>
                      <p className="mt-1 text-sm text-forest-600">
                        {locale === "DE" ? "Wochenübersicht mit JArbSchG-Validierung" : "Weekly schedule with JArbSchG validation"}
                      </p>
                    </div>
                    <span className="rounded-full bg-forest-50 px-3 py-2 text-xs font-semibold text-forest-700">
                      {slotCheck.allowed ? "OK" : "Blockiert"}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2">
                    {weeklySlots.map((slot) => (
                      <div key={slot.day} className="flex items-center justify-between rounded-2xl bg-forest-50 px-4 py-3">
                        <span className="text-sm font-semibold text-forest-900">{slot.day}</span>
                        <span className="text-sm text-forest-700">{slot.time}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-forest-100 bg-white p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">{locale === "DE" ? "Validierung" : "Validation"}</div>
                    <div className="mt-2 text-sm font-semibold text-forest-900">
                      {slotCheck.allowed
                        ? locale === "DE"
                          ? "Slot ist JArbSchG-konform."
                          : "Slot is JArbSchG compliant."
                        : slotCheck.reason}
                    </div>
                    <p className="mt-2 text-sm text-forest-600">
                      {locale === "DE"
                        ? "Der Kalender blockiert Jugendliche außerhalb der erlaubten Zeitfenster und bei Überschreitung der Tageszeit."
                        : "The calendar blocks youth bookings outside allowed windows and when daily caps are exceeded."}
                    </p>
                  </div>
                </article>
              </section>
            )}
          </div>
        </main>
      )}
    </div>
  );
}
