import type React from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { festivalAdvice } from "@/lib/festivals-data"
import {
  Lightbulb,
  Shield,
  PiggyBank,
  Star,
  ArrowRight,
  Users,
  Heart,
  Smartphone,
  Clock,
  MapPin,
  Check,
} from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  "First Timers": <Star className="w-6 h-6" />,
  "Staying Safe": <Shield className="w-6 h-6" />,
  "Money Saving": <PiggyBank className="w-6 h-6" />,
  "Pro Tips": <Lightbulb className="w-6 h-6" />,
}

export default function AdvicePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Festival Tips & Advice</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Wisdom from seasoned festival veterans to make your 2026 experience unforgettable
            </p>
          </div>

          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-6">
              {festivalAdvice.map((section) => (
                <Card key={section.category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        {categoryIcons[section.category]}
                      </span>
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Festival Survival Guide</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-accent mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Buddy System</h3>
                  <p className="text-muted-foreground text-sm">
                    Always go with a mate to the toilet, bars, and especially leaving at night. Look out for each other
                    and set regular check-in times.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-chart-3/20 flex items-center justify-center text-chart-3 mb-4">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Pace Yourself</h3>
                  <p className="text-muted-foreground text-sm">
                    It is a marathon, not a sprint. Get enough sleep, eat proper meals, and do not go too hard on day
                    one or you will regret it by Sunday.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-chart-5/20 flex items-center justify-center text-chart-5 mb-4">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Save Battery</h3>
                  <p className="text-muted-foreground text-sm">
                    Enable battery saver, reduce brightness, download offline maps. Charging points exist but queues are
                    long. A portable charger is essential.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Arrive Early</h3>
                  <p className="text-muted-foreground text-sm">
                    Get there when gates open. You will get a better camping spot, shorter queues, and a chance to
                    explore the site before the crowds arrive.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-accent mb-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Learn the Site</h3>
                  <p className="text-muted-foreground text-sm">
                    Study the map before you go. Know where stages, toilets, water points, medical tents, and meeting
                    points are. You will thank yourself later.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-chart-3/20 flex items-center justify-center text-chart-3 mb-4">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Stay Hydrated</h3>
                  <p className="text-muted-foreground text-sm">
                    This cannot be stressed enough. Water is free at festivals - use it! Dehydration is the number one
                    reason people end up at the medical tent.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <Card className="bg-secondary/30">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Common Festival Mistakes to Avoid</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-destructive mb-3">Do Not...</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold">×</span>
                        Wear brand new boots - break them in first
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold">×</span>
                        Skip the sunscreen because it is cloudy
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold">×</span>
                        Camp next to the toilets (smell!) or paths (noise all night)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold">×</span>
                        Bring all your valuables - leave expensive jewellery at home
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold">×</span>
                        Rely entirely on your phone for navigation
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-accent mb-3">Instead...</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">✓</span>
                        Wear broken-in wellies or boots you trust
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">✓</span>
                        Apply SPF 30+ every few hours, even overcast
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">✓</span>
                        Camp a bit further out for quieter sleep
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">✓</span>
                        Bring only what you need - use a locker if available
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">✓</span>
                        Screenshot key info and download offline maps
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="text-center bg-card border border-border rounded-xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Plan Your Festival?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Now you know the tips and tricks, it is time to find your perfect festival and get your packing sorted!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/quiz">
                    Find Your Festival
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent">
                  <Link href="/packing">View Packing List</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
