import { useEffect } from "react"
import Script from "next/script"

interface Window {
  snap: {
    pay: (token: string, options: any) => void
  }
}

interface SnapPaymentProps {
  token: string
  onSuccess?: (result: any) => void
  onPending?: (result: any) => void
  onError?: (result: any) => void
  onClose?: () => void
}

export function SnapPayment({ token, onSuccess, onPending, onError, onClose }: SnapPaymentProps) {
  const onScriptLoad = () => {
    if (token && window.snap) {
      window.snap.pay(token, {
        onSuccess: (result: any) => {
          console.log("Payment success:", result)
          onSuccess?.(result)
        },
        onPending: (result: any) => {
          console.log("Payment pending:", result)
          onPending?.(result)
        },
        onError: (result: any) => {
          console.error("Payment error:", result)
          onError?.(result)
        },
        onClose: () => {
          console.log("Payment widget closed")
          onClose?.()
        },
      })
    }
  }

  return (
    <Script
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      strategy="afterInteractive"
      onLoad={onScriptLoad}
    />
  )
} 