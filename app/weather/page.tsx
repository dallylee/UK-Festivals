import type React from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { weatherAdvice, festivals } from "@/lib/festivals-data"
import { Sun, CloudRain, Wind, Thermometer, Calendar, MapPin, Check } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  sun: <Sun className="w-6 h-6" />,
  "cloud-rain": <CloudRain className="w-6 h-6" />,
  wind: <Wind className="w-6 h-6" />,
  thermometer: <Thermometer className="w-6 h-6" />,
}

export default function WeatherPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Festival Weather Guide</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              UK weather is unpredictable. Be prepared for everything!
            </p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Weather Preparation</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {weatherAdvice.map((weather) => (
                <Card key={weather.condition}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3">
                      <span className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        {iconMap[weather.icon]}
                      </span>
                      {weather.condition}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {weather.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Festival Weather Overview</h2>
            <p className="text-muted-foreground mb-6">Typical weather conditions based on historical data</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {festivals.slice(0, 12).map((festival) => (
                <Link key={festival.id} href={`/festivals/${festival.id}`} className="block group">
                  <Card className="h-full transition-all hover:border-primary/50">
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{festival.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        {festival.dates}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        {festival.location}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-primary" />
                          <span className="font-medium">{festival.weather.avgTemp}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            Number.parseInt(festival.weather.rainChance) > 40
                              ? "border-destructive text-destructive"
                              : "border-accent text-accent"
                          }
                        >
                          <CloudRain className="w-3 h-3 mr-1" />
                          {festival.weather.rainChance}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <Card className="bg-secondary/30">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4">The Golden Rule</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  No matter what the forecast says, always bring wellies and waterproofs. This is the UK - it can and
                  will rain at any festival. Even in a heatwave, pack a waterproof layer.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">65%</div>
                    <div className="text-sm text-muted-foreground">of UK festivals experience some rain</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">15-22°C</div>
                    <div className="text-sm text-muted-foreground">typical summer festival temp range</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">8-12°C</div>
                    <div className="text-sm text-muted-foreground">nighttime can drop significantly</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
