// Simplified midtrans library
export function createCoreClient() {
  return {
    transaction: {
      status: async (id: string) => ({ id, status: "pending" }),
    },
    charge: async (params: any) => ({ transaction_id: "test", status: "pending" }),
  }
}

export function createTransactionParams(params: any) {
  return params
}

