import { NextResponse } from "next/server"
import midtransClient from "midtrans-client"

if (!process.env.MIDTRANS_SERVER_KEY || !process.env.MIDTRANS_CLIENT_KEY) {
  throw new Error("Missing required environment variables for Midtrans")
}

// Inisialisasi Midtrans Snap API
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
})

export async function POST(request: Request) {
  try {
    let body
    try {
      body = await request.json()
    } catch (error) {
      console.error("Invalid JSON in request body:", error)
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid JSON in request body" 
        }, 
        { status: 400 }
      )
    }

    const { orderId, amount, customerDetails, itemDetails } = body

    // Validasi input
    if (!orderId) {
      return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 })
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ success: false, message: "Valid amount is required" }, { status: 400 })
    }
    if (!customerDetails || !customerDetails.email || !customerDetails.phone || !customerDetails.name) {
      return NextResponse.json({ 
        success: false, 
        message: "Customer details (email, phone, name) are required" 
      }, { status: 400 })
    }

    // Parameter untuk Snap API
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone,
        billing_address: customerDetails.address ? {
          address: customerDetails.address
        } : undefined
      },
      item_details: itemDetails || [],
      credit_card: {
        secure: true
      }
    }

    // Buat Snap Token
    const transaction = await snap.createTransaction(parameter)

    return NextResponse.json({
      success: true,
      token: transaction.token,
      redirect_url: transaction.redirect_url
    })
  } catch (error: any) {
    console.error("Payment error:", error)
    
    if (error.ApiResponse) {
      return NextResponse.json(
        {
          success: false,
          message: error.ApiResponse.status_message || "Payment processing failed",
          error_code: error.ApiResponse.status_code,
        },
        { status: error.ApiResponse.status_code || 500 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Payment processing failed",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    )
  }
}

