import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function PaymentMethods() {
  const paymentMethods = [
    {
      category: "Kartu Kredit & Debit",
      methods: [
        { name: "Visa", image: "/placeholder.svg?height=30&width=50" },
        { name: "Mastercard", image: "/placeholder.svg?height=30&width=50" },
        { name: "JCB", image: "/placeholder.svg?height=30&width=50" },
      ],
    },
    {
      category: "E-Wallet",
      methods: [
        { name: "GoPay", image: "/placeholder.svg?height=30&width=50" },
        { name: "ShopeePay", image: "/placeholder.svg?height=30&width=50" },
        { name: "DANA", image: "/placeholder.svg?height=30&width=50" },
        { name: "OVO", image: "/placeholder.svg?height=30&width=50" },
      ],
    },
    {
      category: "Virtual Account",
      methods: [
        { name: "BCA", image: "/placeholder.svg?height=30&width=50" },
        { name: "Mandiri", image: "/placeholder.svg?height=30&width=50" },
        { name: "BNI", image: "/placeholder.svg?height=30&width=50" },
        { name: "BRI", image: "/placeholder.svg?height=30&width=50" },
      ],
    },
  ]

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
                      src={method.image || "/placeholder.svg"}
                      alt={method.name}
                      width={50}
                      height={30}
                      className="object-contain"
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

