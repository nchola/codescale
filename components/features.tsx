import { Check, Zap, Shield, Cpu, BarChart, Layers } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Zero-Bundle Strategy",
      description: "SSG with Next.js, partial hydration, and code splitting for lightning-fast load times.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SSL/TLS 1.3, strict CSP headers, and CORS policies to protect your data.",
    },
    {
      icon: Cpu,
      title: "Edge Functions",
      description: "Deploy globally with Vercel Edge Functions for minimal latency worldwide.",
    },
    {
      icon: BarChart,
      title: "Performance Targets",
      description: "Optimized for Core Web Vitals with LCP <1.2s, TBT <200ms, and zero CLS.",
    },
    {
      icon: Layers,
      title: "Media Optimization",
      description: "WebP/AVIF formats with responsive images and lazy loading for optimal delivery.",
    },
    {
      icon: Check,
      title: "Accessibility",
      description: "WCAG 2.1 AA compliant with keyboard navigation and proper contrast ratios.",
    },
  ]

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Technical Excellence</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our development approach focuses on performance, security, and maintainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl font-heading">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

