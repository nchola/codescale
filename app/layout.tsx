import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "CodeScale | SaaS & Web Development Services",
  description:
    "Transform your ideas into high-performance web applications in 72 hours. Bespoke SaaS & Web Solutions with AI-Powered Precision.",
  keywords: ["SaaS development", "web development", "landing page", "portfolio", "Next.js", "React"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://api.techspec.com" />
        <meta name="theme-color" content="#6366F1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "CodeScale SaaS Development",
              description: "Bespoke SaaS & Web Solutions with AI-Powered Precision",
              provider: {
                "@type": "Organization",
                name: "CodeScale",
              },
              serviceType: "Web Development",
              areaServed: "Worldwide",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'