-- KK Drinks · analytics events + wholesale leads + order payment status

-- ----------------------------------------------------------------------------
-- analytics_events: lightweight first-party event tracking
-- ----------------------------------------------------------------------------
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  path text not null default '/',
  label text,
  value integer,
  meta jsonb,
  session_id text,
  referrer text,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_type_idx on public.analytics_events (type);
create index if not exists analytics_events_created_idx on public.analytics_events (created_at);

alter table public.analytics_events enable row level security;

-- Anyone can record an event (anon site visitors)
create policy "anyone can insert analytics"
  on public.analytics_events for insert
  to anon, authenticated
  with check (true);

-- Dashboard reads aggregate, non-sensitive event data with the anon key.
-- (The /analytics route is additionally protected by a passcode in the app.)
create policy "anyone can read analytics"
  on public.analytics_events for select
  to anon, authenticated
  using (true);

-- ----------------------------------------------------------------------------
-- leads: wholesale / stockist partnership enquiries
-- ----------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business text not null,
  city text not null,
  phone text not null,
  email text,
  notes text,
  cases integer,
  drink text,
  estimate_leones integer,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Anyone (anon) can submit a wholesale lead
create policy "anyone can insert leads"
  on public.leads for insert
  to anon, authenticated
  with check (true);
-- No public select/update/delete (owner-side only via service role)

-- ----------------------------------------------------------------------------
-- orders: add online-payment tracking columns
-- ----------------------------------------------------------------------------
alter table public.orders add column if not exists payment_status text not null default 'unpaid';
alter table public.orders add column if not exists payment_method text;
alter table public.orders add column if not exists stripe_session_id text;
