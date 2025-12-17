"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const backgroundVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 bg-[length:400%_400%]"
        variants={backgroundVariants}
        animate="animate"
      />
      
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span className="font-semibold tracking-wide uppercase">Your 2026 Season Starts Here</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter text-balance">
              UK FESTIVALS
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-shine">
                2026
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
              Discover every major UK festival. Compare tickets, explore lineups, find your perfect match, and
              prepare for the <span className="text-primary font-bold">summer of your life</span>.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md sm:max-w-none">
            <Button asChild size="lg" className="text-lg px-8 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)]">
              <Link href="/festivals" className="flex items-center gap-2">
                Explore All Festivals
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 h-14 rounded-full border-2 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-300">
              <Link href="/quiz">Find Your Match</Link>
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-center w-full max-w-4xl">
            {[ 
              { label: "Major Festivals", value: "16+" },
              { label: "Festival-Goers", value: "500k+" },
              { label: "Artists", value: "1000+" },
              { label: "Summer of", value: "2026" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.1, rotate: 2 }}
                className="p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="text-3xl md:text-5xl font-black text-primary mb-2 tracking-tight">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
