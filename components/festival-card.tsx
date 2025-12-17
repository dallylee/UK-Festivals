"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, ExternalLink, Ticket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Festival } from "@/lib/festivals-data"
import { motion } from "framer-motion"

interface FestivalCardProps {
  festival: Festival
  featured?: boolean
  index?: number
}

export function FestivalCard({ festival, featured = false, index = 0 }: FestivalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-colors hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] hover:shadow-primary/20 ${featured ? "md:col-span-2 md:row-span-2" : ""
        }`}
    >
      <div className={`relative ${featured ? "h-64 md:h-96" : "h-56"} overflow-hidden`}>
        <Image
          src={festival.image || "/placeholder.svg"}
          alt={festival.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-90" />

        {festival.featured && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(var(--primary),0.5)] border-none">
            Featured Choice
          </Badge>
        )}

        <div className="absolute top-4 right-4 flex gap-2">
          {festival.camping && (
            <Badge variant="secondary" className="text-xs backdrop-blur-md bg-black/50 text-white border-white/20">
              Camping
            </Badge>
          )}
          {festival.familyFriendly && (
            <Badge variant="secondary" className="text-xs backdrop-blur-md bg-black/50 text-white border-white/20">
              Family
            </Badge>
          )}
        </div>
      </div>

      <div className="p-6 relative">
        <h3 className={`font-black tracking-tight text-foreground mb-3 leading-none ${featured ? "text-3xl" : "text-xl"} group-hover:text-primary transition-colors duration-300`}>
          {festival.name}
        </h3>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            {festival.dates}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            {festival.location}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {festival.musicTypes.slice(0, featured ? 6 : 3).map((type) => (
            <Badge key={type} variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
              {type}
            </Badge>
          ))}
          {festival.musicTypes.length > (featured ? 6 : 3) && (
            <Badge variant="outline" className="text-xs border-primary/20 text-muted-foreground">
              +{festival.musicTypes.length - (featured ? 6 : 3)}
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">{festival.description}</p>

        <div className="flex items-center justify-between gap-4 mt-auto pt-4 border-t border-border/50">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Tickets from</div>
            <div className="font-bold text-xl text-primary">{festival.price}</div>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
              <Link href={`/festivals/${festival.id}`}>Details</Link>
            </Button>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all rounded-full px-4">
              <a href={festival.ticketLink} target="_blank" rel="noopener noreferrer">
                <Ticket className="w-4 h-4 mr-2" />
                Book Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
