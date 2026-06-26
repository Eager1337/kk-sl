// Creates a Stripe Checkout Session for a KK order.
// Requires Supabase secrets: STRIPE_SECRET_KEY, and the auto-provided
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Sierra Leonean Leone is not a Stripe-supported zero-/two-decimal currency for
// most accounts, so we charge in USD using a fixed conversion. Adjust as needed.
const LE_TO_USD_CENTS = 5; // Le 1 ≈ $0.05  → a Le 10 bottle ≈ $0.50

type Item = { slug: string; name: string; qty: number; price: number };

interface CheckoutPayload {
  order_id?: string | null;
  customer_name: string;
  phone: string;
  address: string;
  notes?: string | null;
  items: Item[];
  total_leones: number;
  origin?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    if (!STRIPE_SECRET_KEY) {
      return new Response(JSON.stringify({ error: "STRIPE_SECRET_KEY not set" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = (await req.json()) as CheckoutPayload;
    if (!payload?.items?.length || !payload?.customer_name) {
      return new Response(JSON.stringify({ error: "Invalid checkout payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
    const origin = payload.origin || req.headers.get("origin") || "https://kk-sl.lovable.app";

    const line_items = payload.items.map((i) => ({
      quantity: i.qty,
      price_data: {
        currency: "usd",
        unit_amount: Math.max(50, i.price * LE_TO_USD_CENTS), // Stripe min $0.50
        product_data: { name: `${i.name} (Le ${i.price})` },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/store?paid=1&order=${payload.order_id ?? ""}`,
      cancel_url: `${origin}/store?canceled=1`,
      customer_creation: "always",
      metadata: {
        order_id: payload.order_id ?? "",
        customer_name: payload.customer_name,
        phone: payload.phone,
        address: payload.address,
        total_leones: String(payload.total_leones),
      },
    });

    // Link the Stripe session back to the order row (best effort).
    if (payload.order_id) {
      const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
      const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (SUPABASE_URL && SERVICE_KEY) {
        const admin = createClient(SUPABASE_URL, SERVICE_KEY);
        await admin
          .from("orders")
          .update({ stripe_session_id: session.id, payment_method: "stripe", payment_status: "pending" })
          .eq("id", payload.order_id);
      }
    }

    return new Response(JSON.stringify({ url: session.url, id: session.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-checkout error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
