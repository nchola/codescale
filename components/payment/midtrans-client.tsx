"use client"

import type { ReactNode } from "react"

export function MidtransClient({ children }: { children: ReactNode }) {
  return <>{children}</>
}

// Tambahkan tipe untuk window
declare global {
  interface Window {
    snap: any
  }
}

