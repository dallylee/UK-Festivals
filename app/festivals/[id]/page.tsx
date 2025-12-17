import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { festivals } from "@/lib/festivals-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  MapPin,
  Users,
  Ticket,
  Music,
  Tent,
  Baby,
  CloudSun,
  Thermometer,
  ExternalLink,
  ArrowLeft,
} from "lucide-react"

export function generateStaticParams() {
  return festivals.map((festival) => ({ id: festival.id }))
}

export default async function FestivalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const festival = festivals.find((f) => f.id === id)

  if (!festival) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20">
        <div className="relative h-[40vh] md:h-[50vh]">
          <Image src={festival.image || "/placeholder.svg"} alt={festival.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Button asChild variant="ghost" size="sm" className="mb-4">
                <Link href="/festivals">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  All Festivals
                </Link>
              </Button>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{festival.name}</h1>
              <div className="flex flex-wrap gap-4 text-lg">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {festival.dates}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {festival.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{festival.description}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Music & Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {festival.musicTypes.map((type) => (
                    <Badge key={type} variant="outline" className="text-sm px-3 py-1">
                      <Music className="w-3 h-3 mr-1" />
                      {type}
                    </Badge>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Atmosphere</h2>
                <div className="flex flex-wrap gap-2">
                  {festival.atmosphere.map((vibe) => (
                    <Badge key={vibe} className="text-sm px-3 py-1 bg-primary/20 text-primary border-none">
                      {vibe}
                    </Badge>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className={festival.camping ? "border-primary/50" : ""}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <Tent className={`w-6 h-6 ${festival.camping ? "text-primary" : "text-muted-foreground"}`} />
                      <div>
                        <div className="font-medium">Camping</div>
                        <div className="text-sm text-muted-foreground">
                          {festival.camping ? "Available on-site" : "Not available"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className={festival.familyFriendly ? "border-primary/50" : ""}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <Baby
                        className={`w-6 h-6 ${festival.familyFriendly ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div>
                        <div className="font-medium">Family Friendly</div>
                        <div className="text-sm text-muted-foreground">
                          {festival.familyFriendly ? "Suitable for families" : "18+ recommended"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-primary" />
                    Tickets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Price from</div>
                    <div className="text-3xl font-bold text-primary">{festival.price}</div>
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <a href={festival.ticketLink} target="_blank" rel="noopener noreferrer">
                      Get Tickets
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Opens official ticket page</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Capacity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{festival.capacity}</div>
                  <div className="text-sm text-muted-foreground">attendees</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CloudSun className="w-5 h-5" />
                    Typical Weather
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Thermometer className="w-4 h-4" />
                      Average Temp
                    </span>
                    <span className="font-medium">{festival.weather.avgTemp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <CloudSun className="w-4 h-4" />
                      Rain Chance
                    </span>
                    <span className="font-medium">{festival.weather.rainChance}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <Link href="/packing">Packing List</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <Link href="/travel">Travel Tips</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
