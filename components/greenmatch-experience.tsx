"use client";

import { useMemo, useState } from "react";
import { CinematicLandingHero } from "@/components/ui/cinematic-landing-hero";
import { cn } from "@/lib/utils";
import { evaluatePsttg, validateWorkSlot } from "@/lib/policy";

type Locale = "DE" | "EN";
type View = "landing" | "auth" | "app";
type AppTab = "dashboard" | "gardeners" | "profile";
type AuthMode = "login" | "signup";
type AuthRole = "customer" | "provider";

type MarketProvider = {
  id: string;
  name: string;
  role: "Youth" | "Adult-Casual" | "Adult-Pro";
  distanceKm: number;
  hourlyRate: number;
  rating: number;
  trustScore: number;
  workingToday: boolean;
  isNew: boolean;
  location: string;
  skills: string[];
  about: string;
  avatar: string;
};

const marketProviders: MarketProvider[] = [
  {
    id: "prov-1",
    name: "Jonas Müller",
    role: "Youth",
    distanceKm: 3.2,
    hourlyRate: 12,
    rating: 4.8,
    trustScore: 92,
    workingToday: true,
    isNew: false,
    location: "Düsseldorf-Süd",
    skills: ["Unkraut jäten", "Gießen", "Laub harken", "Rasen mähen"],
    about: "Leichte Gartenarbeiten im Tageszeitraum, sauber, freundlich und mit elterlicher Zustimmung.",
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
    workingToday: true,
    isNew: false,
    location: "Düsseldorf-Nord",
    skills: ["Baumschnitt > 2m", "Heckenschnitt", "Pflasterarbeiten", "Teichbau"],
    about: "Zertifizierter Betrieb mit Versicherung, Rechnung und vollem Profi-Setup.",
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
    workingToday: false,
    isNew: true,
    location: "Köln-Süd",
    skills: ["Rasen mähen", "Unkraut jäten", "Gießen", "Pflanzberatung"],
    about: "Zuverlässige Hilfe bei leichten und mittleren Aufgaben, ideal für Stammhelfer-Kunden.",
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
    workingToday: true,
    isNew: false,
    location: "Leverkusen",
    skills: ["Schädlingsbekämpfung", "Pflasterarbeiten", "Wurzelentfernung", "Baggerarbeiten"],
    about: "Für anspruchsvollere Aufträge mit eigenem Material und professioneller Haftung.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=240"
  }
];

const copy = {
  DE: {
    login: "Anmelden",
    register: "Registrieren",
    logout: "Abmelden",
    dashboard: "Dashboard",
    gardeners: "Gartenarbeiter",
    profile: "Profil",
    marketplace: "Marktplatz",
    welcome: "Vertrauen, Rechtssicherheit und klare Verbindungen für Gartenarbeit in Deutschland.",
    startLogin: "Mit Login starten",
    startSignup: "Konto erstellen",
    openApp: "In die App",
    summary: "Übersicht",
    myCrew: "My Garden Crew",
    invoices: "Rechnungen",
    escrow: "Treuhand",
    availability: "Verfügbarkeit",
    distance: "Umkreis",
    filterHint: "Filtere Gartenarbeiter nach Nähe, Status und Rolle.",
    profileHint: "Dein Profil, deine Steuerdaten und deine Verfügbarkeit.",
    workingToday: "Ich arbeite heute",
    notWorkingToday: "Ich arbeite heute nicht",
    roleCustomer: "Arbeitgeber",
    roleProvider: "Gartenarbeiter",
    appTitle: "GreenMatch App",
    distanceLabel: "Entfernung",
    radius: "Radius",
    search: "Suche",
    trust: "Trust",
    rating: "Bewertung",
    newBadge: "Ich bin neu",
    workingNow: "Jetzt verfügbar",
    checkout: "Rechnungsansicht",
    profileCard: "Mein Profil",
    weekPlan: "Wochenplanung"
  },
  EN: {
    login: "Log in",
    register: "Register",
    logout: "Log out",
    dashboard: "Dashboard",
    gardeners: "Gardeners",
    profile: "Profile",
    marketplace: "Marketplace",
    welcome: "Trust, compliance, and clear matches for garden work in Germany.",
    startLogin: "Start with login",
    startSignup: "Create account",
    openApp: "Open app",
    summary: "Overview",
    myCrew: "My Garden Crew",
    invoices: "Invoices",
    escrow: "Escrow",
    availability: "Availability",
    distance: "Radius",
    filterHint: "Filter gardeners by distance, availability, and role.",
    profileHint: "Your profile, tax details, and availability.",
    workingToday: "I work today",
    notWorkingToday: "I do not work today",
    roleCustomer: "Customer",
    roleProvider: "Gardener",
    appTitle: "GreenMatch App",
    distanceLabel: "Distance",
    radius: "Radius",
    search: "Search",
    trust: "Trust",
    rating: "Rating",
    newBadge: "I'm new",
    workingNow: "Available now",
    checkout: "Invoice view",
    profileCard: "My profile",
    weekPlan: "Weekly plan"
  }
} as const;

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

export function GreenMatchExperience() {
  const [view, setView] = useState<View>("landing");
  const [locale, setLocale] = useState<Locale>("DE");
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [authRole, setAuthRole] = useState<AuthRole>("customer");
  const [appTab, setAppTab] = useState<AppTab>("dashboard");
  const [distanceKm, setDistanceKm] = useState(12);
  const [search, setSearch] = useState("");
  const [currentUser] = useState({
    firstName: "Mara",
    lastName: "Becker",
    role: "customer" as AuthRole,
    email: "mara@example.com"
  });

  const t = copy[locale];

  const filteredProviders = useMemo(() => {
    const term = search.trim().toLowerCase();

    return marketProviders
      .filter((provider) => provider.distanceKm <= distanceKm)
      .filter((provider) => {
        if (!term) return true;
        return (
          provider.name.toLowerCase().includes(term) ||
          provider.location.toLowerCase().includes(term) ||
          provider.skills.some((skill) => skill.toLowerCase().includes(term))
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

  const openApp = (role: AuthRole) => {
    setAuthRole(role);
    setView("auth");
  };

  const completeAuth = () => {
    setView("app");
    setAppTab(authRole === "provider" ? "gardeners" : "dashboard");
  };

  const isProvider = authRole === "provider";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbf9_0%,#eef5f0_42%,#e9efea_100%)] text-forest-900">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setView("landing")}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-forest-700 to-forest-500 text-lg font-black text-white shadow-soft">
              G
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-forest-900">GreenMatch</div>
              <div className="text-xs font-medium uppercase tracking-[0.26em] text-forest-500">
                {locale === "DE" ? "Rechtssichere Garten-Vermittlung" : "Compliant garden marketplace"}
              </div>
            </div>
          </button>

          <div className="hidden items-center gap-2 rounded-full border border-forest-100 bg-white px-2 py-2 md:flex">
            {(["landing", "auth", "app"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={cn(
                  "min-h-11 rounded-full px-4 text-sm font-semibold transition",
                  view === item ? "bg-forest-700 text-white" : "text-forest-700 hover:bg-forest-50"
                )}
              >
                {item === "landing"
                  ? "Home"
                  : item === "auth"
                    ? locale === "DE"
                      ? "Anmelden"
                      : "Sign in"
                    : t.appTitle}
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
              onClick={() => openApp("customer")}
              className="min-h-11 rounded-full bg-forest-700 px-4 text-sm font-semibold text-white transition hover:bg-forest-800"
            >
              {t.login}
            </button>
          </div>
        </div>
      </header>

      {view === "landing" && (
        <main>
          <CinematicLandingHero
            brandName="GreenMatch"
            tagline1={locale === "DE" ? "Gartenarbeit," : "Garden work,"}
            tagline2={locale === "DE" ? "neu gedacht." : "reimagined."}
            cardHeading={locale === "DE" ? "Vertrauen zuerst." : "Trust first."}
            cardDescription={
              locale === "DE"
                ? "Ein klarer Einstieg für Arbeitgeber und Gartenarbeiter, mit hochwertigem, ruhigem Design und einer echten App darunter."
                : "A calm, premium entry point for customers and gardeners, with a real app experience behind the sign-in flow."
            }
            metricValue={42}
            metricLabel={locale === "DE" ? "Heutige Matches" : "Matches today"}
            ctaHeading={t.startLogin}
            ctaDescription={t.startSignup}
            primaryActionLabel={t.login}
            secondaryActionLabel={t.register}
            onPrimaryAction={() => openApp("customer")}
            onSecondaryAction={() => {
              setAuthMode("signup");
              setView("auth");
            }}
          />

          <section className="mx-auto -mt-8 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: locale === "DE" ? "Rechtssicherheit" : "Compliance",
                  text:
                    locale === "DE"
                      ? "JArbSchG, PStTG und Rechnungen sind als echte Produktlogik und nicht nur als Text im Footer angelegt."
                      : "JArbSchG, PStTG and invoice logic are part of the product, not just marketing copy.",
                },
                {
                  title: locale === "DE" ? "Premium UI" : "Premium UI",
                  text:
                    locale === "DE"
                      ? "Klarer Premium-Look mit kräftiger Typo, ruhigen Oberflächen und präzisen Interaktionen."
                      : "A premium visual language with strong typography, calm surfaces, and precise interactions.",
                },
                {
                  title: locale === "DE" ? "Zwei Welten" : "Two worlds",
                  text:
                    locale === "DE"
                      ? "Die Website führt zur App, und die App hat eigene Bereiche für Dashboard, Gartenarbeiter und Profil."
                      : "The landing page leads into a distinct app shell with dashboard, gardeners, and profile sections.",
                }
              ].map((card) => (
                <article key={card.title} className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-soft">
                  <h3 className="text-lg font-semibold text-forest-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-forest-700">{card.text}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      {view === "auth" && (
        <main className="mx-auto flex max-w-5xl items-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid w-full gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-soft">
              <div className="inline-flex items-center gap-2 rounded-full border border-forest-100 bg-forest-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-forest-600">
                {locale === "DE" ? "Anmeldung" : "Authentication"}
              </div>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-forest-900">
                {authMode === "login"
                  ? locale === "DE"
                    ? "Mit wenigen Klicks in die App."
                    : "Jump straight into the app."
                  : locale === "DE"
                    ? "Ein Konto mit echter Rollenlogik."
                    : "Create an account with real role logic."}
              </h1>
              <p className="mt-3 text-sm leading-7 text-forest-700">
                {locale === "DE"
                  ? "Die Registrierungsseite ist bewusst anders als die App. Nach dem Login wechseln wir in eine getrennte Produktoberfläche mit Dashboard, Gartenarbeiteransicht und Profil."
                  : "The sign-in page is intentionally different from the app. After login, we switch into a separate product surface with dashboard, gardener view, and profile."}
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  locale === "DE" ? "Erst Überzeugung, dann Nutzung" : "Convince first, then convert",
                  locale === "DE" ? "Jugendschutz und Steuer-Logik integriert" : "Youth and tax logic built in",
                  locale === "DE" ? "Premium statt Misch-Dashboard" : "Premium instead of mixed dashboards"
                ].map((point) => (
                  <div key={point} className="rounded-2xl border border-forest-100 bg-forest-50 px-4 py-3 text-sm text-forest-800">
                    {point}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <div className="grid grid-cols-2 rounded-full bg-forest-50 p-1 text-sm font-semibold">
                  <button
                    type="button"
                    onClick={() => setAuthMode("signup")}
                    className={cn("rounded-full px-4 py-3 transition", authMode === "signup" ? "bg-white shadow-sm" : "text-forest-500")}
                  >
                    {t.register}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className={cn("rounded-full px-4 py-3 transition", authMode === "login" ? "bg-white shadow-sm" : "text-forest-500")}
                  >
                    {t.login}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setLocale((value) => (value === "DE" ? "EN" : "DE"))}
                  className="min-h-11 rounded-full border border-forest-100 bg-white px-4 text-sm font-semibold text-forest-800"
                >
                  {locale}
                </button>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-500">E-Mail</span>
                  <input className="min-h-12 rounded-2xl border border-forest-100 px-4 outline-none focus:border-forest-400" placeholder="name@example.com" />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-500">Passwort</span>
                  <input type="password" className="min-h-12 rounded-2xl border border-forest-100 px-4 outline-none focus:border-forest-400" placeholder="••••••••" />
                </label>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setAuthRole("customer")}
                  className={cn(
                    "min-h-12 rounded-2xl border px-4 text-left text-sm font-semibold transition",
                    authRole === "customer" ? "border-forest-500 bg-forest-50 text-forest-900" : "border-forest-100 bg-white text-forest-700"
                  )}
                >
                  {t.roleCustomer}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthRole("provider")}
                  className={cn(
                    "min-h-12 rounded-2xl border px-4 text-left text-sm font-semibold transition",
                    authRole === "provider" ? "border-forest-500 bg-forest-50 text-forest-900" : "border-forest-100 bg-white text-forest-700"
                  )}
                >
                  {t.roleProvider}
                </button>
              </div>

              <button
                type="button"
                onClick={completeAuth}
                className="mt-6 min-h-12 w-full rounded-2xl bg-forest-700 px-5 text-sm font-semibold text-white transition hover:bg-forest-800"
              >
                {authMode === "login" ? t.openApp : t.startSignup}
              </button>

              <div className="mt-5 rounded-3xl border border-forest-100 bg-forest-50 p-4 text-sm text-forest-800">
                {authRole === "provider"
                  ? locale === "DE"
                    ? "Für Gartenarbeiter wird nach dem Login die Gartenarbeiterseite geöffnet."
                    : "For gardeners, the post-login experience opens the gardener marketplace."
                  : locale === "DE"
                    ? "Für Arbeitgeber öffnen wir direkt Dashboard und Gartenarbeiter-Filtersuche."
                    : "For customers, we open the dashboard plus the gardener filter workspace."}
              </div>
            </section>
          </div>
        </main>
      )}

      {view === "app" && (
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-soft">
            <div className="flex flex-col gap-4 border-b border-forest-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-forest-500">
                  {t.appTitle}
                </div>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-forest-900">
                  {authRole === "provider"
                    ? locale === "DE"
                      ? "Gartenarbeiterbereich"
                      : "Gardener workspace"
                    : locale === "DE"
                      ? "Arbeitgeber-Dashboard"
                      : "Customer dashboard"}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {(["dashboard", "gardeners", "profile"] as AppTab[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setAppTab(tab)}
                    className={cn(
                      "min-h-11 rounded-full px-4 text-sm font-semibold transition",
                      appTab === tab ? "bg-forest-700 text-white" : "bg-forest-50 text-forest-700 hover:bg-forest-100"
                    )}
                  >
                    {tab === "dashboard" ? t.dashboard : tab === "gardeners" ? t.gardeners : t.profile}
                  </button>
                ))}

                <div className="ml-2 flex items-center gap-3 rounded-full border border-forest-100 bg-white px-3 py-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-700 text-sm font-semibold text-white">
                    {currentUser.firstName[0]}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-semibold text-forest-900">
                      {currentUser.firstName} {currentUser.lastName}
                    </div>
                    <div className="text-xs text-forest-500">
                      {authRole === "provider" ? t.roleProvider : t.roleCustomer}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setView("landing")}
                    className="ml-2 min-h-11 rounded-full border border-forest-100 px-4 text-sm font-semibold text-forest-700"
                  >
                    {t.logout}
                  </button>
                </div>
              </div>
            </div>

            {appTab === "dashboard" && (
              <section className="grid gap-6 p-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { label: locale === "DE" ? "Aktive Aufträge" : "Active jobs", value: "12" },
                      { label: t.escrow, value: "EUR 1,820" },
                      { label: t.trust, value: "98%" }
                    ].map((card) => (
                      <article key={card.label} className="rounded-[1.5rem] border border-forest-100 bg-forest-50 p-5">
                        <div className="text-xs uppercase tracking-[0.22em] text-forest-500">{card.label}</div>
                        <div className="mt-2 text-2xl font-semibold text-forest-900">{card.value}</div>
                      </article>
                    ))}
                  </div>

                  <section className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-forest-900">
                          {locale === "DE" ? "Treuhand-Zahlungsfluss" : "Escrow payment flow"}
                        </h3>
                        <p className="mt-1 text-sm text-forest-600">
                          {"Payment pending -> escrow locked -> payout in progress -> paid / dispute."}
                        </p>
                      </div>
                      <span className="rounded-full bg-forest-50 px-3 py-2 text-xs font-semibold text-forest-700">
                        {psttg.status}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-4">
                      {["Zahlung offen", "Treuhand gesperrt", "In Auszahlung", "Ausgezahlt"].map((step, index) => (
                        <div
                          key={step}
                          className={cn(
                            "rounded-2xl border p-4 text-sm font-semibold",
                            index < 2 ? "border-forest-200 bg-forest-50 text-forest-900" : "border-forest-100 bg-white text-forest-600"
                          )}
                        >
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
                    <h3 className="text-xl font-semibold text-forest-900">
                      {locale === "DE" ? "Jahresübersicht" : "Annual summary"}
                    </h3>
                    <div className="mt-4 grid gap-3">
                      {[
                        { label: locale === "DE" ? "Transaktionen" : "Transactions", value: "22" },
                        { label: locale === "DE" ? "Umsatz" : "Revenue", value: "EUR 1,640" },
                        { label: locale === "DE" ? "Rechnungen" : "Invoices", value: "14" }
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between rounded-2xl bg-forest-50 px-4 py-3">
                          <span className="text-sm text-forest-600">{row.label}</span>
                          <strong className="text-sm text-forest-900">{row.value}</strong>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 min-h-12 w-full rounded-2xl bg-forest-700 px-4 text-sm font-semibold text-white">
                      {locale === "DE" ? "PStTG-Export simulieren" : "Simulate PStTG export"}
                    </button>
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

            {appTab === "gardeners" && (
              <section className="grid gap-6 p-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-6">
                  <article className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-forest-900">
                          {locale === "DE" ? "Gartenarbeiter in deiner Nähe" : "Gardeners near you"}
                        </h3>
                        <p className="mt-1 text-sm text-forest-600">{t.filterHint}</p>
                      </div>
                      <span className="rounded-full bg-forest-50 px-3 py-2 text-xs font-semibold text-forest-700">
                        {filteredProviders.length}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-4">
                      <label className="grid gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">
                          {t.search}
                        </span>
                        <input
                          value={search}
                          onChange={(event) => setSearch(event.target.value)}
                          className="min-h-12 rounded-2xl border border-forest-100 px-4 outline-none focus:border-forest-400"
                          placeholder={locale === "DE" ? "Name, Ort oder Skill" : "Name, location, or skill"}
                        />
                      </label>

                      <label className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">
                            {t.radius}
                          </span>
                          <strong className="text-sm text-forest-900">{distanceKm} km</strong>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={25}
                          step={1}
                          value={distanceKm}
                          onChange={(event) => setDistanceKm(Number(event.target.value))}
                          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-forest-100 accent-forest-700"
                        />
                      </label>
                    </div>
                  </article>

                  <article className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                    <h3 className="text-xl font-semibold text-forest-900">
                      {locale === "DE" ? "Geografische Vorschau" : "Geographic preview"}
                    </h3>
                    <div className="mt-4 rounded-[1.75rem] border border-forest-100 bg-[radial-gradient(circle_at_center,rgba(47,141,70,0.14),transparent_26%),linear-gradient(180deg,#f7faf8_0%,#edf6f0_100%)] p-5">
                      <div className="relative h-56 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/70">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(31,90,49,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(31,90,49,0.05)_1px,transparent_1px)] bg-[size:36px_36px]" />
                        {filteredProviders.slice(0, 3).map((provider, index) => (
                          <div
                            key={provider.id}
                            className={cn(
                              "absolute h-6 w-6 rounded-full border-2 border-white shadow-lg",
                              index === 0 ? "left-16 top-20 bg-emerald-500" : index === 1 ? "left-44 top-32 bg-forest-700" : "right-20 top-16 bg-soil-500"
                            )}
                            title={`${provider.name} • ${provider.distanceKm} km`}
                          />
                        ))}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="rounded-full border border-forest-200 bg-white/90 px-4 py-2 text-sm font-semibold text-forest-800">
                            {distanceKm} km
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="space-y-4">
                  {filteredProviders.map((provider) => (
                    <article key={provider.id} className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={provider.avatar}
                            alt={provider.name}
                            className="h-16 w-16 rounded-2xl object-cover"
                          />
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-lg font-semibold text-forest-900">{provider.name}</h4>
                              {provider.isNew && (
                                <span className="rounded-full bg-soil-100 px-3 py-1 text-xs font-semibold text-soil-800">
                                  {t.newBadge}
                                </span>
                              )}
                              <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">
                                {provider.role}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-forest-600">
                              {provider.location} • {provider.distanceKm.toFixed(1)} km
                            </p>
                            <p className="mt-2 text-sm leading-6 text-forest-700">{provider.about}</p>
                          </div>
                        </div>
                        <div className="rounded-2xl bg-forest-50 px-4 py-3 text-right">
                          <div className="text-xs uppercase tracking-[0.22em] text-forest-500">{t.rating}</div>
                          <div className="text-lg font-semibold text-forest-900">{provider.rating.toFixed(1)}</div>
                          <div className="text-xs text-forest-600">{provider.hourlyRate} EUR/h</div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {provider.skills.map((skill) => (
                          <span key={skill} className="rounded-full bg-forest-50 px-3 py-2 text-xs font-semibold text-forest-700">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-forest-100 bg-white px-4 py-3">
                        <span className="text-sm text-forest-600">
                          {provider.workingToday ? t.workingNow : t.notWorkingToday}
                        </span>
                        <strong className="text-sm text-forest-900">{provider.trustScore}% {t.trust}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {appTab === "profile" && (
              <section className="grid gap-6 p-5 lg:grid-cols-[0.95fr_1.05fr]">
                <article className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                  <h3 className="text-xl font-semibold text-forest-900">{t.profileCard}</h3>
                  <p className="mt-1 text-sm text-forest-600">{t.profileHint}</p>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">Vorname</span>
                      <input defaultValue={currentUser.firstName} className="min-h-12 rounded-2xl border border-forest-100 px-4" />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">Nachname</span>
                      <input defaultValue={currentUser.lastName} className="min-h-12 rounded-2xl border border-forest-100 px-4" />
                    </label>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">E-Mail</span>
                      <input defaultValue={currentUser.email} className="min-h-12 rounded-2xl border border-forest-100 px-4" />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">Steuer-ID</span>
                      <input placeholder="12345678901" className="min-h-12 rounded-2xl border border-forest-100 px-4" />
                    </label>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-forest-100 bg-forest-50 px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold text-forest-900">
                        {locale === "DE" ? "Arbeitsmodus" : "Working mode"}
                      </div>
                      <div className="text-xs text-forest-600">
                        {locale === "DE" ? "Sichtbar im Kalender" : "Visible in calendar"}
                      </div>
                    </div>
                    <button className="min-h-11 rounded-full bg-forest-700 px-4 text-sm font-semibold text-white">
                      {t.workingToday}
                    </button>
                  </div>
                </article>

                <article className="rounded-[1.75rem] border border-forest-100 bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-forest-900">{t.weekPlan}</h3>
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
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">Validierung</div>
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

            <footer className="border-t border-forest-100 px-5 py-4 text-sm text-forest-500">
              {locale === "DE"
                ? "Dashboard und Website sind bewusst getrennt. Das ist die App nach dem Login."
                : "The website and app are intentionally separate. This is the post-login app."}
            </footer>
          </div>
        </main>
      )}
    </div>
  );
}
