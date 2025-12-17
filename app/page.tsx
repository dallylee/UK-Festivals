import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedFestivals } from "@/components/featured-festivals"
import { QuickLinks } from "@/components/quick-links"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturedFestivals />
      <QuickLinks />
      <Footer />
    </main>
  )
}
