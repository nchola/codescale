"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SnapPayment } from "@/components/payment/snap-payment"

export default function CheckoutPage() {
  const router = useRouter()
  const [paymentToken, setPaymentToken] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async (formData: FormData) => {
    try {
      setIsProcessing(true)

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: `ORDER-${Date.now()}`,
          amount: formData.get("amount"),
          customerDetails: {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
          },
          itemDetails: [
            {
              id: "ITEM-1",
              price: formData.get("amount"),
              quantity: 1,
              name: "Landing Page",
            },
          ],
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || "Payment failed")
      }

      setPaymentToken(data.token)
    } catch (error) {
      console.error("Payment error:", error)
      alert("Pembayaran gagal: " + (error as Error).message)
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaymentSuccess = (result: any) => {
    alert("Pembayaran berhasil!")
    router.push("/dashboard")
  }

  const handlePaymentPending = (result: any) => {
    alert("Pembayaran dalam proses. Silakan selesaikan pembayaran sesuai instruksi.")
  }

  const handlePaymentError = (result: any) => {
    alert("Pembayaran gagal: " + result.message)
  }

  const handlePaymentClose = () => {
    setPaymentToken(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <form onSubmit={(e) => {
        e.preventDefault()
        handlePayment(new FormData(e.currentTarget))
      }} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Nomor Telepon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Alamat
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Jumlah Pembayaran
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            required
            min="1000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isProcessing ? "Memproses..." : "Bayar Sekarang"}
        </button>
      </form>

      {paymentToken && (
        <SnapPayment
          token={paymentToken}
          onSuccess={handlePaymentSuccess}
          onPending={handlePaymentPending}
          onError={handlePaymentError}
          onClose={handlePaymentClose}
        />
      )}
    </div>
  )
}

