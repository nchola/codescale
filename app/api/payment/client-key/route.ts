import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
  })
}

