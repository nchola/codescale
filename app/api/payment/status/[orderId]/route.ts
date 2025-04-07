import { NextResponse } from "next/server"
import midtransClient from "midtrans-client"

// Inisialisasi Midtrans Core API
const core = new midtransClient.CoreApi({
  isProduction: process.env.NODE_ENV === "production",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
})

export async function GET(request: Request, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params

    if (!orderId) {
      return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 })
    }

    // Dapatkan status transaksi dari Midtrans
    const status = await core.transaction.status(orderId)

    return NextResponse.json({
      success: true,
      status,
    })
  } catch (error: any) {
    console.error("Status check error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to check transaction status",
      },
      { status: 500 },
    )
  }
}

