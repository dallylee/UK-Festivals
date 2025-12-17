import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Your 2026 Festival Season Starts Here
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight text-balance">
          UK FESTIVALS
          <span className="block text-primary">2026</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
          Discover every major UK festival. Compare tickets, explore lineups, find your perfect match with our quiz, and
          get ready for the summer of your life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/festivals">
              Explore All Festivals
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            <Link href="/quiz">Find Your Festival</Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">16+</div>
            <div className="text-sm text-muted-foreground">Major Festivals</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">500k+</div>
            <div className="text-sm text-muted-foreground">Festival-Goers</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">1000+</div>
            <div className="text-sm text-muted-foreground">Artists</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">Summer</div>
            <div className="text-sm text-muted-foreground">Of 2026</div>
          </div>
        </div>
      </div>
    </section>
  )
}
