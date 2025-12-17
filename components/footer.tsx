import Link from "next/link"
import { Music } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold">UK Festivals 2026</span>
            </Link>
            <p className="text-sm text-muted-foreground">Your ultimate guide to UK music festivals in 2026.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/festivals" className="hover:text-foreground transition-colors">
                  All Festivals
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-foreground transition-colors">
                  Find Your Festival
                </Link>
              </li>
              <li>
                <Link href="/packing" className="hover:text-foreground transition-colors">
                  Packing Lists
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Plan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/travel" className="hover:text-foreground transition-colors">
                  Travel & Accommodation
                </Link>
              </li>
              <li>
                <Link href="/weather" className="hover:text-foreground transition-colors">
                  Weather Guide
                </Link>
              </li>
              <li>
                <Link href="/advice" className="hover:text-foreground transition-colors">
                  Tips & Advice
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://glastonburyfestivals.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Glastonbury
                </a>
              </li>
              <li>
                <a
                  href="https://www.readingfestival.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Reading & Leeds
                </a>
              </li>
              <li>
                <a
                  href="https://www.creamfields.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Creamfields
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>Made with love for festival fans. Not affiliated with any festival.</p>
          <p className="mt-2">Prices and dates shown are indicative and subject to change.</p>
        </div>
      </div>
    </footer>
  )
}
