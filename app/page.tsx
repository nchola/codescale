import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Showcase } from "@/components/showcase"
import Stats from "@/components/stats"
import { Features } from "@/components/features"
import { CaseStudies } from "@/components/case-studies"
import { TrustBadges } from "@/components/trust-badges"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-slate-950">
      <Navbar />
      <Hero />
      <Showcase />
      <Stats />
      <Features />
      <CaseStudies />
      <TrustBadges />
      <Footer />
    </main>
  )
}

