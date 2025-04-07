"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Calculator, Check } from "lucide-react"

export function PricingCalculator() {
  const [projectType, setProjectType] = useState("landing")
  const [pages, setPages] = useState(5)
  const [features, setFeatures] = useState(3)
  const [includesCMS, setIncludesCMS] = useState(false)
  const [includesAuth, setIncludesAuth] = useState(false)
  const [includesPayment, setIncludesPayment] = useState(false)
  const router = useRouter()

  const basePrice = {
    landing: 1500,
    portfolio: 2000,
    saas: 5000,
  }[projectType]

  const pagePrice = pages * 200
  const featurePrice = features * 500
  const cmsPrice = includesCMS ? 1000 : 0
  const authPrice = includesAuth ? 800 : 0
  const paymentPrice = includesPayment ? 1200 : 0

  const totalPrice = basePrice + pagePrice + featurePrice + cmsPrice + authPrice + paymentPrice
  const estimatedDays = Math.ceil(totalPrice / 1000)

  // Fungsi untuk mengarahkan ke halaman checkout dengan parameter
  const handleCheckout = () => {
    // Siapkan data untuk checkout
    const checkoutData = {
      projectType:
        projectType === "landing"
          ? "Landing Page"
          : projectType === "portfolio"
            ? "Portfolio Website"
            : "SaaS Application",
      amount: totalPrice,
      items: [
        {
          id: `base-${projectType}`,
          name: `Base (${
            projectType === "landing"
              ? "Landing Page"
              : projectType === "portfolio"
                ? "Portfolio Website"
                : "SaaS Application"
          })`,
          price: basePrice,
          quantity: 1,
        },
        {
          id: "pages",
          name: `${pages} Pages`,
          price: pagePrice,
          quantity: 1,
        },
        {
          id: "features",
          name: `${features} Custom Features`,
          price: featurePrice,
          quantity: 1,
        },
      ],
    }

    // Tambahkan item opsional jika dipilih
    if (includesCMS) {
      checkoutData.items.push({
        id: "cms",
        name: "Content Management System",
        price: cmsPrice,
        quantity: 1,
      })
    }

    if (includesAuth) {
      checkoutData.items.push({
        id: "auth",
        name: "Authentication System",
        price: authPrice,
        quantity: 1,
      })
    }

    if (includesPayment) {
      checkoutData.items.push({
        id: "payment",
        name: "Payment Integration",
        price: paymentPrice,
        quantity: 1,
      })
    }

    // Simpan data checkout ke localStorage untuk diambil di halaman checkout
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData))

    // Arahkan ke halaman checkout
    router.push("/checkout")
  }

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Project Calculator</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a real-time estimate for your project based on your specific requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" /> Project Specifications
              </CardTitle>
              <CardDescription>Customize your project details to get an accurate estimate.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Project Type</Label>
                <RadioGroup
                  defaultValue="landing"
                  value={projectType}
                  onValueChange={setProjectType}
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="landing" id="landing" className="peer sr-only" />
                    <Label
                      htmlFor="landing"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Landing Page
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="portfolio" id="portfolio" className="peer sr-only" />
                    <Label
                      htmlFor="portfolio"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Portfolio
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="saas" id="saas" className="peer sr-only" />
                    <Label
                      htmlFor="saas"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      SaaS Application
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Number of Pages</Label>
                  <span className="text-sm font-medium">{pages}</span>
                </div>
                <Slider value={[pages]} min={1} max={20} step={1} onValueChange={(value) => setPages(value[0])} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Custom Features</Label>
                  <span className="text-sm font-medium">{features}</span>
                </div>
                <Slider value={[features]} min={0} max={10} step={1} onValueChange={(value) => setFeatures(value[0])} />
              </div>

              <div className="space-y-4">
                <Label>Additional Requirements</Label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="cms" checked={includesCMS} onCheckedChange={setIncludesCMS} />
                    <Label htmlFor="cms">Content Management System</Label>
                  </div>
                  <span className="text-sm font-medium">+$1,000</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="auth" checked={includesAuth} onCheckedChange={setIncludesAuth} />
                    <Label htmlFor="auth">Authentication System</Label>
                  </div>
                  <span className="text-sm font-medium">+$800</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="payment" checked={includesPayment} onCheckedChange={setIncludesPayment} />
                    <Label htmlFor="payment">Payment Integration</Label>
                  </div>
                  <span className="text-sm font-medium">+$1,200</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Your Estimate</CardTitle>
              <CardDescription>Based on your project specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold font-heading text-primary">${totalPrice.toLocaleString()}</div>
                <p className="text-muted-foreground mt-1">Estimated delivery: {estimatedDays} days</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Base (
                    {projectType === "landing"
                      ? "Landing Page"
                      : projectType === "portfolio"
                        ? "Portfolio"
                        : "SaaS Application"}
                    )
                  </span>
                  <span>${basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{pages} Pages</span>
                  <span>${pagePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{features} Custom Features</span>
                  <span>${featurePrice.toLocaleString()}</span>
                </div>
                {includesCMS && (
                  <div className="flex justify-between text-sm">
                    <span>Content Management System</span>
                    <span>${cmsPrice.toLocaleString()}</span>
                  </div>
                )}
                {includesAuth && (
                  <div className="flex justify-between text-sm">
                    <span>Authentication System</span>
                    <span>${authPrice.toLocaleString()}</span>
                  </div>
                )}
                {includesPayment && (
                  <div className="flex justify-between text-sm">
                    <span>Payment Integration</span>
                    <span>${paymentPrice.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Responsive Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>SEO Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Performance Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>3 Months Support</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCheckout}>
                Lanjutkan ke Pembayaran
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

