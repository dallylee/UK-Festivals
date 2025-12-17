import Link from "next/link"
import { HelpCircle, Backpack, MapPin, Lightbulb } from "lucide-react"

const links = [
  {
    href: "/quiz",
    icon: HelpCircle,
    title: "Find Your Festival",
    description: "Take our quiz to discover which festival matches your vibe",
    color: "bg-primary/20 text-primary",
  },
  {
    href: "/packing",
    icon: Backpack,
    title: "Packing Lists",
    description: "Never forget your wellies again with our comprehensive lists",
    color: "bg-accent/20 text-accent",
  },
  {
    href: "/travel",
    icon: MapPin,
    title: "Travel & Accommodation",
    description: "Everything you need to know about getting there and staying",
    color: "bg-chart-3/20 text-chart-3",
  },
  {
    href: "/advice",
    icon: Lightbulb,
    title: "Tips & Advice",
    description: "Pro tips from seasoned festival veterans",
    color: "bg-chart-5/20 text-chart-5",
  },
]

export function QuickLinks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Plan Your Festival</h2>
        <p className="text-muted-foreground text-center mb-12">
          Everything you need for the perfect festival experience
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 hover:shadow-primary/5 active:scale-95 duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{link.title}</h3>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
