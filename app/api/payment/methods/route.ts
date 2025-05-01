import { NextResponse } from "next/server"
import midtransClient from "midtrans-client"

const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
})

export async function GET() {
  try {
    // Get payment methods from Midtrans
    const paymentMethods = [
      {
        category: "Kartu Kredit & Debit",
        methods: [
          { name: "Visa", image: "/payment-icons/visa.svg" },
          { name: "Mastercard", image: "/payment-icons/mastercard.svg" },
          { name: "JCB", image: "/payment-icons/jcb.svg" },
        ],
      },
      {
        category: "E-Wallet",
        methods: [
          { name: "GoPay", image: "/payment-icons/gopay.svg" },
          { name: "ShopeePay", image: "/payment-icons/shopeepay.svg" },
          { name: "DANA", image: "/payment-icons/dana.svg" },
          { name: "OVO", image: "/payment-icons/ovo.svg" },
        ],
      },
      {
        category: "Virtual Account",
        methods: [
          { name: "BCA", image: "/payment-icons/bca.svg" },
          { name: "Mandiri", image: "/payment-icons/mandiri.svg" },
          { name: "BNI", image: "/payment-icons/bni.svg" },
          { name: "BRI", image: "/payment-icons/bri.svg" },
        ],
      },
    ]

    return NextResponse.json({
      success: true,
      methods: paymentMethods,
    })
  } catch (error: any) {
    console.error("Error fetching payment methods:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch payment methods",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    )
  }
} 