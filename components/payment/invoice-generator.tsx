"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer } from "lucide-react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

type InvoiceItem = {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

type InvoiceProps = {
  invoiceNumber: string
  date: string
  dueDate: string
  clientName: string
  clientEmail: string
  clientAddress: string
  items: InvoiceItem[]
  notes?: string
  status: "paid" | "unpaid" | "overdue"
}

export function InvoiceGenerator({
  invoiceNumber,
  date,
  dueDate,
  clientName,
  clientEmail,
  clientAddress,
  items,
  notes,
  status,
}: InvoiceProps) {
  const [loading, setLoading] = useState(false)

  // Hitung subtotal
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

  // Hitung pajak (10%)
  const tax = subtotal * 0.1

  // Hitung total
  const total = subtotal + tax

  // Format angka ke Rupiah
  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`
  }

  // Generate PDF invoice
  const generatePDF = () => {
    setLoading(true)

    try {
      const doc = new jsPDF()

      // Add company logo and info
      doc.setFontSize(20)
      doc.setTextColor(99, 102, 241) // Primary color
      doc.text("CodeScale", 14, 22)

      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text("Jl. Teknologi No. 123", 14, 30)
      doc.text("Jakarta, Indonesia 12345", 14, 35)
      doc.text("info@codescale.com", 14, 40)

      // Add invoice details
      doc.setFontSize(16)
      doc.setTextColor(30, 30, 30)
      doc.text("INVOICE", 140, 22)

      doc.setFontSize(10)
      doc.text(`Invoice #: ${invoiceNumber}`, 140, 30)
      doc.text(`Tanggal: ${date}`, 140, 35)
      doc.text(`Jatuh Tempo: ${dueDate}`, 140, 40)

      // Add status - Esta es la línea con el error
      doc.setFillColor(
        status === "paid" ? 16 : status === "overdue" ? 239 : 245,
        status === "paid" ? 185 : status === "overdue" ? 68 : 158,
        status === "paid" ? 129 : status === "overdue" ? 68 : 11,
      )
      doc.rect(140, 45, 25, 10, "F")
      doc.setTextColor(255, 255, 255)
      doc.text(status.toUpperCase(), 142, 51)

      // Add client info
      doc.setTextColor(30, 30, 30)
      doc.setFontSize(12)
      doc.text("Ditagihkan Kepada:", 14, 60)

      doc.setFontSize(10)
      doc.text(clientName, 14, 68)
      doc.text(clientEmail, 14, 73)
      doc.text(clientAddress.split(", ").join("\n"), 14, 78)

      // Add items table
      const tableColumn = ["Deskripsi", "Jumlah", "Harga Satuan", "Total"]
      const tableRows = items.map((item) => [
        item.description,
        item.quantity.toString(),
        formatCurrency(item.unitPrice),
        formatCurrency(item.quantity * item.unitPrice),
      ])

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 95,
        theme: "grid",
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [99, 102, 241], textColor: [255, 255, 255] },
      })

      // Add summary
      const finalY = (doc as any).lastAutoTable.finalY + 10

      doc.text("Subtotal:", 120, finalY)
      doc.text(formatCurrency(subtotal), 170, finalY, { align: "right" })

      doc.text("PPN (10%):", 120, finalY + 7)
      doc.text(formatCurrency(tax), 170, finalY + 7, { align: "right" })

      doc.setFontSize(12)
      doc.setFont(undefined, "bold")
      doc.text("Total:", 120, finalY + 15)
      doc.text(formatCurrency(total), 170, finalY + 15, { align: "right" })

      // Add notes if any
      if (notes) {
        doc.setFontSize(10)
        doc.setFont(undefined, "normal")
        doc.text("Catatan:", 14, finalY + 30)
        doc.text(notes, 14, finalY + 37)
      }

      // Add footer
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.text("Terima kasih atas kepercayaan Anda menggunakan layanan kami.", 14, finalY + 50)
      doc.text(
        "Pembayaran dapat dilakukan melalui transfer bank atau metode pembayaran lainnya yang tersedia.",
        14,
        finalY + 55,
      )

      // Save the PDF
      doc.save(`Invoice-${invoiceNumber}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setLoading(false)
    }
  }

  // Print invoice
  const printInvoice = () => {
    window.print()
  }

  return (
    <Card className="w-full print:shadow-none" id="invoice">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-2xl text-primary">INVOICE</CardTitle>
          <CardDescription>Invoice untuk layanan pengembangan web</CardDescription>
        </div>
        <div className="text-right">
          <p className="font-medium">CodeScale</p>
          <p className="text-sm text-muted-foreground">Jl. Teknologi No. 123</p>
          <p className="text-sm text-muted-foreground">Jakarta, Indonesia 12345</p>
          <p className="text-sm text-muted-foreground">info@codescale.com</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="text-sm font-medium mb-1">Ditagihkan Kepada:</h3>
            <p className="font-medium">{clientName}</p>
            <p className="text-sm text-muted-foreground">{clientEmail}</p>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{clientAddress}</p>
          </div>
          <div>
            <div className="flex justify-between gap-8 text-sm mb-1">
              <span className="font-medium">No. Invoice:</span>
              <span>{invoiceNumber}</span>
            </div>
            <div className="flex justify-between gap-8 text-sm mb-1">
              <span className="font-medium">Tanggal:</span>
              <span>{date}</span>
            </div>
            <div className="flex justify-between gap-8 text-sm mb-1">
              <span className="font-medium">Jatuh Tempo:</span>
              <span>{dueDate}</span>
            </div>
            <div className="flex justify-between gap-8 text-sm mt-2">
              <span className="font-medium">Status:</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  status === "paid"
                    ? "bg-green-100 text-green-600"
                    : status === "overdue"
                      ? "bg-red-100 text-red-600"
                      : "bg-amber-100 text-amber-600"
                }`}
              >
                {status === "paid" ? "Lunas" : status === "overdue" ? "Terlambat" : "Belum Dibayar"}
              </span>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Deskripsi</TableHead>
              <TableHead className="text-center">Jumlah</TableHead>
              <TableHead className="text-right">Harga Satuan</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.description}</TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.quantity * item.unitPrice)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-col items-end space-y-2">
          <div className="flex justify-between w-full max-w-xs">
            <span className="text-muted-foreground">Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between w-full max-w-xs">
            <span className="text-muted-foreground">PPN (10%):</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between w-full max-w-xs font-bold text-lg pt-2 border-t">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {notes && (
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-1">Catatan:</h3>
            <p className="text-sm text-muted-foreground">{notes}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between print:hidden">
        <Button variant="outline" onClick={printInvoice} className="gap-2">
          <Printer className="h-4 w-4" /> Print
        </Button>
        <Button onClick={generatePDF} disabled={loading} className="gap-2">
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </CardFooter>
    </Card>
  )
}

