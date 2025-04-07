import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config();

// Fungsi untuk setup database di Supabase
export async function setupDatabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase credentials");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("Creating orders table...");

  // Buat tabel orders
  const { data: ordersData, error: ordersError } = await supabase
    .rpc('execute_sql', {
      query: `
        CREATE TABLE IF NOT EXISTS orders (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          order_id TEXT UNIQUE NOT NULL,
          user_id UUID REFERENCES auth.users(id),
          amount NUMERIC NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          payment_details JSONB,
          items JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
        CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
      `
    });

  if (ordersError) {
    console.error("Error creating orders table:", ordersError);
    throw ordersError;
  }

  console.log("Creating invoices table...");

  // Buat tabel invoices
  const { data: invoicesData, error: invoicesError } = await supabase
    .rpc('execute_sql', {
      query: `
        CREATE TABLE IF NOT EXISTS invoices (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          invoice_number TEXT UNIQUE NOT NULL,
          order_id TEXT REFERENCES orders(order_id),
          user_id UUID REFERENCES auth.users(id),
          amount NUMERIC NOT NULL,
          status TEXT NOT NULL DEFAULT 'unpaid',
          due_date TIMESTAMP WITH TIME ZONE,
          items JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
        CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
      `
    });

  if (invoicesError) {
    console.error("Error creating invoices table:", invoicesError);
    throw invoicesError;
  }

  console.log("Creating subscriptions table...");

  // Buat tabel subscriptions
  const { data: subscriptionsData, error: subscriptionsError } = await supabase
    .rpc('execute_sql', {
      query: `
        CREATE TABLE IF NOT EXISTS subscriptions (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES auth.users(id),
          plan_id TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'active',
          start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          end_date TIMESTAMP WITH TIME ZONE,
          billing_cycle TEXT DEFAULT 'monthly',
          amount NUMERIC NOT NULL,
          next_billing_date TIMESTAMP WITH TIME ZONE,
          payment_method JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
        CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
      `
    });

  if (subscriptionsError) {
    console.error("Error creating subscriptions table:", subscriptionsError);
    throw subscriptionsError;
  }

  console.log("Database setup completed successfully!");
}

// Jalankan setup jika dijalankan langsung
if (require.main === module) {
  setupDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Setup failed:", error);
      process.exit(1);
    });
}