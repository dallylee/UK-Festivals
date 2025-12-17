"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { packingCategories } from "@/lib/festivals-data"
import {
  Tent,
  Shirt,
  Sparkles,
  Flashlight,
  Utensils,
  PartyPopper,
  Download,
  RotateCcw,
  CheckCircle2,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  tent: <Tent className="w-5 h-5" />,
  shirt: <Shirt className="w-5 h-5" />,
  sparkles: <Sparkles className="w-5 h-5" />,
  flashlight: <Flashlight className="w-5 h-5" />,
  utensils: <Utensils className="w-5 h-5" />,
  "party-popper": <PartyPopper className="w-5 h-5" />,
}

export default function PackingPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleItem = (categoryName: string, itemName: string) => {
    const key = `${categoryName}-${itemName}`
    const newChecked = new Set(checkedItems)
    if (newChecked.has(key)) {
      newChecked.delete(key)
    } else {
      newChecked.add(key)
    }
    setCheckedItems(newChecked)
  }

  const totalItems = packingCategories.reduce((acc, cat) => acc + cat.items.length, 0)
  const progress = (checkedItems.size / totalItems) * 100

  const essentialItems = packingCategories.flatMap((cat) =>
    cat.items.filter((item) => item.essential).map((item) => ({ ...item, category: cat.name })),
  )
  const uncheckedEssentials = essentialItems.filter((item) => !checkedItems.has(`${item.category}-${item.name}`))

  const resetAll = () => setCheckedItems(new Set())

  const downloadList = () => {
    let text = "UK FESTIVALS 2026 - PACKING LIST\n"
    text += "================================\n\n"

    packingCategories.forEach((cat) => {
      text += `${cat.name.toUpperCase()}\n`
      text += "-".repeat(cat.name.length) + "\n"
      cat.items.forEach((item) => {
        const checked = checkedItems.has(`${cat.name}-${item.name}`) ? "[x]" : "[ ]"
        const essential = item.essential ? " *ESSENTIAL*" : ""
        text += `${checked} ${item.name}${essential}\n`
      })
      text += "\n"
    })

    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "festival-packing-list.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Festival Packing List</h1>
              <p className="text-muted-foreground text-lg">
                Never forget your wellies again. Check off items as you pack!
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Packing Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {checkedItems.size} / {totalItems} items
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={resetAll} className="gap-2 bg-transparent">
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                    <Button size="sm" onClick={downloadList} className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>

                {uncheckedEssentials.length > 0 && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mt-4">
                    <div className="font-medium text-destructive mb-2">
                      {uncheckedEssentials.length} essential items still to pack:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {uncheckedEssentials.slice(0, 5).map((item) => (
                        <Badge key={`${item.category}-${item.name}`} variant="outline" className="text-destructive">
                          {item.name}
                        </Badge>
                      ))}
                      {uncheckedEssentials.length > 5 && (
                        <Badge variant="outline" className="text-destructive">
                          +{uncheckedEssentials.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {checkedItems.size === totalItems && (
                  <div className="bg-accent/20 border border-accent/30 rounded-lg p-4 mt-4 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                    <span className="font-medium text-accent">All packed and ready to go!</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {packingCategories.map((category) => {
                const categoryChecked = category.items.filter((item) =>
                  checkedItems.has(`${category.name}-${item.name}`),
                ).length
                const categoryProgress = (categoryChecked / category.items.length) * 100

                return (
                  <Card key={category.name}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                            {iconMap[category.icon]}
                          </span>
                          {category.name}
                        </span>
                        <span className="text-sm font-normal text-muted-foreground">
                          {categoryChecked}/{category.items.length}
                        </span>
                      </CardTitle>
                      <Progress value={categoryProgress} className="h-1" />
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {category.items.map((item) => {
                          const key = `${category.name}-${item.name}`
                          const isChecked = checkedItems.has(key)

                          return (
                            <li key={item.name}>
                              <label
                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-secondary ${
                                  isChecked ? "opacity-60" : ""
                                }`}
                              >
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={() => toggleItem(category.name, item.name)}
                                />
                                <span className={`flex-1 ${isChecked ? "line-through" : ""}`}>{item.name}</span>
                                {item.essential && (
                                  <Badge variant="secondary" className="text-xs">
                                    Essential
                                  </Badge>
                                )}
                              </label>
                            </li>
                          )
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
