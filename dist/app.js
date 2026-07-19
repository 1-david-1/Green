const copy = {
  DE: {
    platformPill: "Zweiseitige Plattform",
    headline: "GreenMatch",
    subheadline:
      "Vertrauensbasierter Marktplatz für Gartenarbeit in Deutschland. Mit eBay-artigem Bieten, privater Stammhelfer-Liste, Kalenderfreigaben und compliance-orientierter Provider-Steuerung.",
    biddingTitle: "Bieten & Verhandeln",
    biddingCopy: "Inserate, Gegenangebote, Chat und finaler Vertragsabschluss in einem Flow.",
    calendarTitle: "Kalender",
    calendarCopy: "Freie Zeitfenster werden als Buchungs-Slots dargestellt.",
    complianceTitle: "Compliance",
    verificationLabel: "Verifizierungs-Vorschau",
    verificationCopy:
      "Jugendliche werden automatisch auf leichte Tätigkeiten, Zeitfenster und Stundenlimits begrenzt.",
    workToday: "Ich arbeite heute",
    noWorkToday: "Ich arbeite heute nicht",
    submitBid: "Gebot abgeben",
    requestSlot: "Slot anfragen",
    finalBid: "Finales Gebot",
    taxIdVerified: "Steuer-ID verifiziert",
    selectedProvider: "Ausgewählter Anbieter",
    availability: "Verfügbarkeit",
    insurance: "Versicherung enthalten",
    crewTitle: "Stammhelfer-Netzwerk",
    heroMatches: "Heutige Matches",
    lang: "EN",
    providerNew: "Ich bin neu",
    providerPro: "Professioneller Betrieb",
    workStatus: "Ich arbeite heute",
    verificationCategory: "Youth",
    verificationIntro: "Youth",
    tx: "Tx",
    eur: "EUR",
    psttgStatus: "warning",
    psttgMessage: "Provider is approaching the reporting threshold.",
    psttgNext: "Prompt the provider to verify the tax ID early."
  },
  EN: {
    platformPill: "Two-sided platform",
    headline: "GreenMatch",
    subheadline:
      "A trust-first marketplace for garden work in Germany, with eBay-style bidding, private favorite crews, calendar availability, and compliance-oriented provider controls.",
    biddingTitle: "Bidding & negotiation",
    biddingCopy: "Listings, counter-offers, chat, and final contract closure in one flow.",
    calendarTitle: "Calendar",
    calendarCopy: "Available time windows are shown as booking slots.",
    complianceTitle: "Compliance",
    verificationLabel: "Verification preview",
    verificationCopy: "Youth providers are automatically limited to light tasks, time windows, and hour caps.",
    workToday: "I work today",
    noWorkToday: "I do not work today",
    submitBid: "Submit bid",
    requestSlot: "Request slot",
    finalBid: "Final bid",
    taxIdVerified: "Tax ID verified",
    selectedProvider: "Selected provider",
    availability: "Availability",
    insurance: "Insurance included",
    crewTitle: "Favorite crew network",
    heroMatches: "Matches today",
    lang: "DE",
    providerNew: "I'm new",
    providerPro: "Professional business",
    workStatus: "I work today",
    verificationCategory: "Youth",
    verificationIntro: "Youth",
    tx: "Tx",
    eur: "EUR",
    psttgStatus: "warning",
    psttgMessage: "Provider is approaching the reporting threshold.",
    psttgNext: "Prompt the provider to verify the tax ID early."
  }
};

const gigs = [
  {
    title: "Lawn mowing, 150 m2",
    location: "Munich, Schwabing",
    budget: "EUR 45 - 60",
    mode: "Neighbor helper",
    status: "Negotiating",
    summary: "Saturday afternoon, bring your own mower if possible."
  },
  {
    title: "Hedge trimming above 2m",
    location: "Cologne, Ehrenfeld",
    budget: "EUR 180 - 240",
    mode: "Professional",
    status: "Open",
    summary: "Needs a certified pro with insurance coverage."
  }
];

const calendarSlots = [
  { day: "Mon", hours: ["08:00", "10:00", "14:00", "16:00"] },
  { day: "Tue", hours: ["09:00", "11:00", "15:00", "17:00"] },
  { day: "Wed", hours: ["08:00", "12:00", "14:00", "18:00"] },
  { day: "Thu", hours: ["10:00", "13:00", "15:00", "17:00"] },
  { day: "Fri", hours: ["08:00", "09:00", "14:00", "16:00"] }
];

const providers = [
  {
    id: "prov-1",
    name: "Mila K.",
    badge: "I'm new",
    price: "EUR 18/h",
    rating: "5.0",
    availability: "Today, 14:00 - 18:00",
    tags: ["weeding", "watering", "leaf-raking"]
  },
  {
    id: "prov-2",
    name: "GreenCraft GmbH",
    badge: "Pro verified",
    price: "EUR 42/h",
    rating: "4.9",
    availability: "Mon - Fri, 08:00 - 17:00",
    tags: ["hedge-cutting", "tree-pruning", "paving"]
  }
];

let state = {
  locale: "DE",
  workingToday: true,
  selectedProvider: providers[0].id,
  tx: 22,
  eur: 1640,
  taxIdVerified: false,
  bidValue: 55,
  heroCount: 42
};

const el = (id) => document.getElementById(id);

function bindHeroLight() {
  const stage = document.querySelector(".hero-stage");
  if (!stage) return;

  window.addEventListener("mousemove", (event) => {
    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    stage.style.setProperty("--mouse-x", `${x}px`);
    stage.style.setProperty("--mouse-y", `${y}px`);
  });
}

function renderGigs() {
  el("gig-grid").innerHTML = gigs
    .map(
      (gig) => `
      <article class="gig">
        <div class="gig-top">
          <div>
            <div class="gig-title">${gig.title}</div>
            <div class="muted">${gig.location}</div>
          </div>
          <div class="chip">${gig.status}</div>
        </div>
        <p>${gig.summary}</p>
        <div class="chip-row">
          <span class="chip">${gig.budget}</span>
          <span class="chip">${gig.mode}</span>
        </div>
      </article>
    `
    )
    .join("");
}

function renderCalendar() {
  const workingClass = state.workingToday ? "slot" : "slot muted-slot";
  el("calendar-grid").innerHTML = calendarSlots
    .map(
      (day) => `
      <div class="day-card">
        <div class="day-name">${day.day}</div>
        <div class="slot-row">
          ${day.hours.map((hour) => `<span class="${workingClass}">${hour}</span>`).join("")}
        </div>
      </div>
    `
    )
    .join("");
}

function renderProviderList() {
  const locale = copy[state.locale];
  el("provider-list").innerHTML = providers
    .map((provider) => {
      const active = provider.id === state.selectedProvider;
      const badge = provider.badge === "I'm new" ? locale.providerNew : locale.providerPro;
      const tags = provider.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
      return `
        <button class="provider-item ${active ? "active" : ""}" data-provider="${provider.id}" type="button">
          <div class="gig-top">
            <div>
              <div class="gig-title">${provider.name}</div>
              <div class="muted">${provider.price}</div>
            </div>
            <div class="chip">${badge}</div>
          </div>
          <div class="chip-row" style="margin-top: 12px">${tags}</div>
        </button>
      `;
    })
    .join("");

  document.querySelectorAll("[data-provider]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedProvider = button.getAttribute("data-provider");
      renderAll();
    });
  });
}

function evaluatePsttg() {
  const hard = state.tx >= 30 || state.eur >= 2000;
  const warning = state.tx >= 25 || state.eur >= 1800;

  if (hard && !state.taxIdVerified) {
    return {
      status: "requires_tax_id",
      message: "PStTG threshold reached and tax ID is missing.",
      next: "Block payouts until the provider verifies a tax ID."
    };
  }

  if (hard) {
    return {
      status: "lock_payouts",
      message: "PStTG threshold reached.",
      next: "Prepare year-end reporting and keep payout review active."
    };
  }

  if (warning) {
    return {
      status: "warning",
      message: localeCopy().psttgMessage,
      next: localeCopy().psttgNext
    };
  }

  return {
    status: "below_threshold",
    message: "Provider is below the reporting threshold.",
    next: "Continue normal payouts."
  };
}

function localeCopy() {
  return copy[state.locale];
}

function renderAll() {
  const c = localeCopy();
  document.documentElement.lang = state.locale === "DE" ? "de" : "en";

  el("platform-pill").textContent = c.platformPill;
  el("headline").textContent = c.headline;
  el("subheadline").textContent = c.subheadline;
  el("hero-count-label").textContent = c.heroMatches;
  el("hero-count").textContent = state.heroCount;
  el("hero-count-value").textContent = state.heroCount;
  el("bidding-title").textContent = c.biddingTitle;
  el("bidding-copy").textContent = c.biddingCopy;
  el("calendar-title").textContent = c.calendarTitle;
  el("calendar-copy").textContent = c.calendarCopy;
  el("compliance-title").textContent = c.complianceTitle;
  el("verification-label").textContent = c.verificationLabel;
  el("verification-copy").textContent = c.verificationCopy;
  el("work-toggle").textContent = state.workingToday ? c.workToday : c.noWorkToday;
  el("work-status").textContent = state.workingToday ? c.workToday : c.noWorkToday;
  el("submit-bid").textContent = c.submitBid;
  el("slot-request").textContent = c.requestSlot;
  el("bid-label").textContent = c.finalBid;
  el("taxid-label").textContent = c.taxIdVerified;
  el("provider-label").textContent = c.selectedProvider;
  el("availability-label").textContent = c.availability;
  el("insurance-label").textContent = c.insurance;
  el("crew-title").textContent = c.crewTitle;
  el("lang-toggle").textContent = c.lang;
  el("verification-category").textContent = c.verificationCategory;
  el("psttg-status").textContent = evaluatePsttg().status;
  el("psttg-message").textContent = evaluatePsttg().message;
  el("psttg-next").textContent = evaluatePsttg().next;

  const provider = providers.find((p) => p.id === state.selectedProvider) || providers[0];
  el("provider-name").textContent = provider.name;
  el("provider-badge").textContent = provider.badge === "I'm new" ? c.providerNew : c.providerPro;
  el("provider-availability").textContent = provider.availability;
  el("tx-input").value = state.tx;
  el("eur-input").value = state.eur;
  el("taxid-input").checked = state.taxIdVerified;

  const restrictions = [
    "max 120 minutes/day",
    "work only between 08:00 and 18:00",
    "max 5 days/week",
    "monthly earnings cap of 100 EUR",
    "only light and safe tasks"
  ];
  el("restriction-list").innerHTML = restrictions
    .map((item) => `<div class="restriction">${item}</div>`)
    .join("");

  renderGigs();
  renderCalendar();
  renderProviderList();

  document.getElementById("work-toggle").classList.toggle("is-off", !state.workingToday);
}

function bindEvents() {
  el("lang-toggle").addEventListener("click", () => {
    state.locale = state.locale === "DE" ? "EN" : "DE";
    renderAll();
  });

  el("work-toggle").addEventListener("click", () => {
    state.workingToday = !state.workingToday;
    renderAll();
  });

  el("tx-input").addEventListener("input", (event) => {
    state.tx = Number(event.target.value);
    renderAll();
  });

  el("eur-input").addEventListener("input", (event) => {
    state.eur = Number(event.target.value);
    renderAll();
  });

  el("taxid-input").addEventListener("change", (event) => {
    state.taxIdVerified = event.target.checked;
    renderAll();
  });

  el("bid-input").addEventListener("input", (event) => {
    state.bidValue = Number(event.target.value);
  });

  el("submit-bid").addEventListener("click", () => {
    const value = Number(el("bid-input").value || state.bidValue);
    state.bidValue = value;
    el("submit-bid").textContent = `${copy[state.locale].submitBid}: EUR ${value}`;
    setTimeout(() => {
      el("submit-bid").textContent = copy[state.locale].submitBid;
    }, 1600);
  });

  el("slot-request").addEventListener("click", () => {
    el("slot-request").textContent = state.locale === "DE" ? "Anfrage gesendet" : "Request sent";
    setTimeout(() => {
      el("slot-request").textContent = copy[state.locale].requestSlot;
    }, 1600);
  });

  el("hero-count-dec").addEventListener("click", () => {
    state.heroCount = Math.max(0, state.heroCount - 1);
    renderAll();
  });

  el("hero-count-inc").addEventListener("click", () => {
    state.heroCount += 1;
    renderAll();
  });
}

bindEvents();
bindHeroLight();
renderAll();
