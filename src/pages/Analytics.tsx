import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Eye, ShoppingCart, MessageCircle, Send, CreditCard, Package, Lock, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { AnalyticsEventType } from "@/lib/analytics";

/* -------------------------------------------------------------------------- */
/* Passcode gate                                                              */
/* -------------------------------------------------------------------------- */

// Override in production by setting VITE_ANALYTICS_PASSCODE.
const PASSCODE = (import.meta.env.VITE_ANALYTICS_PASSCODE as string | undefined) || "kk-admin";
const AUTH_KEY = "kk_analytics_ok";

/* -------------------------------------------------------------------------- */
/* Types + helpers                                                            */
/* -------------------------------------------------------------------------- */

interface EventRow {
  id: string;
  type: string;
  path: string | null;
  label: string | null;
  value: number | null;
  created_at: string;
}

const EVENT_META: Record<AnalyticsEventType, { label: string; Icon: typeof Eye; color: string }> = {
  page_view: { label: "Page views", Icon: Eye, color: "var(--sea)" },
  add_to_cart: { label: "Add to cart", Icon: ShoppingCart, color: "var(--mango)" },
  chat_open: { label: "Chat opens", Icon: MessageCircle, color: "var(--leaf)" },
  wholesale_submit: { label: "Wholesale leads", Icon: Send, color: "var(--berry)" },
  order_submit: { label: "Orders started", Icon: Package, color: "var(--sun)" },
  checkout_start: { label: "Online checkouts", Icon: CreditCard, color: "var(--sea)" },
};

const dayKey = (iso: string) => iso.slice(0, 10);

/* -------------------------------------------------------------------------- */
/* Gate component                                                             */
/* -------------------------------------------------------------------------- */

const Gate = ({ onUnlock }: { onUnlock: () => void }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSCODE) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onUnlock();
    } else {
      setError(true);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--wood))] px-6">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-card p-8 shadow-2xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--sea))/0.12] text-[hsl(var(--sea))]">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="display text-center text-2xl">KK Analytics</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Enter the passcode to view the dashboard.</p>
        <div className="mt-6 space-y-2">
          <Label htmlFor="pass">Passcode</Label>
          <Input
            id="pass"
            type="password"
            autoFocus
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            aria-invalid={error}
          />
          {error && <p className="text-xs text-destructive">Incorrect passcode. Try again.</p>}
        </div>
        <Button type="submit" className="mt-5 w-full">Unlock dashboard</Button>
      </form>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

const RANGE_DAYS = 30;

const Dashboard = () => {
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["analytics-events"],
    queryFn: async (): Promise<EventRow[]> => {
      const since = new Date(Date.now() - RANGE_DAYS * 864e5).toISOString();
      const { data, error } = await supabase
        .from("analytics_events")
        .select("id,type,path,label,value,created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: true })
        .limit(10000);
      if (error) throw error;
      return (data ?? []) as EventRow[];
    },
  });

  const events = useMemo(() => data ?? [], [data]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const e of events) c[e.type] = (c[e.type] ?? 0) + 1;
    return c;
  }, [events]);

  // Daily series across the whole range for the trend chart.
  const series = useMemo(() => {
    const byDay = new Map<string, Record<string, number>>();
    for (let i = RANGE_DAYS - 1; i >= 0; i--) {
      const key = dayKey(new Date(Date.now() - i * 864e5).toISOString());
      byDay.set(key, { day: key } as unknown as Record<string, number>);
    }
    for (const e of events) {
      const key = dayKey(e.created_at);
      const row = byDay.get(key);
      if (row) row[e.type] = ((row[e.type] as number) ?? 0) + 1;
    }
    return Array.from(byDay.values()).map((r) => ({
      day: (r as unknown as { day: string }).day.slice(5),
      views: (r.page_view as number) ?? 0,
      cart: (r.add_to_cart as number) ?? 0,
      leads: (r.wholesale_submit as number) ?? 0,
    }));
  }, [events]);

  const recent = useMemo(() => [...events].reverse().slice(0, 12), [events]);

  const topPages = useMemo(() => {
    const p: Record<string, number> = {};
    for (const e of events) if (e.type === "page_view" && e.path) p[e.path] = (p[e.path] ?? 0) + 1;
    return Object.entries(p).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [events]);

  const orderKeys: AnalyticsEventType[] = [
    "page_view", "add_to_cart", "chat_open", "wholesale_submit", "order_submit", "checkout_start",
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--paper))]">
      <header className="border-b border-border/60 bg-card">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
          <div>
            <h1 className="display text-2xl">KK Analytics</h1>
            <p className="text-xs text-muted-foreground">Store &amp; wholesale interactions · last {RANGE_DAYS} days</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] space-y-8 px-6 py-8">
        {/* KPI cards */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {orderKeys.map((key) => {
            const meta = EVENT_META[key];
            const { Icon } = meta;
            return (
              <div key={key} className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ background: `hsl(${meta.color} / 0.12)`, color: `hsl(${meta.color})` }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mt-3 text-2xl font-bold tabular-nums">{isLoading ? "—" : counts[key] ?? 0}</div>
                <p className="text-xs text-muted-foreground">{meta.label}</p>
              </div>
            );
          })}
        </section>

        {/* Trend chart */}
        <section className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold">Daily activity</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--sea))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--sea))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--mango))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--mango))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} allowDecimals={false} width={40} />
                <RTooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="views" name="Page views" stroke="hsl(var(--sea))" fill="url(#gViews)" strokeWidth={2} />
                <Area type="monotone" dataKey="cart" name="Add to cart" stroke="hsl(var(--mango))" fill="url(#gCart)" strokeWidth={2} />
                <Area type="monotone" dataKey="leads" name="Wholesale leads" stroke="hsl(var(--berry))" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top pages */}
          <section className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold">Top pages</h2>
            {topPages.length === 0 ? (
              <p className="text-sm text-muted-foreground">No page views recorded yet.</p>
            ) : (
              <ul className="space-y-2">
                {topPages.map(([path, n]) => {
                  const max = topPages[0][1] || 1;
                  return (
                    <li key={path} className="flex items-center gap-3">
                      <span className="w-40 truncate text-sm">{path}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-[hsl(var(--sea))]" style={{ width: `${(n / max) * 100}%` }} />
                      </div>
                      <span className="w-10 text-right text-sm tabular-nums text-muted-foreground">{n}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* Recent activity */}
          <section className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold">Recent activity</h2>
            {recent.length === 0 ? (
              <p className="text-sm text-muted-foreground">No activity yet. Events will appear here as visitors use the site.</p>
            ) : (
              <ul className="divide-y divide-border/60">
                {recent.map((e) => {
                  const meta = EVENT_META[e.type as AnalyticsEventType];
                  const Icon = meta?.Icon ?? Eye;
                  return (
                    <li key={e.id} className="flex items-center gap-3 py-2 text-sm">
                      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="font-medium">{meta?.label ?? e.type}</span>
                      {e.label && <span className="truncate text-muted-foreground">· {e.label}</span>}
                      <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                        {new Date(e.created_at).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

const Analytics = () => {
  const [ok, setOk] = useState(() => sessionStorage.getItem(AUTH_KEY) === "1");
  return (
    <>
      <Helmet>
        <title>Analytics · KK Drinks</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      {ok ? <Dashboard /> : <Gate onUnlock={() => setOk(true)} />}
    </>
  );
};

export default Analytics;
