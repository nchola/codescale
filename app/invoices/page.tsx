import { InvoiceGenerator } from "@/components/payment/invoice-generator"

export default function InvoicesPage() {
  // Contoh data invoice
  const invoiceData = {
    invoiceNumber: "INV-2023-001",
    date: "06 April 2023",
    dueDate: "20 April 2023",
    clientName: "PT Teknologi Maju",
    clientEmail: "finance@teknologimaju.com",
    clientAddress: "Jl. Sudirman No. 123, Jakarta Selatan, 12190, Indonesia",
    items: [
      {
        id: "1",
        description: "SaaS Development - Basic Package",
        quantity: 1,
        unitPrice: 4500000,
      },
      {
        id: "2",
        description: "UI/UX Design",
        quantity: 1,
        unitPrice: 2000000,
      },
      {
        id: "3",
        description: "3 Months Support & Maintenance",
        quantity: 1,
        unitPrice: 1500000,
      },
    ],
    notes:
      "Pembayaran dapat dilakukan melalui transfer bank ke rekening BCA 1234567890 a.n. PT CodeScale Indonesia. Harap mencantumkan nomor invoice pada keterangan transfer.",
    status: "unpaid" as const,
  }

  return (
    <main className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Invoice</h1>

        <InvoiceGenerator {...invoiceData} />
      </div>
    </main>
  )
}

