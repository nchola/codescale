"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, AlertCircle, ArrowRight } from "lucide-react"

type PaymentStatusProps = {
  result: any
  orderId?: string
}

export function PaymentStatus({ result, orderId }: PaymentStatusProps) {
  const [status, setStatus] = useState(result)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Jika hanya orderId yang diberikan, ambil status dari API
  useEffect(() => {
    if (orderId && !result) {
      checkStatus()
    }

    // Polling status setiap 5 detik jika status pending
    let interval: NodeJS.Timeout | undefined
    if ((status?.transaction_status === "pending" || !status) && orderId) {
      interval = setInterval(checkStatus, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [orderId, status])

  async function checkStatus() {
    if (!orderId) return

    setLoading(true)
    try {
      const response = await fetch(`/api/payment/status/${orderId}`)
      const data = await response.json()

      if (data.success) {
        setStatus(data.status)
        let interval: NodeJS.Timeout | undefined
        // Hentikan polling jika status sudah final
        if (["settlement", "capture", "deny", "cancel", "expire"].includes(data.status.transaction_status)) {
          if (interval) clearInterval(interval)
        }
      }
    } catch (error) {
      console.error("Error checking status:", error)
    } finally {
      setLoading(false)
    }
  }

  // Tentukan status dan tampilan berdasarkan transaction_status
  let statusInfo = {
    icon: <Clock className="h-16 w-16 text-yellow-500" />,
    title: "Menunggu Pembayaran",
    description: "Pembayaran Anda sedang diproses.",
    color: "text-yellow-500",
  }

  if (status) {
    if (["settlement", "capture"].includes(status.transaction_status)) {
      statusInfo = {
        icon: <CheckCircle className="h-16 w-16 text-green-500" />,
        title: "Pembayaran Berhasil",
        description: "Terima kasih! Pembayaran Anda telah diterima.",
        color: "text-green-500",
      }
    } else if (["deny", "cancel", "expire"].includes(status.transaction_status)) {
      statusInfo = {
        icon: <XCircle className="h-16 w-16 text-red-500" />,
        title: "Pembayaran Gagal",
        description: "Maaf, pembayaran Anda tidak dapat diproses.",
        color: "text-red-500",
      }
    } else if (status.transaction_status === "challenge") {
      statusInfo = {
        icon: <AlertCircle className="h-16 w-16 text-orange-500" />,
        title: "Pembayaran Dalam Peninjauan",
        description: "Pembayaran Anda sedang ditinjau untuk keamanan.",
        color: "text-orange-500",
      }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">{statusInfo.icon}</div>
        <CardTitle className={statusInfo.color}>{statusInfo.title}</CardTitle>
        <CardDescription>{statusInfo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {status && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Order ID:</div>
              <div className="font-medium">{status.order_id}</div>

              <div className="text-muted-foreground">Jumlah:</div>
              <div className="font-medium">Rp {Number.parseInt(status.gross_amount).toLocaleString("id-ID")}</div>

              <div className="text-muted-foreground">Metode Pembayaran:</div>
              <div className="font-medium capitalize">{status.payment_type.replace("_", " ")}</div>

              <div className="text-muted-foreground">Waktu Transaksi:</div>
              <div className="font-medium">{new Date(status.transaction_time).toLocaleString("id-ID")}</div>
            </div>

            {/* Tampilkan instruksi pembayaran jika ada */}
            {status.transaction_status === "pending" && status.payment_type === "bank_transfer" && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <h4 className="font-medium mb-2">Instruksi Pembayaran:</h4>
                <p className="text-sm">Silakan transfer ke rekening berikut:</p>
                <div className="mt-2 text-sm">
                  <div className="flex justify-between">
                    <span>Bank:</span>
                    <span className="font-medium">{status.va_numbers?.[0]?.bank.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nomor VA:</span>
                    <span className="font-medium">{status.va_numbers?.[0]?.va_number}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        {status?.transaction_status === "pending" && (
          <Button variant="outline" onClick={checkStatus} disabled={loading}>
            Cek Status
          </Button>
        )}

        <Button onClick={() => router.push("/dashboard")} className="gap-2">
          Lanjutkan <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

