import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Download, Play } from "lucide-react"
import Link from "next/link"

export function CaseStudies() {
  const caseStudies = [
    {
      title: "SaaS Dashboard Redesign",
      client: "AnalyticsPro",
      description: "How we improved user engagement by 300% with a complete UX overhaul and performance optimization.",
      tags: ["UX Design", "Performance", "React"],
      pdfUrl: "#",
      videoUrl: "#",
    },
    {
      title: "E-Commerce Conversion Boost",
      client: "FashionBrand",
      description:
        "Implementing WebGL product visualization that increased conversion rates by 150% and reduced returns.",
      tags: ["WebGL", "Next.js", "Shopify"],
      pdfUrl: "#",
      videoUrl: "#",
    },
    {
      title: "Fintech App Security Enhancement",
      client: "SecurePay",
      description:
        "Strengthening security protocols while maintaining a seamless user experience for a payment platform.",
      tags: ["Security", "Authentication", "API"],
      pdfUrl: "#",
      videoUrl: "#",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Case Studies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive deeper into our success stories and learn how we solve complex challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {caseStudies.map((study, index) => (
            <Card key={index} className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-1">Client: {study.client}</div>
                <CardTitle className="text-xl font-heading">{study.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {study.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{study.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" /> PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Play className="h-4 w-4" /> Video
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="#showcase">
            <Button variant="link" className="gap-1">
              View All Case Studies <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

