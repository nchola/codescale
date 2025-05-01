declare module "midtrans-client" {
  interface Config {
    isProduction: boolean
    serverKey: string
    clientKey: string
  }

  interface CustomerDetails {
    first_name: string
    email: string
    phone: string
    address?: string
  }

  interface TransactionDetails {
    order_id: string
    gross_amount: number
  }

  interface ChargeParameter {
    transaction_details: TransactionDetails
    customer_details: CustomerDetails
    item_details?: Array<{
      id: string
      price: number
      quantity: number
      name: string
    }>
    credit_card?: {
      secure: boolean
    }
    [key: string]: any
  }

  interface ApiResponse {
    token: string
    redirect_url: string
    status_code?: string
    status_message?: string
    transaction_id?: string
  }

  class CoreApi {
    constructor(config: Config)
    charge(parameter: ChargeParameter): Promise<ApiResponse>
  }

  class Snap {
    constructor(config: Config)
    createTransaction(parameter: ChargeParameter): Promise<ApiResponse>
  }

  export default {
    CoreApi,
    Snap
  }
} 