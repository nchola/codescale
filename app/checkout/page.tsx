"use client"

import { useEffect, useState } from "react"
import { CheckoutForm } from "@/components/payment/checkout-form"
import { PaymentMethods } from "@/components/payment/payment-methods"
import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutPage() {
  const [checkoutData, setCheckoutData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Ambil data checkout dari localStorage
    const storedData = localStorage.getItem("checkoutData")

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setCheckoutData(parsedData)
      } catch (error) {
        console.error("Error parsing checkout data:", error)
      }
    } else {
      // Data default jika tidak ada di localStorage
      setCheckoutData({
        amount: 5000000, // Rp 5.000.000
        projectType: "SaaS Development",
        items: [
          {
            id: "saas-dev",
            name: "SaaS Development - Basic Package",
            price: 4500000,
            quantity: 1,
          },
          {
            id: "support",
            name: "3 Months Support",
            price: 500000,
            quantity: 1,
          },
        ],
      })
    }

    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-[600px] w-full rounded-lg" />
            </div>
            <div className="space-y-8">
              <Skeleton className="h-[300px] w-full rounded-lg" />
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {checkoutData && (
              <CheckoutForm
                amount={checkoutData.amount}
                projectType={checkoutData.projectType}
                items={checkoutData.items}
              />
            )}
          </div>

          <div className="space-y-8">
            <PaymentMethods />

            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Informasi Pembayaran</h3>
              <div className="space-y-4 text-sm">
                <p>
                  <strong>Deposit Awal (30%):</strong> Pembayaran awal sebesar 30% dari total nilai proyek untuk memulai
                  pengembangan.
                </p>
                <p>
                  <strong>Milestone Payment:</strong> Pembayaran berikutnya berdasarkan pencapaian milestone yang telah
                  disepakati.
                </p>
                <p>
                  <strong>Final Payment:</strong> Pelunasan setelah proyek selesai dan sebelum deployment ke production.
                </p>
                <p>
                  <strong>Keamanan:</strong> Semua transaksi diproses dengan enkripsi SSL dan menggunakan gateway
                  pembayaran yang aman.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

