import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FestivalCard } from "@/components/festival-card"
import { festivals } from "@/lib/festivals-data"

export function FeaturedFestivals() {
  const featuredFestivals = festivals.filter((f) => f.featured)

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Festivals</h2>
            <p className="text-muted-foreground">The biggest events of 2026</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/festivals">
              View All Festivals
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredFestivals.map((festival, index) => (
            <FestivalCard key={festival.id} festival={festival} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
