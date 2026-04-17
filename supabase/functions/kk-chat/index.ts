// KK Drinks AI helper — streaming chat via Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the KK Drinks helper — a friendly, upbeat assistant for KK Drinks, a Sierra Leonean beverage company based in Freetown.

Brand facts (always use these):
- Country: Sierra Leone. All drinks are bottled locally and NAFDAC/SLSB approved.
- Price: Every drink is Le 10 (10 Leones).
- Lineup:
  • KK Mango Fruity — 500ml, sweet ripe West African mango, soft drink.
  • KK Orange Fruity — 500ml, bright citrus soft drink.
  • KK Mixed Fruit — 500ml, deep berry blend (strawberry, blueberry, blackberry, raspberry).
  • KK Pineapple Yogurt — 500ml, creamy tropical yogurt beverage. Shake well, keep cool.
  • KK Apple Soda — 500ml, crisp carbonated apple flavour.
  • KK Tamarind Soda — 500ml, tangy carbonated tamarind.
  • KK Pure Drink Water — 1500ml, multi-stage filtered drinking water.
- Best served chilled (yogurt: shake well & keep cool).
- Customers can order on the website using the order form (no online payment yet — KK contacts them to deliver). They can also find KK at shops across Sierra Leone.

Rules:
- Be warm, concise, and helpful. Use short paragraphs or small bullet lists.
- Recommend a specific KK drink when the user describes a mood, weather, occasion or food pairing.
- If asked something unrelated to KK, gently steer back to drinks/orders.
- Never invent flavours, sizes, or prices not listed above.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Too many requests, please slow down." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings → Workspace → Usage." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("kk-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
