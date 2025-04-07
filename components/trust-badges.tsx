import { Shield, Award, CheckCircle, Clock } from "lucide-react"

export function TrustBadges() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">Why Trust Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We adhere to the highest standards of quality and security in all our projects.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-1">GDPR Compliant</h3>
            <p className="text-sm text-muted-foreground">Data protection by design</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-lg font-medium mb-1">ISO 27001 Certified</h3>
            <p className="text-sm text-muted-foreground">Information security standards</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-medium mb-1">WCAG 2.1 AA</h3>
            <p className="text-sm text-muted-foreground">Accessibility compliance</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-1">99.9% Uptime</h3>
            <p className="text-sm text-muted-foreground">Reliable hosting solutions</p>
          </div>
        </div>
      </div>
    </section>
  )
}

