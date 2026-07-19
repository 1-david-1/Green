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
