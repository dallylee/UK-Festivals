import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Festival } from "@/lib/festivals-data"

interface FestivalCardProps {
  festival: Festival
  featured?: boolean
}

export function FestivalCard({ festival, featured = false }: FestivalCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-card border border-border transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className={`relative ${featured ? "h-64 md:h-80" : "h-48"}`}>
        <Image
          src={festival.image || "/placeholder.svg"}
          alt={festival.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {festival.featured && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Featured</Badge>
        )}

        <div className="absolute top-4 right-4 flex gap-2">
          {festival.camping && (
            <Badge variant="secondary" className="text-xs">
              Camping
            </Badge>
          )}
          {festival.familyFriendly && (
            <Badge variant="secondary" className="text-xs">
              Family
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className={`font-bold text-foreground mb-2 ${featured ? "text-2xl" : "text-lg"}`}>{festival.name}</h3>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {festival.dates}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {festival.location}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {festival.musicTypes.slice(0, featured ? 6 : 3).map((type) => (
            <Badge key={type} variant="outline" className="text-xs border-primary/30 text-primary">
              {type}
            </Badge>
          ))}
          {festival.musicTypes.length > (featured ? 6 : 3) && (
            <Badge variant="outline" className="text-xs">
              +{festival.musicTypes.length - (featured ? 6 : 3)}
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{festival.description}</p>

        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-muted-foreground">From</div>
            <div className="font-bold text-primary">{festival.price}</div>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="secondary" size="sm">
              <Link href={`/festivals/${festival.id}`}>Details</Link>
            </Button>
            <Button asChild size="sm">
              <a href={festival.ticketLink} target="_blank" rel="noopener noreferrer">
                Tickets
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
