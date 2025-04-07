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
      // Generar un ID de orden único
      const orderId = generateOrderId()

      // Preparar los datos para la API de pago
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

      // Configuración específica según el método de pago
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

      // Enviar solicitud a la API
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
        // Si es tarjeta de crédito, redirigir a la página de pago de Midtrans
        if (paymentMethod === "credit_card" && data.transaction.redirect_url) {
          window.location.href = data.transaction.redirect_url
        }
        // Si es gopay, mostrar el QR code
        else if (paymentMethod === "gopay" && data.transaction.actions) {
          const deepLinkUrl = data.transaction.actions.find((action: any) => action.name === "deeplink-redirect")?.url
          if (deepLinkUrl) {
            window.location.href = deepLinkUrl
          }
        }
        // Para otros métodos, redirigir a la página de estado
        else {
          router.push(`/payment/status?order_id=${orderId}`)
        }
      } else {
        alert("Error al procesar el pago: " + data.message)
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error)
      alert("Error al procesar el pago. Por favor, inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  // Función para determinar el tipo de pago según el método seleccionado
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
        <CardTitle>Checkout</CardTitle>
        <CardDescription>Complete sus datos para procesar el pago</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
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
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Método de pago</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem value="credit_card" id="credit_card" className="peer sr-only" />
                  <Label
                    htmlFor="credit_card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Tarjeta de Crédito
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="bank_transfer" id="bank_transfer" className="peer sr-only" />
                  <Label
                    htmlFor="bank_transfer"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Transferencia Bancaria
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
                {projectType} - {items.length} item(s)
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Procesando..." : "Pagar ahora"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

