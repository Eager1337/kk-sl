-- Orders table for KK Drinks
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  notes text,
  items jsonb not null,
  total_leones integer not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Anyone (anon) can place an order
create policy "anyone can insert orders"
  on public.orders for insert
  to anon, authenticated
  with check (true);

-- No public select/update/delete (owner-side only via service role)
