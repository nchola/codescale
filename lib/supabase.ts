// Simplified supabase client
export function createClient() {
  return {
    from: (table: string) => ({
      insert: () => ({ select: () => ({ data: null, error: null }) }),
      select: () => ({ eq: () => ({ order: () => ({ data: [], error: null }) }) }),
      update: () => ({ eq: () => ({ select: () => ({ data: null, error: null }) }) }),
    }),
  }
}

