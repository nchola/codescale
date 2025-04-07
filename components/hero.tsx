"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Database, Layers } from "lucide-react"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = heroRef.current.getBoundingClientRect()

      const x = (clientX - left) / width
      const y = (clientY - top) / height

      heroRef.current.style.setProperty("--mouse-x", `${x}`)
      heroRef.current.style.setProperty("--mouse-y", `${y}`)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
      style={{
        background: `radial-gradient(
          800px circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), 
          rgba(99, 102, 241, 0.15), 
          transparent 40%
        )`,
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
            Transform Ide ke Aplikasi Web dalam 72 Jam
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">
            From Code to Scale: Your Digital Partner
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bespoke SaaS & Web Solutions with AI-Powered Precision. We deliver modern designs, clean code, and tested
            performance for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Start Project <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              See Pricing
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glassmorphism rounded-xl p-6 gradient-border">
            <Code className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold font-heading mb-2">Modern Design</h3>
            <p className="text-muted-foreground">
              Sleek interfaces with the latest UI/UX trends for maximum engagement and conversion.
            </p>
          </div>
          <div className="glassmorphism rounded-xl p-6 gradient-border">
            <Layers className="h-10 w-10 text-secondary mb-4" />
            <h3 className="text-xl font-bold font-heading mb-2">Clean Code</h3>
            <p className="text-muted-foreground">
              Maintainable, scalable architecture following best practices and industry standards.
            </p>
          </div>
          <div className="glassmorphism rounded-xl p-6 gradient-border">
            <Database className="h-10 w-10 text-accent mb-4" />
            <h3 className="text-xl font-bold font-heading mb-2">Tested Performance</h3>
            <p className="text-muted-foreground">
              Optimized for speed with sub-second load times and smooth user experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl"></div>
    </section>
  )
}

