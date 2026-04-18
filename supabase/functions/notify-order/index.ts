// Sends an email notification to the KK owner whenever a new order is placed.
// Includes a one-click "Open in WhatsApp" link with the order pre-filled.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OWNER_EMAIL = "ebeaver091@gmail.com";
const OWNER_PHONE_INTL = "23273095177"; // Sierra Leone +232, drop leading 0
const FROM = "KK Drinks <onboarding@resend.dev>";

type Item = { slug: string; name: string; qty: number; price: number };

interface OrderPayload {
  customer_name: string;
  phone: string;
  address: string;
  notes?: string | null;
  items: Item[];
  total_leones: number;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not set" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const order = (await req.json()) as OrderPayload;
    if (!order?.customer_name || !order?.phone || !order?.items?.length) {
      return new Response(JSON.stringify({ error: "Invalid order payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const itemsList = order.items
      .map((i) => `${i.qty} × ${i.name} (Le ${i.price * i.qty})`)
      .join("\n");

    const waText = encodeURIComponent(
      `New KK order!\n\nCustomer: ${order.customer_name}\nPhone: ${order.phone}\nAddress: ${order.address}\n` +
        (order.notes ? `Notes: ${order.notes}\n` : "") +
        `\nItems:\n${itemsList}\n\nTotal: Le ${order.total_leones}`,
    );
    const waLink = `https://wa.me/${OWNER_PHONE_INTL}?text=${waText}`;
    const callLink = `tel:${order.phone}`;

    const itemsHtml = order.items
      .map(
        (i) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;">${escape(i.name)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:center;">${i.qty}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right;">Le ${i.price * i.qty}</td>
        </tr>`,
      )
      .join("");

    const html = `
<!doctype html>
<html><body style="margin:0;padding:0;background:#f6f4ef;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#1a1410;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <div style="background:linear-gradient(135deg,#f4a522,#f6c34a);border-radius:14px;padding:18px 22px;color:#1a1410;">
      <div style="font-size:11px;font-weight:800;letter-spacing:.25em;">KK DRINKS · NEW ORDER</div>
      <div style="font-family:Georgia,serif;font-size:28px;font-weight:700;margin-top:6px;">Le ${order.total_leones} · ${order.items.reduce((a, b) => a + b.qty, 0)} bottle${order.items.reduce((a, b) => a + b.qty, 0) > 1 ? "s" : ""}</div>
    </div>

    <div style="background:#fff;border-radius:14px;padding:20px;margin-top:16px;box-shadow:0 4px 16px rgba(0,0,0,.05);">
      <div style="font-size:11px;font-weight:800;letter-spacing:.2em;color:#777;">CUSTOMER</div>
      <div style="font-size:18px;font-weight:600;margin-top:4px;">${escape(order.customer_name)}</div>
      <div style="margin-top:6px;color:#444;">📞 ${escape(order.phone)}</div>
      <div style="margin-top:4px;color:#444;">📍 ${escape(order.address)}</div>
      ${order.notes ? `<div style="margin-top:10px;padding:10px;background:#faf7f0;border-radius:8px;color:#555;font-style:italic;">"${escape(order.notes)}"</div>` : ""}
    </div>

    <div style="background:#fff;border-radius:14px;padding:20px;margin-top:16px;box-shadow:0 4px 16px rgba(0,0,0,.05);">
      <div style="font-size:11px;font-weight:800;letter-spacing:.2em;color:#777;margin-bottom:8px;">ITEMS</div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead><tr>
          <th style="text-align:left;padding:8px 12px;color:#999;font-weight:600;border-bottom:2px solid #eee;">Item</th>
          <th style="text-align:center;padding:8px 12px;color:#999;font-weight:600;border-bottom:2px solid #eee;">Qty</th>
          <th style="text-align:right;padding:8px 12px;color:#999;font-weight:600;border-bottom:2px solid #eee;">Total</th>
        </tr></thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot><tr>
          <td colspan="2" style="padding:14px 12px;font-weight:700;font-size:16px;">Total</td>
          <td style="padding:14px 12px;font-weight:700;font-size:16px;text-align:right;">Le ${order.total_leones}</td>
        </tr></tfoot>
      </table>
    </div>

    <div style="text-align:center;margin-top:20px;">
      <a href="${waLink}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:999px;margin:6px;">💬 Open in WhatsApp</a>
      <a href="${callLink}" style="display:inline-block;background:#1a1410;color:#fff;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:999px;margin:6px;">📞 Call customer</a>
    </div>

    <p style="text-align:center;color:#999;font-size:12px;margin-top:24px;">KK Drinks · Made in Sierra Leone</p>
  </div>
</body></html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [OWNER_EMAIL],
        subject: `🥤 New KK order · Le ${order.total_leones} from ${order.customer_name}`,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error:", data);
      return new Response(JSON.stringify({ error: "send failed", detail: data }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data.id, waLink }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("notify-order error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
