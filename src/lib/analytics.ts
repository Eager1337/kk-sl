import { supabase } from "@/integrations/supabase/client";

export type AnalyticsEventType =
  | "page_view"
  | "add_to_cart"
  | "chat_open"
  | "wholesale_submit"
  | "order_submit"
  | "checkout_start";

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  path: string;
  label?: string | null;
  value?: number | null;
  meta?: Record<string, unknown> | null;
}

const SESSION_KEY = "kk_session_id";

/** Stable per-browser session id used to roughly de-duplicate visitors. */
function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

/**
 * Fire-and-forget analytics tracking. Writes to the Supabase `analytics_events`
 * table. Never throws — analytics must never break the UI.
 */
export async function track(
  type: AnalyticsEventType,
  opts: { label?: string | null; value?: number | null; meta?: Record<string, unknown> | null } = {},
): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    await supabase.from("analytics_events").insert({
      type,
      path: window.location.pathname,
      label: opts.label ?? null,
      value: opts.value ?? null,
      meta: opts.meta ?? null,
      session_id: getSessionId(),
      referrer: document.referrer || null,
    });
  } catch (err) {
    // Swallow — analytics should be invisible to the user.
    console.log("[v0] analytics track failed", err);
  }
}
