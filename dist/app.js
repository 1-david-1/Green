const copy = {
  DE: {
    login: "Anmelden",
    register: "Registrieren",
    logout: "Abmelden",
    home: "Home",
    dashboard: "Dashboard",
    gardeners: "Gartenarbeiter",
    profile: "Profil",
    marketplace: "Marktplatz",
    welcome: "Vertrauen, Rechtssicherheit und klare Verbindungen für Gartenarbeit in Deutschland.",
    startLogin: "Mit Login starten",
    startSignup: "Konto erstellen",
    openApp: "In die App",
    roleCustomer: "Arbeitgeber",
    roleProvider: "Gartenarbeiter",
    summary: "Übersicht",
    myCrew: "My Garden Crew",
    invoices: "Rechnungen",
    escrow: "Treuhand",
    availability: "Verfügbarkeit",
    radius: "Radius",
    filterHint: "Filtere Gartenarbeiter nach Nähe, Status und Rolle.",
    profileHint: "Dein Profil, deine Steuerdaten und deine Verfügbarkeit.",
    workingToday: "Ich arbeite heute",
    notWorkingToday: "Ich arbeite heute nicht",
    rating: "Bewertung",
    trust: "Trust",
    newBadge: "Ich bin neu",
    workingNow: "Jetzt verfügbar",
    checkout: "Rechnungsansicht",
    weekPlan: "Wochenplanung",
    exportPsttg: "PStTG-Export simulieren",
    heroMetricLabel: "Heutige Matches",
    ctaPrimary: "Anmelden",
    ctaSecondary: "Registrieren",
    authTitleLogin: "Mit wenigen Klicks in die App.",
    authTitleSignup: "Ein Konto mit echter Rollenlogik.",
    authLead:
      "Die Registrierungsseite ist bewusst anders als die App. Nach dem Login wechseln wir in eine getrennte Produktoberfläche mit Dashboard, Gartenarbeiteransicht und Profil.",
    authPoint1: "Erst Überzeugung, dann Nutzung",
    authPoint2: "Jugendschutz und Steuer-Logik integriert",
    authPoint3: "Premium statt Misch-Dashboard",
    authSubmitLogin: "In die App",
    authSubmitSignup: "Konto erstellen",
    appCustomerTitle: "Arbeitgeber-Dashboard",
    appProviderTitle: "Gartenarbeiterbereich",
    dashboardTitle: "Treuhand-Zahlungsfluss",
    annualTitle: "Jahresübersicht",
    gardenersTitle: "Gartenarbeiter in deiner Nähe",
    gardenersPreview: "Geografische Vorschau",
    profileCard: "Mein Profil",
    profileTitle: "Wochenplanung",
    profileValidation: "Validierung",
    invoiceTitle: "Rechnungsansicht",
    topLabel: "Rechtssichere Garten-Vermittlung",
    landingCard1Title: "Rechtssicherheit",
    landingCard1Text:
      "JArbSchG, PStTG und Rechnungen sind als echte Produktlogik und nicht nur als Text im Footer angelegt.",
    landingCard2Title: "Premium UI",
    landingCard2Text:
      "Klarer Apple-/Stripe-Look mit kräftiger Typo, ruhigen Oberflächen und präzisen Interaktionen.",
    landingCard3Title: "Zwei Welten",
    landingCard3Text:
      "Die Website führt zur App, und die App hat eigene Bereiche für Dashboard, Gartenarbeiter und Profil."
  },
  EN: {
    login: "Log in",
    register: "Register",
    logout: "Log out",
    home: "Home",
    dashboard: "Dashboard",
    gardeners: "Gardeners",
    profile: "Profile",
    marketplace: "Marketplace",
    welcome: "Trust, compliance, and clear matches for garden work in Germany.",
    startLogin: "Start with login",
    startSignup: "Create account",
    openApp: "Open app",
    roleCustomer: "Customer",
    roleProvider: "Gardener",
    summary: "Overview",
    myCrew: "My Garden Crew",
    invoices: "Invoices",
    escrow: "Escrow",
    availability: "Availability",
    radius: "Radius",
    filterHint: "Filter gardeners by distance, availability, and role.",
    profileHint: "Your profile, tax details, and availability.",
    workingToday: "I work today",
    notWorkingToday: "I do not work today",
    rating: "Rating",
    trust: "Trust",
    newBadge: "I'm new",
    workingNow: "Available now",
    checkout: "Invoice view",
    weekPlan: "Weekly plan",
    exportPsttg: "Simulate PStTG export",
    heroMetricLabel: "Matches today",
    ctaPrimary: "Log in",
    ctaSecondary: "Register",
    authTitleLogin: "Jump straight into the app.",
    authTitleSignup: "Create an account with real role logic.",
    authLead:
      "The sign-in page is intentionally different from the app. After login, we switch into a separate product surface with dashboard, gardener view, and profile.",
    authPoint1: "Convince first, then convert",
    authPoint2: "Youth and tax logic built in",
    authPoint3: "Premium instead of mixed dashboards",
    authSubmitLogin: "Open app",
    authSubmitSignup: "Create account",
    appCustomerTitle: "Customer dashboard",
    appProviderTitle: "Gardener workspace",
    dashboardTitle: "Escrow payment flow",
    annualTitle: "Annual summary",
    gardenersTitle: "Gardeners near you",
    gardenersPreview: "Geographic preview",
    profileCard: "My profile",
    profileTitle: "Weekly plan",
    profileValidation: "Validation",
    invoiceTitle: "Invoice view",
    topLabel: "Compliant garden marketplace",
    landingCard1Title: "Compliance",
    landingCard1Text: "JArbSchG, PStTG and invoice logic are part of the product, not just marketing copy.",
    landingCard2Title: "Premium UI",
    landingCard2Text:
      "Apple/Stripe-inspired with strong typography, calm surfaces, and precise interactions.",
    landingCard3Title: "Two worlds",
    landingCard3Text:
      "The landing page leads into a distinct app shell with dashboard, gardeners, and profile sections."
  }
};

const providers = [
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

const featureCards = [
  { key: "landingCard1Title", textKey: "landingCard1Text" },
  { key: "landingCard2Title", textKey: "landingCard2Text" },
  { key: "landingCard3Title", textKey: "landingCard3Text" }
];

const state = {
  view: "landing",
  locale: "DE",
  authMode: "signup",
  authRole: "customer",
  appTab: "dashboard",
  distanceKm: 12,
  search: "",
  heroCount: 42,
  workingToday: true
};

const app = document.getElementById("app");
let mouseBound = false;

function t() {
  return copy[state.locale];
}

function setView(view) {
  state.view = view;
  render();
}

function openAuth(mode, role = "customer") {
  state.authMode = mode;
  state.authRole = role;
  setView("auth");
}

function completeAuth() {
  state.view = "app";
  state.appTab = state.authRole === "provider" ? "gardeners" : "dashboard";
  render();
}

function filteredProviders() {
  const term = state.search.trim().toLowerCase();

  return providers
    .filter((provider) => provider.distanceKm <= state.distanceKm)
    .filter((provider) => {
      if (!term) return true;
      return (
        provider.name.toLowerCase().includes(term) ||
        provider.location.toLowerCase().includes(term) ||
        provider.skills.some((skill) => skill.toLowerCase().includes(term))
      );
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

function evaluatePsttg(snapshot) {
  const thresholdReached = snapshot.transactions >= 30 || snapshot.revenueEuro >= 2000;
  const warning = snapshot.transactions >= 25 || snapshot.revenueEuro >= 1800;

  if (thresholdReached && !snapshot.taxIdVerified) {
    return {
      status: "requires_tax_id",
      message: "PStTG threshold reached and tax ID is missing.",
      nextAction: "Block payouts until the provider verifies a tax ID."
    };
  }

  if (thresholdReached) {
    return {
      status: "lock_payouts",
      message: "PStTG threshold reached.",
      nextAction: "Prepare year-end reporting and keep payout review active."
    };
  }

  if (warning) {
    return {
      status: "warning",
      message: "Provider is approaching the reporting threshold.",
      nextAction: "Prompt the provider to verify the tax ID early."
    };
  }

  return {
    status: "below_threshold",
    message: "Provider is below the reporting threshold.",
    nextAction: "Continue normal payouts."
  };
}

function validateYouthSlot() {
  const startHour = 14;
  const endHour = 16;
  const slotMinutes = (endHour - startHour) * 60;
  const violations = [];

  if (startHour < 8 || endHour > 18) violations.push("Youth work must stay between 08:00 and 18:00.");
  if (slotMinutes + 60 > 120) violations.push("Daily work time exceeds the 120 minute cap.");
  if (2 >= 5) violations.push("Weekly work limit of five days has been reached.");
  if (48 >= 100) violations.push("Monthly earnings cap of 100 EUR has been reached.");

  return {
    allowed: violations.length === 0,
    reason: violations[0] || "Slot is compliant.",
    violations
  };
}

function renderTopbar() {
  const showAppNav = state.view === "app";
  const showAuth = state.view === "auth";

  return `
    <header class="topbar">
      <div class="shell topbar-inner">
        <button class="brand" id="nav-home" type="button">
          <span class="brand-mark">G</span>
          <span class="brand-copy">
            <strong>GreenMatch</strong>
            <small>${t().topLabel}</small>
          </span>
        </button>

        <div class="topbar-actions">
          ${
            showAppNav
              ? `
            <div class="tab-strip">
              <button class="nav-tab ${state.appTab === "dashboard" ? "active" : ""}" id="tab-dashboard" type="button">${t().dashboard}</button>
              <button class="nav-tab ${state.appTab === "gardeners" ? "active" : ""}" id="tab-gardeners" type="button">${t().gardeners}</button>
              <button class="nav-tab ${state.appTab === "profile" ? "active" : ""}" id="tab-profile" type="button">${t().profile}</button>
            </div>
          `
              : `
            <button class="text-link" id="nav-auth" type="button">${showAuth ? t().home : t().login}</button>
            <button class="btn-primary" id="nav-register" type="button">${t().register}</button>
          `
          }

          <button class="btn-ghost" id="locale-toggle" type="button">${state.locale}</button>

          ${
            showAppNav
              ? `
            <div class="profile-chip">
              <span class="avatar-circle">${state.authRole === "provider" ? "P" : "A"}</span>
              <div class="profile-copy">
                <strong>Mara Becker</strong>
                <small>${state.authRole === "provider" ? t().roleProvider : t().roleCustomer}</small>
              </div>
              <button class="text-link danger" id="logout-button" type="button">${t().logout}</button>
            </div>
          `
              : ""
          }
        </div>
      </div>
    </header>
  `;
}

function renderLanding() {
  return `
    <main class="shell page-stack">
      <section class="hero-stage surface">
        <div class="hero-copy">
          <span class="eyebrow">${t().marketplace}</span>
          <h1>${state.locale === "DE" ? "Gartenarbeit, aber" : "Garden work, but"} <span>${state.locale === "DE" ? "wie Apple/Stripe." : "Apple/Stripe polished."}</span></h1>
          <p>${t().welcome}</p>
          <div class="hero-actions">
            <button class="btn-primary strong" id="hero-login" type="button">${t().startLogin}</button>
            <button class="btn-ghost strong" id="hero-register" type="button">${t().startSignup}</button>
          </div>
          <div class="hero-mini-grid">
            <div class="mini-card"><span>Trust</span><strong>92%</strong></div>
            <div class="mini-card"><span>Insurance</span><strong>Included</strong></div>
            <div class="mini-card"><span>${t().heroMetricLabel}</span><strong id="hero-count-text">${state.heroCount}</strong></div>
          </div>
        </div>
        <div class="hero-widget">
          <div class="hero-widget-top">
            <div>
              <span class="widget-label">${state.locale === "DE" ? "Startseite" : "Landing"}</span>
              <h2>${state.locale === "DE" ? "Vertrauen zuerst." : "Trust first."}</h2>
              <p>${state.locale === "DE"
                ? "Ein klarer Einstieg für Arbeitgeber und Gartenarbeiter, mit hochwertigem, ruhigem Design und einer echten App darunter."
                : "A calm, premium entry point for customers and gardeners, with a real app experience behind the sign-in flow."}</p>
            </div>
            <div class="hero-score">
              <span>${t().heroMetricLabel}</span>
              <strong id="hero-count-value">${state.heroCount}</strong>
            </div>
          </div>
          <div class="hero-widget-actions">
            <button class="btn-ghost square" id="hero-count-dec" type="button">-</button>
            <button class="btn-primary square" id="hero-count-inc" type="button">+</button>
          </div>
          <div class="hero-badges">
            <div class="badge-tile"><span>${t().summary}</span><strong>${state.locale === "DE" ? "Rechtssicher" : "Compliant"}</strong></div>
            <div class="badge-tile"><span>${t().escrow}</span><strong>${state.locale === "DE" ? "Treuhand" : "Escrow"}</strong></div>
            <div class="badge-tile"><span>${t().availability}</span><strong>${state.locale === "DE" ? "Kalender" : "Calendar"}</strong></div>
          </div>
        </div>
      </section>

      <section class="feature-grid">
        ${featureCards
          .map(
            (card) => `
            <article class="surface feature-card">
              <h3>${t()[card.key]}</h3>
              <p>${t()[card.textKey]}</p>
            </article>
          `
          )
          .join("")}
      </section>
    </main>
  `;
}

function renderAuth() {
  const authTitle = state.authMode === "login" ? t().authTitleLogin : t().authTitleSignup;
  const authButton = state.authMode === "login" ? t().authSubmitLogin : t().authSubmitSignup;

  return `
    <main class="shell auth-shell">
      <section class="surface auth-grid">
        <div class="auth-copy">
          <span class="eyebrow">${state.locale === "DE" ? "Anmeldung" : "Authentication"}</span>
          <h1>${authTitle}</h1>
          <p>${t().authLead}</p>
          <div class="auth-points">
            <div class="point">${t().authPoint1}</div>
            <div class="point">${t().authPoint2}</div>
            <div class="point">${t().authPoint3}</div>
          </div>
        </div>

        <div class="auth-card">
          <div class="segmented">
            <button class="segment ${state.authMode === "signup" ? "active" : ""}" id="auth-signup-toggle" type="button">${t().register}</button>
            <button class="segment ${state.authMode === "login" ? "active" : ""}" id="auth-login-toggle" type="button">${t().login}</button>
          </div>

          <div class="field-grid">
            <label class="field">
              <span>E-Mail</span>
              <input class="input" placeholder="name@example.com" />
            </label>
            <label class="field">
              <span>${state.locale === "DE" ? "Passwort" : "Password"}</span>
              <input class="input" type="password" placeholder="••••••••" />
            </label>
          </div>

          <div class="role-grid">
            <button class="role-button ${state.authRole === "customer" ? "active" : ""}" id="auth-role-customer" type="button">${t().roleCustomer}</button>
            <button class="role-button ${state.authRole === "provider" ? "active" : ""}" id="auth-role-provider" type="button">${t().roleProvider}</button>
          </div>

          <button class="btn-primary full" id="auth-submit" type="button">${authButton}</button>
          <button class="btn-ghost full" id="auth-back" type="button">${t().home}</button>
        </div>
      </section>
    </main>
  `;
}

function renderDashboardTab() {
  const psttg = evaluatePsttg({ transactions: 22, revenueEuro: 1640, taxIdVerified: false });

  return `
    <section class="app-grid">
      <div class="stack">
        <div class="summary-grid">
          <article class="surface stat-card"><span>${t().summary}</span><strong>12</strong><small>${state.locale === "DE" ? "Aktive Aufträge" : "Active jobs"}</small></article>
          <article class="surface stat-card"><span>${t().escrow}</span><strong>EUR 1,820</strong><small>${state.locale === "DE" ? "Gesichert" : "Secured"}</small></article>
          <article class="surface stat-card"><span>${t().trust}</span><strong>98%</strong><small>${state.locale === "DE" ? "Premium Score" : "Premium score"}</small></article>
        </div>

        <article class="surface panel">
          <div class="panel-head">
            <div>
              <h3>${t().dashboard}</h3>
              <p>${state.locale === "DE" ? "Payment pending -> escrow locked -> payout in progress -> paid / dispute." : "Payment pending -> escrow locked -> payout in progress -> paid / dispute."}</p>
            </div>
            <span class="status-pill">${psttg.status}</span>
          </div>
          <div class="flow-grid">
            ${["Zahlung offen", "Treuhand gesperrt", "In Auszahlung", "Ausgezahlt"]
              .map(
                (step, index) => `
                <div class="flow-step ${index < 2 ? "active" : ""}">
                  ${step}
                </div>
              `
              )
              .join("")}
          </div>
          <div class="notice-box">
            <strong>${psttg.message}</strong>
            <p>${psttg.nextAction}</p>
          </div>
        </article>
      </div>

      <aside class="stack">
        <article class="surface panel">
          <div class="panel-head">
            <div>
              <h3>${t().annualTitle}</h3>
              <p>${state.locale === "DE" ? "Jahresdaten für Admins und Helfer aggregiert." : "Annual data aggregated for admins and providers."}</p>
            </div>
            <button class="btn-ghost small" type="button">${t().exportPsttg}</button>
          </div>
          <div class="info-list">
            <div class="info-row"><span>${state.locale === "DE" ? "Transaktionen" : "Transactions"}</span><strong>22</strong></div>
            <div class="info-row"><span>${state.locale === "DE" ? "Umsatz" : "Revenue"}</span><strong>EUR 1,640</strong></div>
            <div class="info-row"><span>${t().invoices}</span><strong>14</strong></div>
          </div>
        </article>

        <article class="surface panel">
          <h3>${t().invoiceTitle}</h3>
          <div class="invoice-list">
            ${invoiceItems
              .map(
                (item) => `
                <div class="info-row">
                  <span>${item.label}</span>
                  <strong>${item.value}</strong>
                </div>
              `
              )
              .join("")}
          </div>
        </article>
      </aside>
    </section>
  `;
}

function renderGardenersTab() {
  const list = filteredProviders();

  return `
    <section class="app-grid gardeners-grid">
      <div class="stack">
        <article class="surface panel">
          <div class="panel-head">
            <div>
              <h3>${t().gardenersTitle}</h3>
              <p>${t().filterHint}</p>
            </div>
            <span class="status-pill">${list.length}</span>
          </div>
          <label class="field">
            <span>${t().search}</span>
            <input class="input" id="search-input" value="${state.search}" placeholder="${state.locale === "DE" ? "Name, Ort oder Skill" : "Name, location, or skill"}" />
          </label>
          <label class="field">
            <div class="range-head">
              <span>${t().radius}</span>
              <strong>${state.distanceKm} km</strong>
            </div>
            <input class="range" id="distance-input" type="range" min="5" max="25" step="1" value="${state.distanceKm}" />
          </label>
        </article>

        <article class="surface panel">
          <h3>${t().gardenersPreview}</h3>
          <div class="map-box">
            ${list.slice(0, 3)
              .map(
                (provider, index) => `
                  <span class="map-dot dot-${index + 1}" title="${provider.name} • ${provider.distanceKm} km"></span>
                `
              )
              .join("")}
            <div class="radius-chip">${state.distanceKm} km</div>
          </div>
        </article>
      </div>

      <div class="stack">
        ${list
          .map(
            (provider) => `
            <article class="surface provider-card">
              <div class="provider-top">
                <img src="${provider.avatar}" alt="${provider.name}" />
                <div class="provider-copy">
                  <div class="provider-title-row">
                    <h4>${provider.name}</h4>
                    ${provider.isNew ? `<span class="badge">${t().newBadge}</span>` : ""}
                    <span class="role-badge">${provider.role}</span>
                  </div>
                  <p class="provider-location">${provider.location} • ${provider.distanceKm.toFixed(1)} km</p>
                  <p class="provider-about">${provider.about}</p>
                </div>
              </div>
              <div class="tag-row">
                ${provider.skills.map((skill) => `<span class="tag">${skill}</span>`).join("")}
              </div>
              <div class="provider-footer">
                <span>${provider.workingToday ? t().workingNow : t().notWorkingToday}</span>
                <strong>${provider.trustScore}% ${t().trust}</strong>
              </div>
            </article>
          `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderProfileTab() {
  const slotCheck = validateYouthSlot();

  return `
    <section class="app-grid profile-grid">
      <article class="surface panel">
        <h3>${t().profileCard}</h3>
        <p>${t().profileHint}</p>

        <div class="field-grid two">
          <label class="field"><span>${state.locale === "DE" ? "Vorname" : "First name"}</span><input class="input" value="Mara" /></label>
          <label class="field"><span>${state.locale === "DE" ? "Nachname" : "Last name"}</span><input class="input" value="Becker" /></label>
          <label class="field"><span>E-Mail</span><input class="input" value="mara@example.com" /></label>
          <label class="field"><span>${state.locale === "DE" ? "Steuer-ID" : "Tax ID"}</span><input class="input" placeholder="12345678901" /></label>
        </div>

        <div class="availability-row">
          <div>
            <strong>${t().availability}</strong>
            <small>${state.locale === "DE" ? "Sichtbar im Kalender" : "Visible in calendar"}</small>
          </div>
          <button class="btn-primary" id="working-toggle" type="button">${state.workingToday ? t().workingToday : t().notWorkingToday}</button>
        </div>
      </article>

      <article class="surface panel">
        <div class="panel-head">
          <div>
            <h3>${t().weekPlan}</h3>
            <p>${state.locale === "DE" ? "Wochenübersicht mit JArbSchG-Validierung" : "Weekly schedule with JArbSchG validation"}</p>
          </div>
          <span class="status-pill ${slotCheck.allowed ? "ok" : "bad"}">${slotCheck.allowed ? "OK" : "Blockiert"}</span>
        </div>

        <div class="week-grid">
          ${weeklySlots
            .map(
              (slot) => `
                <div class="week-row">
                  <strong>${slot.day}</strong>
                  <span>${slot.time}</span>
                </div>
              `
            )
            .join("")}
        </div>

        <div class="notice-box">
          <strong>${t().profileValidation}</strong>
          <p>${slotCheck.allowed ? (state.locale === "DE" ? "Slot ist JArbSchG-konform." : "Slot is JArbSchG compliant.") : slotCheck.reason}</p>
        </div>
      </article>
    </section>
  `;
}

function renderAppShell() {
  const appTitle = state.authRole === "provider" ? t().appProviderTitle : t().appCustomerTitle;
  const activeTab = state.appTab;
  const titleCopy = activeTab === "dashboard" ? appTitle : activeTab === "gardeners" ? t().gardenersTitle : t().profileCard;

  const tabContent =
    activeTab === "dashboard"
      ? renderDashboardTab()
      : activeTab === "gardeners"
        ? renderGardenersTab()
        : renderProfileTab();

  return `
    <main class="shell app-shell">
      <section class="surface app-banner">
        <div>
          <span class="eyebrow">${t().appTitle}</span>
          <h1>${titleCopy}</h1>
          <p>${state.authRole === "provider" ? "Gartenarbeiterbereich" : "Arbeitgeber-Dashboard"}</p>
        </div>
        <div class="banner-card">
          <span>${t().escrow}</span>
          <strong>${state.locale === "DE" ? "Automatisiert" : "Automated"}</strong>
        </div>
      </section>
      ${tabContent}
      <footer class="footer-note">
        ${state.locale === "DE"
          ? "Dashboard und Website sind bewusst getrennt. Das ist die App nach dem Login."
          : "The website and app are intentionally separate. This is the post-login app."}
      </footer>
    </main>
  `;
}

function render() {
  document.documentElement.lang = state.locale === "DE" ? "de" : "en";
  app.innerHTML = `
    ${renderTopbar()}
    ${
      state.view === "landing"
        ? renderLanding()
        : state.view === "auth"
          ? renderAuth()
          : renderAppShell()
    }
  `;
  bindEvents();
}

function bindEvents() {
  const on = (id, event, handler) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, handler);
  };

  on("nav-home", "click", () => setView("landing"));
  on("nav-auth", "click", () => openAuth("login", "customer"));
  on("nav-register", "click", () => openAuth("signup", "customer"));
  on("locale-toggle", "click", () => {
    state.locale = state.locale === "DE" ? "EN" : "DE";
    render();
  });

  on("hero-login", "click", () => openAuth("login", "customer"));
  on("hero-register", "click", () => openAuth("signup", "customer"));
  on("hero-count-dec", "click", () => {
    state.heroCount = Math.max(0, state.heroCount - 1);
    render();
  });
  on("hero-count-inc", "click", () => {
    state.heroCount += 1;
    render();
  });

  on("auth-login-toggle", "click", () => {
    state.authMode = "login";
    render();
  });
  on("auth-signup-toggle", "click", () => {
    state.authMode = "signup";
    render();
  });
  on("auth-role-customer", "click", () => {
    state.authRole = "customer";
    render();
  });
  on("auth-role-provider", "click", () => {
    state.authRole = "provider";
    render();
  });
  on("auth-submit", "click", completeAuth);
  on("auth-back", "click", () => setView("landing"));

  on("tab-dashboard", "click", () => {
    state.appTab = "dashboard";
    render();
  });
  on("tab-gardeners", "click", () => {
    state.appTab = "gardeners";
    render();
  });
  on("tab-profile", "click", () => {
    state.appTab = "profile";
    render();
  });
  on("logout-button", "click", () => setView("landing"));

  on("search-input", "input", (event) => {
    state.search = event.target.value;
    render();
  });
  on("distance-input", "input", (event) => {
    state.distanceKm = Number(event.target.value);
    render();
  });
  on("working-toggle", "click", () => {
    state.workingToday = !state.workingToday;
    render();
  });

  if (!mouseBound) {
    mouseBound = true;
    window.addEventListener("mousemove", (event) => {
      const stage = document.querySelector(".hero-stage");
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      stage.style.setProperty("--mouse-x", `${x}px`);
      stage.style.setProperty("--mouse-y", `${y}px`);
    });
  }
}

render();
