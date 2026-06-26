-- ============================================================
-- Table beta_signups pour Songi Songi Mabé
-- Coller dans Supabase SQL Editor
-- ============================================================

create table if not exists public.beta_signups (
  id          uuid primary key default gen_random_uuid(),
  pseudo      text not null check (length(pseudo) >= 2 and length(pseudo) <= 50),
  country     text not null,
  city        text,
  language    text not null,
  intention   text not null,
  contact     text,
  created_at  timestamptz not null default now()
);

-- Index pour analytics rapides
create index if not exists beta_signups_country_idx on public.beta_signups (country);
create index if not exists beta_signups_created_at_idx on public.beta_signups (created_at);

-- RLS : lecture uniquement par service_role (admin)
alter table public.beta_signups enable row level security;

create policy "service_role_all" on public.beta_signups
  for all using (auth.role() = 'service_role');
