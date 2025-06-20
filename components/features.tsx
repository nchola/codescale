import { Check, Zap, Shield, Cpu, BarChart, Layers } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Strategi Tanpa Bundle",
      description: "SSG dengan Next.js, partial hydration, dan code splitting untuk waktu muat super cepat.",
    },
    {
      icon: Shield,
      title: "Keamanan Perusahaan",
      description: "SSL/TLS 1.3, header CSP ketat, dan kebijakan CORS untuk melindungi data Anda.",
    },
    {
      icon: Cpu,
      title: "Fungsi Edge",
      description: "Deploy global dengan Vercel Edge Functions untuk latensi minimal di seluruh dunia.",
    },
    {
      icon: BarChart,
      title: "Target Performa",
      description: "Optimasi untuk Core Web Vitals dengan LCP <1.2s, TBT <200ms, dan nol CLS.",
    },
    {
      icon: Layers,
      title: "Optimasi Media",
      description: "Format WebP/AVIF dengan gambar responsif dan lazy loading untuk pengiriman optimal.",
    },
    {
      icon: Check,
      title: "Aksesibilitas",
      description: "Standar WCAG 2.1 AA dengan navigasi keyboard dan rasio kontras yang tepat.",
    },
  ]

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Keunggulan Teknis</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pendekatan pengembangan kami berfokus pada performa, keamanan, dan kemudahan pemeliharaan.
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

