import Image from "next/image"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface PaymentMethod {
  category: string
  methods: Array<{
    name: string
    image: string
  }>
}

export function PaymentMethods() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      category: "Kartu Kredit & Debit",
      methods: [
        { name: "Visa", image: "/payment-icons/visa.svg" },
        { name: "Mastercard", image: "/payment-icons/mastercard.svg" },
        { name: "JCB", image: "/payment-icons/jcb.svg" },
      ],
    },
    {
      category: "E-Wallet",
      methods: [
        { name: "GoPay", image: "/payment-icons/gopay.svg" },
        { name: "ShopeePay", image: "/payment-icons/shopeepay.svg" },
        { name: "DANA", image: "/payment-icons/dana.svg" },
        { name: "OVO", image: "/payment-icons/ovo.svg" },
      ],
    },
    {
      category: "Virtual Account",
      methods: [
        { name: "BCA", image: "/payment-icons/bca.svg" },
        { name: "Mandiri", image: "/payment-icons/mandiri.svg" },
        { name: "BNI", image: "/payment-icons/bni.svg" },
        { name: "BRI", image: "/payment-icons/bri.svg" },
      ],
    },
  ])

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        // Fetch available payment methods from your API
        const response = await fetch("/api/payment/methods")
        if (!response.ok) {
          throw new Error("Failed to load payment methods")
        }
        const data = await response.json()
        if (data.success && data.methods) {
          setPaymentMethods(data.methods)
        }
      } catch (err) {
        console.error("Error loading payment methods:", err)
        setError("Gagal memuat metode pembayaran")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPaymentMethods()
  }, [])

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Metode Pembayaran yang Didukung</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="h-4 w-40 mb-2" />
                <div className="flex flex-wrap gap-4">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="w-20 h-12" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Metode Pembayaran yang Didukung</h3>
        <div className="space-y-4">
          {paymentMethods.map((category) => (
            <div key={category.category}>
              <h4 className="text-sm text-muted-foreground mb-2">{category.category}</h4>
              <div className="flex flex-wrap gap-4">
                {category.methods.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center justify-center bg-muted/30 rounded-md p-2 w-20 h-12"
                  >
                    <Image
                      src={method.image}
                      alt={method.name}
                      width={50}
                      height={30}
                      className="object-contain"
                      loading="eager"
                      priority={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

