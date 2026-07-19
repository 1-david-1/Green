export type GigCard = {
  id: string;
  title: string;
  location: string;
  budget: string;
  mode: "Professional" | "Neighbor helper";
  status: "Open" | "Negotiating" | "Active";
  summary: string;
};

export type ProviderCard = {
  id: string;
  name: string;
  badge: "I'm new" | "Pro verified";
  price: string;
  rating: string;
  availability: string;
  tags: string[];
};

export type HelperProfile = {
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

export const gigs: GigCard[] = [
  {
    id: "gig-1",
    title: "Lawn mowing, 150 m2",
    location: "Munich, Schwabing",
    budget: "EUR 45 - 60",
    mode: "Neighbor helper",
    status: "Negotiating",
    summary: "Saturday afternoon, bring your own mower if possible."
  },
  {
    id: "gig-2",
    title: "Hedge trimming above 2m",
    location: "Cologne, Ehrenfeld",
    budget: "EUR 180 - 240",
    mode: "Professional",
    status: "Open",
    summary: "Needs a certified pro with insurance coverage."
  }
];

export const providers: ProviderCard[] = [
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

export const calendarSlots = [
  { day: "Mon", hours: ["08:00", "10:00", "14:00", "16:00"] },
  { day: "Tue", hours: ["09:00", "11:00", "15:00", "17:00"] },
  { day: "Wed", hours: ["08:00", "12:00", "14:00", "18:00"] },
  { day: "Thu", hours: ["10:00", "13:00", "15:00", "17:00"] },
  { day: "Fri", hours: ["08:00", "09:00", "14:00", "16:00"] }
];

export const helpers: HelperProfile[] = [
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
