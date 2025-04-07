// Simplified email module
export async function sendPaymentConfirmationEmail(data: any) {
  console.log("Would send email with data:", data)
  return { success: true }
}

// Template email untuk konfirmasi pembayaran
export const paymentConfirmationTemplate = (data: any) => {
  return `<div>Email confirmation for order ${data.orderNumber}</div>`
}

