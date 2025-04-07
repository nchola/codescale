import { NextResponse } from "next/server"
import midtransClient from "midtrans-client"

// Inisialisasi Midtrans Core API
// Configuración actualizada para usar el entorno sandbox
const core = new midtransClient.CoreApi({
  isProduction: false, // Cambiado a false para usar sandbox
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId, amount, customerDetails, itemDetails, paymentType = "credit_card", paymentOptions = {} } = body

    // Validasi input
    if (!orderId || !amount || !customerDetails) {
      return NextResponse.json({ success: false, message: "Missing required parameters" }, { status: 400 })
    }

    // Parameter transaksi
    const transactionDetails = {
      order_id: orderId,
      gross_amount: amount,
    }

    // Buat parameter sesuai dengan jenis pembayaran
    let parameter = {
      payment_type: paymentType,
      transaction_details: transactionDetails,
      customer_details: customerDetails,
      item_details: itemDetails || [],
    }

    // Tambahkan opsi pembayaran spesifik jika ada
    if (Object.keys(paymentOptions).length > 0) {
      parameter = { ...parameter, ...paymentOptions }
    }

    // Buat transaksi dengan Core API
    const transaction = await core.charge(parameter)

    return NextResponse.json({
      success: true,
      transaction,
    })
  } catch (error: any) {
    console.error("Payment error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Payment processing failed",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 },
    )
  }
}

