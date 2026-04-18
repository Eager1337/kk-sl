import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import { DRINKS, type Drink } from "@/data/drinks";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type CartItem = { slug: string; qty: number };

const orderSchema = z.object({
  customer_name: z.string().trim().min(2, "Name is too short").max(100),
  phone: z.string().trim().min(6, "Phone looks too short").max(30),
  address: z.string().trim().min(4, "Add a delivery address").max(300),
  notes: z.string().trim().max(500).optional(),
});

interface OrderDialogProps {
  initialDrink?: Drink;
  trigger?: React.ReactNode;
}

export const OrderDialog = ({ initialDrink, trigger }: OrderDialogProps) => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(
    initialDrink ? [{ slug: initialDrink.slug, qty: 1 }] : [],
  );
  const [form, setForm] = useState({ customer_name: "", phone: "", address: "", notes: "" });

  const setQty = (slug: string, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.slug === slug);
      if (qty <= 0) return prev.filter((c) => c.slug !== slug);
      if (existing) return prev.map((c) => (c.slug === slug ? { ...c, qty } : c));
      return [...prev, { slug, qty }];
    });
  };
  const total = cart.reduce((sum, c) => {
    const d = DRINKS.find((x) => x.slug === c.slug);
    return sum + (d ? d.price * c.qty : 0);
  }, 0);

  const submit = async () => {
    const parsed = orderSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (cart.length === 0) {
      toast.error("Add at least one drink");
      return;
    }
    setSubmitting(true);
    const items = cart.map((c) => {
      const d = DRINKS.find((x) => x.slug === c.slug)!;
      return { slug: d.slug, name: d.name, qty: c.qty, price: d.price };
    });
    const orderBody = {
      customer_name: parsed.data.customer_name,
      phone: parsed.data.phone,
      address: parsed.data.address,
      notes: parsed.data.notes || null,
      items,
      total_leones: total,
    };
    const { error } = await supabase.from("orders").insert(orderBody);
    if (error) {
      setSubmitting(false);
      toast.error("Could not place order. Please try again.");
      return;
    }
    // Fire-and-forget owner notification (email + WhatsApp link)
    supabase.functions
      .invoke("notify-order", { body: orderBody })
      .catch((e) => console.warn("notify-order failed", e));
    setSubmitting(false);
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setCart(initialDrink ? [{ slug: initialDrink.slug, qty: 1 }] : []);
    setForm({ customer_name: "", phone: "", address: "", notes: "" });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setTimeout(reset, 300); }}>
      <DialogTrigger asChild>
        {trigger ?? <button className="btn-brush">Order Now</button>}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="mx-auto h-16 w-16 text-[hsl(var(--leaf))]" />
            <DialogTitle className="display text-3xl">Order placed!</DialogTitle>
            <p className="text-muted-foreground">
              Thank you. Our team will call <span className="font-semibold text-foreground">{form.phone}</span> shortly to confirm delivery.
            </p>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="display text-2xl flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" /> Place an order
              </DialogTitle>
              <DialogDescription>Pay on delivery in Sierra Leonean Leones (Le). We'll call to confirm.</DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <p className="eyebrow text-muted-foreground">Drinks</p>
              <div className="space-y-2">
                {DRINKS.map((d) => {
                  const item = cart.find((c) => c.slug === d.slug);
                  const qty = item?.qty ?? 0;
                  return (
                    <div key={d.slug} className="flex items-center gap-3 rounded-lg border border-border bg-white p-2">
                      <img src={d.image} alt={d.name} className="h-12 w-12 object-contain" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{d.short}</div>
                        <div className="text-xs text-muted-foreground">{d.volume} · Le {d.price}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button type="button" size="icon" variant="outline" className="h-7 w-7" onClick={() => setQty(d.slug, qty - 1)}>
                          {qty <= 1 ? <Trash2 className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                        </Button>
                        <span className="w-6 text-center text-sm tabular-nums">{qty}</span>
                        <Button type="button" size="icon" variant="outline" className="h-7 w-7" onClick={() => setQty(d.slug, qty + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="display text-xl">Le {total}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" maxLength={100} value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" maxLength={30} placeholder="+232 …" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="addr">Delivery area</Label>
                  <Input id="addr" maxLength={300} placeholder="Freetown, …" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea id="notes" maxLength={500} rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
            </div>

            <Button onClick={submit} disabled={submitting || cart.length === 0} size="lg" className="w-full">
              {submitting ? "Placing order…" : `Place order · Le ${total}`}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
