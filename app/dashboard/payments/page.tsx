"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Plus } from "lucide-react"

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Contoh data pembayaran
  const payments = [
    {
      id: "pay_1234",
      invoiceNumber: "INV-2023-001",
      date: "06 Apr 2023",
      amount: 8000000,
      status: "success",
      method: "bank_transfer",
      project: "SaaS Development",
    },
    {
      id: "pay_1235",
      invoiceNumber: "INV-2023-002",
      date: "15 Apr 2023",
      amount: 3500000,
      status: "pending",
      method: "credit_card",
      project: "Landing Page",
    },
    {
      id: "pay_1236",
      invoiceNumber: "INV-2023-003",
      date: "22 Apr 2023",
      amount: 1500000,
      status: "failed",
      method: "gopay",
      project: "Portfolio Website",
    },
    {
      id: "pay_1237",
      invoiceNumber: "INV-2023-004",
      date: "01 May 2023",
      amount: 5000000,
      status: "success",
      method: "bank_transfer",
      project: "E-Commerce Integration",
    },
    {
      id: "pay_1238",
      invoiceNumber: "INV-2023-005",
      date: "10 May 2023",
      amount: 2500000,
      status: "pending",
      method: "shopeepay",
      project: "Mobile App UI",
    },
  ]

  // Filter pembayaran berdasarkan tab aktif
  const filteredPayments = payments.filter((payment) => {
    if (activeTab === "all") return true
    return payment.status === activeTab
  })

  // Format angka ke Rupiah
  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`
  }

  // Render badge status
  const renderStatus = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">Berhasil</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500">Gagal</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Render metode pembayaran
  const renderMethod = (method: string) => {
    switch (method) {
      case "bank_transfer":
        return "Transfer Bank"
      case "credit_card":
        return "Kartu Kredit"
      case "gopay":
        return "GoPay"
      case "shopeepay":
        return "ShopeePay"
      default:
        return method
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pembayaran</h1>
        <Link href="/checkout">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Pembayaran Baru
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pembayaran</CardTitle>
          <CardDescription>Kelola dan lihat semua transaksi pembayaran Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="success">Berhasil</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="failed">Gagal</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Proyek</TableHead>
                  <TableHead>Metode</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.project}</TableCell>
                    <TableCell>{renderMethod(payment.method)}</TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>{renderStatus(payment.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredPayments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      Tidak ada data pembayaran
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 flex justify-between items-center text-sm text-muted-foreground">
            <div>
              Menampilkan {filteredPayments.length} dari {payments.length} transaksi
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

