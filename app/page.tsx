import { Dashboard } from "@/components/dashboard";
import { CinematicLandingHero } from "@/components/ui/cinematic-landing-hero";

export default function Page() {
  return (
    <main className="space-y-10 pb-16">
      <CinematicLandingHero />
      <Dashboard />
    </main>
  );
}
