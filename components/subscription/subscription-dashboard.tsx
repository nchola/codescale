"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CreditCard, Download, RotateCcw, AlertTriangle } from "lucide-react"
import { getUserSubscriptions, cancelSubscription } from "@/lib/subscriptions"

export function SubscriptionDashboard({ userId }: { userId: string }) {
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelingId, setCancelingId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const data = await getUserSubscriptions(userId)
        setSubscriptions(data || [])
      } catch (error) {
        console.error("Error fetching subscriptions:", error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchSubscriptions()
    }
  }, [userId])

  // Fungsi untuk membatalkan langganan
  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!confirm("Apakah Anda yakin ingin membatalkan langganan ini?")) return

    setCancelingId(subscriptionId)

    try {
      await cancelSubscription(subscriptionId)

      // Update state
      setSubscriptions(subscriptions.map((sub) => (sub.id === subscriptionId ? { ...sub, status: "canceled" } : sub)))
    } catch (error) {
      console.error("Error canceling subscription:", error)
      alert("Gagal membatalkan langganan. Silakan coba lagi.")
    } finally {
      setCancelingId(null)
    }
  }

  // Fungsi untuk menghitung sisa hari langganan
  const calculateRemainingDays = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  // Render badge status
  const renderStatus = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Aktif</Badge>
      case "canceled":
        return <Badge className="bg-yellow-500">Dibatalkan</Badge>
      case "expired":
        return <Badge className="bg-red-500">Kedaluwarsa</Badge>
      case "pending":
        return <Badge className="bg-blue-500">Menunggu</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Render siklus penagihan
  const renderBillingCycle = (cycle: string) => {
    switch (cycle) {
      case "monthly":
        return "Bulanan"
      case "quarterly":
        return "3 Bulan"
      case "annual":
        return "Tahunan"
      default:
        return cycle
    }
  }

  // Format angka ke Rupiah
  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Langganan</CardTitle>
          <CardDescription>Memuat data langganan...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (subscriptions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Langganan</CardTitle>
          <CardDescription>Anda belum memiliki langganan aktif</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="mb-4">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto" />
          </div>
          <p className="mb-6">
            Anda belum berlangganan layanan kami. Mulai berlangganan untuk mendapatkan akses penuh.
          </p>
          <Button onClick={() => router.push("/pricing")}>Lihat Paket Langganan</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Langganan</CardTitle>
        <CardDescription>Kelola langganan layanan Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="all">Semua</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {subscriptions
              .filter((sub) => sub.status === "active")
              .map((subscription) => (
                <div key={subscription.id} className="mb-6 border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{subscription.plan_id}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStatus(subscription.status)}
                        <span className="text-sm text-muted-foreground">
                          {renderBillingCycle(subscription.billing_cycle)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{formatCurrency(subscription.amount)}</div>
                      <div className="text-sm text-muted-foreground">
                        per{" "}
                        {subscription.billing_cycle === "monthly"
                          ? "bulan"
                          : subscription.billing_cycle === "quarterly"
                            ? "3 bulan"
                            : "tahun"}
                      </div>
                    </div>
                  </div>

                  {subscription.end_date && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Masa Aktif</span>
                        <span>{calculateRemainingDays(subscription.end_date)} hari tersisa</span>
                      </div>
                      <Progress value={(calculateRemainingDays(subscription.end_date) / 30) * 100} className="h-2" />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <div className="text-muted-foreground">Mulai</div>
                        <div>{formatDate(subscription.start_date)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <div className="text-muted-foreground">Berakhir</div>
                        <div>{subscription.end_date ? formatDate(subscription.end_date) : "-"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <div className="text-muted-foreground">Metode Pembayaran</div>
                      <div>{subscription.payment_method?.type || "Kartu Kredit"}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" /> Invoice
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-red-500 hover:text-red-600"
                      onClick={() => handleCancelSubscription(subscription.id)}
                      disabled={cancelingId === subscription.id}
                    >
                      {cancelingId === subscription.id ? (
                        <>
                          <RotateCcw className="h-4 w-4 animate-spin" /> Membatalkan...
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-4 w-4" /> Batalkan
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}

            {subscriptions.filter((sub) => sub.status === "active").length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Tidak ada langganan aktif</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="mb-6 border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{subscription.plan_id}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStatus(subscription.status)}
                      <span className="text-sm text-muted-foreground">
                        {renderBillingCycle(subscription.billing_cycle)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{formatCurrency(subscription.amount)}</div>
                    <div className="text-sm text-muted-foreground">
                      per{" "}
                      {subscription.billing_cycle === "monthly"
                        ? "bulan"
                        : subscription.billing_cycle === "quarterly"
                          ? "3 bulan"
                          : "tahun"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <div className="text-muted-foreground">Mulai</div>
                      <div>{formatDate(subscription.start_date)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <div className="text-muted-foreground">Berakhir</div>
                      <div>{subscription.end_date ? formatDate(subscription.end_date) : "-"}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" /> Invoice
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push("/pricing")} className="w-full">
          Kelola Langganan
        </Button>
      </CardFooter>
    </Card>
  )
}

