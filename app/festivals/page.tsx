"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FestivalCard } from "@/components/festival-card"
import { festivals } from "@/lib/festivals-data"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const allGenres = [...new Set(festivals.flatMap((f) => f.musicTypes))].sort()

export default function FestivalsPage() {
  const [search, setSearch] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [showCamping, setShowCamping] = useState<boolean | null>(null)
  const [showFamily, setShowFamily] = useState<boolean | null>(null)
  const [sortBy, setSortBy] = useState<"date" | "price" | "name">("date")

  const filteredFestivals = useMemo(() => {
    const result = festivals.filter((festival) => {
      const matchesSearch =
        festival.name.toLowerCase().includes(search.toLowerCase()) ||
        festival.location.toLowerCase().includes(search.toLowerCase())

      const matchesGenre = selectedGenres.length === 0 || selectedGenres.some((g) => festival.musicTypes.includes(g))

      const matchesCamping = showCamping === null || festival.camping === showCamping
      const matchesFamily = showFamily === null || festival.familyFriendly === showFamily

      return matchesSearch && matchesGenre && matchesCamping && matchesFamily
    })

    if (sortBy === "price") {
      result.sort((a, b) => a.priceValue - b.priceValue)
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [search, selectedGenres, showCamping, showFamily, sortBy])

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All UK Festivals 2026</h1>
          <p className="text-muted-foreground text-lg mb-8">Browse {festivals.length} festivals across the UK</p>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search festivals or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {(selectedGenres.length > 0 || showCamping !== null || showFamily !== null) && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedGenres.length + (showCamping !== null ? 1 : 0) + (showFamily !== null ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Features</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={showCamping === true}
                  onCheckedChange={() => setShowCamping(showCamping === true ? null : true)}
                >
                  Camping Available
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showFamily === true}
                  onCheckedChange={() => setShowFamily(showFamily === true ? null : true)}
                >
                  Family Friendly
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuCheckboxItem checked={sortBy === "date"} onCheckedChange={() => setSortBy("date")}>
                  Date
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={sortBy === "price"} onCheckedChange={() => setSortBy("price")}>
                  Price (Low to High)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={sortBy === "name"} onCheckedChange={() => setSortBy("name")}>
                  Name (A-Z)
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {allGenres.map((genre) => (
              <Badge
                key={genre}
                variant={selectedGenres.includes(genre) ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>

          {filteredFestivals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No festivals match your filters</p>
              <Button
                variant="ghost"
                className="mt-4"
                onClick={() => {
                  setSearch("")
                  setSelectedGenres([])
                  setShowCamping(null)
                  setShowFamily(null)
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFestivals.map((festival) => (
                <FestivalCard key={festival.id} festival={festival} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
