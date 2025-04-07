"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, ExternalLink, FileText } from "lucide-react"

type Project = {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  industry: string
  metrics: string
  demoUrl: string
  caseStudyUrl: string
}

const projects: Project[] = [
  {
    id: "saas-dashboard",
    title: "SaaS Dashboard",
    description: "Analytics platform with real-time data visualization and user management.",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["React", "Supabase", "Stripe"],
    industry: "SaaS",
    metrics: "↑300% Engagement",
    demoUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "ecommerce-lp",
    title: "E-Commerce LP",
    description: "High-converting landing page for a fashion brand with 3D product showcase.",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["Next.js", "Shopify", "WebGL"],
    industry: "E-Commerce",
    metrics: "↑150% Conversion",
    demoUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "fintech-app",
    title: "Fintech Application",
    description: "Secure banking interface with transaction history and budget planning.",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["React", "Node.js", "PostgreSQL"],
    industry: "Finance",
    metrics: "↑200% User Retention",
    demoUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "health-platform",
    title: "Healthcare Platform",
    description: "Patient management system with appointment scheduling and medical records.",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["Next.js", "MongoDB", "Socket.io"],
    industry: "Healthcare",
    metrics: "↑250% Efficiency",
    demoUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "education-portal",
    title: "Education Portal",
    description: "Online learning platform with course management and progress tracking.",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["React", "Firebase", "TailwindCSS"],
    industry: "Education",
    metrics: "↑180% Completion Rate",
    demoUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "real-estate",
    title: "Real Estate Platform",
    description: "Property listing site with virtual tours and mortgage calculator.",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["Next.js", "Prisma", "MapBox"],
    industry: "Real Estate",
    metrics: "↑220% Lead Generation",
    demoUrl: "#",
    caseStudyUrl: "#",
  },
]

const industries = ["All", "SaaS", "E-Commerce", "Finance", "Healthcare", "Education", "Real Estate"]
const technologies = ["All", "React", "Next.js", "Supabase", "Firebase", "MongoDB", "Stripe", "Shopify", "WebGL"]

export function Showcase() {
  const [activeIndustry, setActiveIndustry] = useState("All")
  const [activeTech, setActiveTech] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [visibleProjects, setVisibleProjects] = useState(6)
  const showcaseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const industryMatch = activeIndustry === "All" || project.industry === activeIndustry
      const techMatch = activeTech === "All" || project.tech.includes(activeTech)
      return industryMatch && techMatch
    })
    setFilteredProjects(filtered)
  }, [activeIndustry, activeTech])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("project-visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = document.querySelectorAll(".project-card")
    cards.forEach((card) => observer.observe(card))

    return () => {
      cards.forEach((card) => observer.unobserve(card))
    }
  }, [filteredProjects])

  const loadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, filteredProjects.length))
  }

  return (
    <section id="showcase" ref={showcaseRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Our Project Showcase</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of successful projects across various industries and technologies.
          </p>
        </div>

        <Tabs defaultValue="industry" className="mb-8">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="industry">Filter by Industry</TabsTrigger>
              <TabsTrigger value="technology">Filter by Technology</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="industry" className="flex flex-wrap justify-center gap-2">
            {industries.map((industry) => (
              <Badge
                key={industry}
                variant={activeIndustry === industry ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveIndustry(industry)}
              >
                {industry}
              </Badge>
            ))}
          </TabsContent>

          <TabsContent value="technology" className="flex flex-wrap justify-center gap-2">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                variant={activeTech === tech ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveTech(tech)}
              >
                {tech}
              </Badge>
            ))}
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <div
              key={project.id}
              className="project-card glassmorphism rounded-xl overflow-hidden opacity-0 translate-y-4 transition-all duration-700 delay-100"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                  {project.metrics}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-heading mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <FileText className="h-4 w-4" /> Case Study
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProjects < filteredProjects.length && (
          <div className="text-center mt-12">
            <Button onClick={loadMore} variant="outline" className="gap-2">
              Load More <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <style jsx global>{`
        .project-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  )
}

