// Sends an email notification to the KK owner whenever a wholesale lead is submitted.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OWNER_EMAIL = "ebeaver091@gmail.com";
const OWNER_PHONE_INTL = "23273095177";
const FROM = "KK Drinks <onboarding@resend.dev>";

interface LeadPayload {
  name: string;
  business: string;
  city: string;
  phone: string;
  email?: string | null;
  notes?: string | null;
  cases?: number | null;
  drink?: string | null;
  estimate_leones?: number | null;
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

    const lead = (await req.json()) as LeadPayload;
    if (!lead?.name || !lead?.business || !lead?.phone) {
      return new Response(JSON.stringify({ error: "Invalid lead payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const waText = encodeURIComponent(
      `New KK wholesale lead!\n\nName: ${lead.name}\nBusiness: ${lead.business}\nCity: ${lead.city}\nPhone: ${lead.phone}\n` +
        (lead.email ? `Email: ${lead.email}\n` : "") +
        (lead.drink ? `Interested in: ${lead.drink}\n` : "") +
        (lead.cases ? `Cases: ${lead.cases}\n` : "") +
        (lead.estimate_leones ? `Estimate: Le ${lead.estimate_leones}\n` : "") +
        (lead.notes ? `Notes: ${lead.notes}\n` : ""),
    );
    const waLink = `https://wa.me/${OWNER_PHONE_INTL}?text=${waText}`;
    const callLink = `tel:${lead.phone}`;

    const row = (k: string, v: string) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#777;font-weight:600;width:38%;">${k}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;">${v}</td>
      </tr>`;

    const html = `
<!doctype html>
<html><body style="margin:0;padding:0;background:#f6f4ef;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#1a1410;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <div style="background:linear-gradient(135deg,#3aa0c9,#7cc7e0);border-radius:14px;padding:18px 22px;color:#0a2733;">
      <div style="font-size:11px;font-weight:800;letter-spacing:.25em;">KK DRINKS · NEW WHOLESALE LEAD</div>
      <div style="font-family:Georgia,serif;font-size:26px;font-weight:700;margin-top:6px;">${escape(lead.business)}</div>
    </div>

    <div style="background:#fff;border-radius:14px;padding:8px 20px;margin-top:16px;box-shadow:0 4px 16px rgba(0,0,0,.05);">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${row("Contact", escape(lead.name))}
        ${row("Phone", escape(lead.phone))}
        ${row("City / district", escape(lead.city))}
        ${lead.email ? row("Email", escape(lead.email)) : ""}
        ${lead.drink ? row("Interested in", escape(lead.drink)) : ""}
        ${lead.cases ? row("Cases", String(lead.cases)) : ""}
        ${lead.estimate_leones ? row("Estimate", `Le ${lead.estimate_leones.toLocaleString()}`) : ""}
      </table>
      ${lead.notes ? `<div style="margin:12px 0;padding:12px;background:#faf7f0;border-radius:8px;color:#555;font-style:italic;">"${escape(lead.notes)}"</div>` : ""}
    </div>

    <div style="text-align:center;margin-top:20px;">
      <a href="${waLink}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:999px;margin:6px;">Open in WhatsApp</a>
      <a href="${callLink}" style="display:inline-block;background:#1a1410;color:#fff;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:999px;margin:6px;">Call lead</a>
    </div>

    <p style="text-align:center;color:#999;font-size:12px;margin-top:24px;">KK Drinks · Wholesale enquiries</p>
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
        subject: `New KK wholesale lead · ${lead.business} (${lead.city})`,
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
    console.error("notify-lead error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
