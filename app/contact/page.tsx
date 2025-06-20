"use client"
import { useEffect, useRef } from "react"
import { Mail, Phone, Instagram } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"

export default function ContactPage() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return
      const { clientX, clientY } = e
      const { left, top, width, height } = bgRef.current.getBoundingClientRect()
      const x = (clientX - left) / width
      const y = (clientY - top) / height
      bgRef.current.style.setProperty("--mouse-x", `${x}`)
      bgRef.current.style.setProperty("--mouse-y", `${y}`)
    }
    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <Navbar />
      <section
        ref={bgRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 min-h-[60vh] overflow-hidden"
        style={{
          background: `radial-gradient(
            800px circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), 
            rgba(99, 102, 241, 0.15), 
            transparent 40%
          )`,
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center mb-8">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-base">Fast Response</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x text-center">Hubungi Kami</h1>
            <p className="text-lg text-muted-foreground text-center mb-6 max-w-2xl">
              Hubungi kami melalui salah satu kontak di bawah ini jika ada sesuatu yang ingin ditanyakan, konsultasi, atau ingin memulai project bersama kami. Kami siap membantu Anda!
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center justify-center max-w-3xl mx-auto mb-12">
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center overflow-hidden shadow-lg">
                <Image src="/placeholder-user.jpg" alt="Contact Person" width={120} height={120} className="rounded-full object-cover" />
              </div>
              <div className="hidden md:block text-muted-foreground text-center md:text-right text-sm max-w-xs">Tim kami siap membantu Anda dengan ramah dan profesional.</div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group transition-all">
                <span className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </span>
                <Link
                  href="tel:085382581084"
                  className="text-lg md:text-xl text-primary font-semibold underline underline-offset-4 hover:text-secondary transition-colors"
                >
                  0853-8258-1084
                </Link>
              </div>
              <div className="flex items-center gap-4 group transition-all">
                <span className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </span>
                <Link
                  href="mailto:appwebjoki@gmail.com"
                  className="text-lg md:text-xl text-primary font-semibold underline underline-offset-4 hover:text-secondary transition-colors"
                >
                  appwebjoki@gmail.com
                </Link>
              </div>
              <div className="flex items-center gap-4 group transition-all">
                <span className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Instagram className="h-6 w-6 text-accent" />
                </span>
                <Link
                  href="https://instagram.com/appwebjoki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg md:text-xl text-accent font-semibold underline underline-offset-4 hover:text-primary transition-colors"
                >
                  @appwebjoki
                </Link>
              </div>
              
            </div>
          </div>
          <Separator className="my-12 w-2/3 mx-auto" />
          <p className="text-center text-muted-foreground text-base max-w-xl mx-auto">
            Kami akan membalas pesan Anda secepat mungkin pada jam kerja. Terima kasih telah mempercayakan kebutuhan digital Anda kepada <span className="font-semibold text-primary">AppWebJoki</span>.
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl"></div>
      </section>
      <Footer />
    </>
  )
} 