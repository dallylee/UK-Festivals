import type React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { travelTips, accommodationTypes } from "@/lib/festivals-data"
import { Car, Train, Bus, Check, X, AlertTriangle } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  car: <Car className="w-6 h-6" />,
  train: <Train className="w-6 h-6" />,
  bus: <Bus className="w-6 h-6" />,
}

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel & Accommodation</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about getting to your festival and where to stay
            </p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Getting There</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {travelTips.map((method) => (
                <Card key={method.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        {iconMap[method.icon]}
                      </span>
                      {method.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {method.tips.map((tip, index) => (
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Where to Stay</h2>
            <div className="grid gap-6">
              {accommodationTypes.map((accom) => (
                <Card key={accom.name}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      <div className="lg:w-1/3">
                        <div className="flex items-center justify-between lg:block">
                          <h3 className="text-xl font-bold">{accom.name}</h3>
                          <Badge className="bg-primary/20 text-primary border-none lg:mt-2">{accom.price}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-2">{accom.description}</p>
                      </div>

                      <div className="lg:w-1/3">
                        <div className="font-medium mb-2 text-accent">Pros</div>
                        <ul className="space-y-1">
                          {accom.pros.map((pro, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="w-4 h-4 text-accent" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="lg:w-1/3">
                        <div className="font-medium mb-2 text-destructive">Cons</div>
                        <ul className="space-y-1">
                          {accom.cons.map((con, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <X className="w-4 h-4 text-destructive" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <Card className="bg-secondary/30 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Booking Tips</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>
                        <strong className="text-foreground">Book early:</strong> Accommodation near festival sites sells
                        out months in advance, especially for Glastonbury
                      </li>
                      <li>
                        <strong className="text-foreground">Check cancellation policies:</strong> Festivals can be
                        affected by weather or other factors
                      </li>
                      <li>
                        <strong className="text-foreground">Consider location:</strong> Closer is not always better -
                        noise and traffic can be issues
                      </li>
                      <li>
                        <strong className="text-foreground">Group bookings:</strong> Many glamping options work out
                        cheaper when split between a group
                      </li>
                    </ul>
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
