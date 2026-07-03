# Schéma base de données futur (Supabase/Postgres)

## Tables prévues
users · profiles · communities · community_members · posts · comments ·
reactions · rooms · messages · creator_profiles · **waitlist_entries** ·
reports · moderation_actions · notifications · events · marketplace_items ·
payments · audit_logs · contact_messages

## waitlist_entries (à créer pour brancher /api/waitlist)
```sql
create table if not exists public.waitlist_entries (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  first_name        text not null,
  email             text not null,
  phone             text,            -- optionnel, jamais affiché
  country           text not null,
  city              text,
  language          text not null,
  profile_type      text not null,
  desired_community text,
  goal              text,
  message           text,
  source            text not null default 'direct',
  consent           boolean not null default false,
  status            text not null default 'pending'
);
create index on public.waitlist_entries (country);
create index on public.waitlist_entries (profile_type);
create index on public.waitlist_entries (created_at);
alter table public.waitlist_entries enable row level security;
create policy "service_role_all" on public.waitlist_entries
  for all using (auth.role() = 'service_role');
```

## RLS futures (principes)
- utilisateur : lit/écrit **son** profil uniquement
- admin (service_role) : lit waitlist, reports, moderation
- membre : lit les communautés dont il est membre
- messages privés : participants uniquement
- reports : admin uniquement
