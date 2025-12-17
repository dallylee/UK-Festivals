"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { festivals, quizQuestions } from "@/lib/festivals-data"
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, Calendar, MapPin, ExternalLink } from "lucide-react"

interface QuizAnswer {
  questionId: number
  tags: string[]
}

function calculateResults(answers: QuizAnswer[]) {
  const allTags = answers.flatMap((a) => a.tags)

  const festivalScores = festivals.map((festival) => {
    let score = 0

    if (
      allTags.includes("electronic") ||
      allTags.includes("rave") ||
      allTags.includes("house") ||
      allTags.includes("techno")
    ) {
      if (
        festival.musicTypes.some((m) => ["EDM", "House", "Techno", "Electronic", "Trance", "Drum & Bass"].includes(m))
      ) {
        score += 3
      }
    }

    if (allTags.includes("rock") || allTags.includes("metal") || allTags.includes("punk")) {
      if (festival.musicTypes.some((m) => ["Rock", "Metal", "Punk", "Hard Rock", "Alternative"].includes(m))) {
        score += 3
      }
    }

    if (
      allTags.includes("indie") ||
      allTags.includes("artsy") ||
      allTags.includes("alternative") ||
      allTags.includes("folk")
    ) {
      if (festival.musicTypes.some((m) => ["Indie", "Alternative", "Folk", "Jazz"].includes(m))) {
        score += 3
      }
    }

    if (allTags.includes("hip-hop") || allTags.includes("rnb") || allTags.includes("urban")) {
      if (festival.musicTypes.some((m) => ["Hip-Hop", "R&B", "Grime", "Rap", "Afrobeats"].includes(m))) {
        score += 3
      }
    }

    if (allTags.includes("family") || allTags.includes("kids")) {
      if (festival.familyFriendly) score += 2
    }

    if (allTags.includes("camping") || allTags.includes("full-experience")) {
      if (festival.camping) score += 1
    }

    if (allTags.includes("day-festival") || allTags.includes("city")) {
      if (!festival.camping) score += 2
    }

    if (allTags.includes("budget") || allTags.includes("affordable")) {
      if (festival.priceValue <= 150) score += 2
    }

    if (allTags.includes("premium") || allTags.includes("big-budget")) {
      if (festival.priceValue >= 250) score += 1
    }

    if (allTags.includes("energetic") || allTags.includes("intense") || allTags.includes("party")) {
      if (
        festival.atmosphere.some((a) =>
          ["Energetic", "Intense", "High-Energy", "Rave", "Hedonistic", "Rowdy"].includes(a),
        )
      ) {
        score += 2
      }
    }

    if (allTags.includes("relaxed") || allTags.includes("intimate")) {
      if (festival.atmosphere.some((a) => ["Relaxed", "Peaceful", "Intimate", "Scenic", "Cultured"].includes(a))) {
        score += 2
      }
    }

    return { festival, score }
  })

  return festivalScores.sort((a, b) => b.score - a.score).slice(0, 5)
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [showResults, setShowResults] = useState(false)

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const question = quizQuestions[currentQuestion]

  const handleAnswer = (tags: string[]) => {
    const newAnswers = [...answers, { questionId: question.id, tags }]
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  const restart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  const results = showResults ? calculateResults(answers) : []

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {!showResults ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Festival Finder Quiz
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Perfect Festival</h1>
                <p className="text-muted-foreground">
                  Answer a few questions and we will match you with your ideal 2026 festivals
                </p>
              </div>

              <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <Card className="mb-6">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">{question.question}</h2>

                  <div className="grid gap-3">
                    {question.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full py-6 text-left justify-start text-base hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all bg-transparent"
                        onClick={() => handleAnswer(option.tags)}
                      >
                        <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium mr-3">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option.text}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {currentQuestion > 0 && (
                <Button variant="ghost" onClick={goBack} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Previous Question
                </Button>
              )}
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Your Results
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Perfect Festivals</h1>
                <p className="text-muted-foreground">
                  Based on your answers, here are your top festival matches for 2026
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {results.map((result, index) => (
                  <Card key={result.festival.id} className={index === 0 ? "border-primary border-2" : ""}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0">
                          <Image
                            src={result.festival.image || "/placeholder.svg"}
                            alt={result.festival.name}
                            fill
                            className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                          />
                          {index === 0 && (
                            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                              Best Match
                            </Badge>
                          )}
                          {index > 0 && (
                            <Badge variant="secondary" className="absolute top-3 left-3">
                              #{index + 1}
                            </Badge>
                          )}
                        </div>

                        <div className="p-5 flex-1">
                          <h3 className="text-xl font-bold mb-2">{result.festival.name}</h3>

                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {result.festival.dates}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {result.festival.location}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {result.festival.musicTypes.slice(0, 4).map((type) => (
                              <Badge key={type} variant="outline" className="text-xs border-primary/30 text-primary">
                                {type}
                              </Badge>
                            ))}
                          </div>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {result.festival.description}
                          </p>

                          <div className="flex items-center justify-between gap-4">
                            <div className="font-bold text-primary">{result.festival.price}</div>
                            <div className="flex gap-2">
                              <Button asChild variant="secondary" size="sm">
                                <Link href={`/festivals/${result.festival.id}`}>Details</Link>
                              </Button>
                              <Button asChild size="sm">
                                <a href={result.festival.ticketLink} target="_blank" rel="noopener noreferrer">
                                  Tickets
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={restart} variant="outline" className="gap-2 bg-transparent">
                  <RotateCcw className="w-4 h-4" />
                  Take Quiz Again
                </Button>
                <Button asChild className="gap-2">
                  <Link href="/festivals">
                    View All Festivals
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
