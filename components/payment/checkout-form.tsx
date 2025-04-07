"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { generateOrderId } from "@/lib/orders"

export function CheckoutForm({ amount, projectType, items }: any) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generate unique order ID
      const orderId = generateOrderId()

      // Prepare payment data
      const paymentData = {
        orderId,
        amount,
        customerDetails: {
          first_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          billing_address: {
            address: formData.address,
          },
        },
        itemDetails: items.map((item: any) => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          name: item.name,
        })),
        paymentType,
      }

      // Payment method specific configuration
      let paymentOptions = {}

      if (paymentMethod === "credit_card") {
        paymentOptions = {
          credit_card: {
            secure: true,
          },
        }
      } else if (paymentMethod === "bank_transfer") {
        paymentOptions = {
          bank_transfer: {
            bank: "bca",
          },
        }
      } else if (paymentMethod === "gopay") {
        paymentOptions = {
          gopay: {},
        }
      }

      // Send request to API
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...paymentData,
          paymentType: paymentMethod,
          paymentOptions,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // For credit card, redirect to payment page
        if (paymentMethod === "credit_card" && data.transaction.redirect_url) {
          window.location.href = data.transaction.redirect_url
        }
        // For gopay, show QR code
        else if (paymentMethod === "gopay" && data.transaction.actions) {
          const deepLinkUrl = data.transaction.actions.find((action: any) => action.name === "deeplink-redirect")?.url
          if (deepLinkUrl) {
            window.location.href = deepLinkUrl
          }
        }
        // For other methods, redirect to status page
        else {
          router.push(`/payment/status?order_id=${orderId}`)
        }
      } else {
        alert("Gagal memproses pembayaran: " + data.message)
      }
    } catch (error) {
      console.error("Error processing payment:", error)
      alert("Gagal memproses pembayaran. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  const getPaymentType = () => {
    switch (paymentMethod) {
      case "credit_card":
        return "credit_card"
      case "bank_transfer":
        return "bank_transfer"
      case "gopay":
        return "gopay"
      default:
        return "credit_card"
    }
  }

  const paymentType = getPaymentType()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pembayaran</CardTitle>
        <CardDescription>Lengkapi data Anda untuk memproses pembayaran</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Metode Pembayaran</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem value="credit_card" id="credit_card" className="peer sr-only" />
                  <Label
                    htmlFor="credit_card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Kartu Kredit
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="bank_transfer" id="bank_transfer" className="peer sr-only" />
                  <Label
                    htmlFor="bank_transfer"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Transfer Bank
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="gopay" id="gopay" className="peer sr-only" />
                  <Label
                    htmlFor="gopay"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    GoPay
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>Rp {amount.toLocaleString("id-ID")}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {projectType} - {items.length} item
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Memproses..." : "Bayar Sekarang"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}