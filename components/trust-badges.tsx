import { Shield, Award, CheckCircle, Clock } from "lucide-react"

export function TrustBadges() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">Mengapa Memilih Kami</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kami berkomitmen pada standar kualitas dan keamanan tertinggi di setiap proyek.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-1">Patuh GDPR</h3>
            <p className="text-sm text-muted-foreground">Perlindungan data sejak desain</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-lg font-medium mb-1">Bersertifikat ISO 27001</h3>
            <p className="text-sm text-muted-foreground">Standar keamanan informasi</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-medium mb-1">Standar WCAG 2.1 AA</h3>
            <p className="text-sm text-muted-foreground">Kepatuhan aksesibilitas</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-muted/10 flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">Dukungan 24/7</h3>
            <p className="text-sm text-muted-foreground">Layanan pelanggan setiap saat</p>
          </div>
        </div>
      </div>
    </section>
  )
}

