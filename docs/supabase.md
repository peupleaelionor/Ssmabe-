# Supabase Setup — Songi Songi Mabé

## Variables d'environnement

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Note importante : SDK non installé

Le package `@supabase/supabase-js` n'est pas dans `package.json`.
Le client actuel (`src/lib/supabase/client.ts`) utilise `fetch` natif et
implémente directement l'API REST Supabase.

Pour brancher le SDK officiel :
1. `npm install @supabase/supabase-js`
2. Remplacer `supabaseServerInsert()` par :
   ```typescript
   import { createClient } from "@supabase/supabase-js";
   const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
   const { data, error } = await supabase.from(table).insert(record).select().single();
   ```

## Tables à créer

### 1. beta_signups — Phase 1 (bêta)
Voir `supabase/beta-schema.sql` — coller dans Supabase SQL Editor.

```sql
create table public.beta_signups (
  id          uuid primary key default gen_random_uuid(),
  pseudo      text not null check (length(pseudo) >= 2 and length(pseudo) <= 50),
  country     text not null,
  city        text,
  language    text not null,
  intention   text not null,
  contact     text,        -- email ou tél, jamais logué en clair
  created_at  timestamptz not null default now()
);
```

> **`contact` est nullable — choix volontaire et assumé.** Le contact (email /
> WhatsApp) est **optionnel** : on ne force jamais un identifiant pour rejoindre
> la bêta, par cohérence avec la promesse *privacy-first*. Le formulaire
> (`beta-form.tsx`) n'exige que `pseudo`, `country`, `language`, `intention` ;
> la validation serveur (`/api/beta`) et `lib/mabe/beta.ts` n'acceptent un
> `contact` que s'il est fourni **et** valide (email ou 8+ chiffres).
> ⚠️ Ne **pas** passer cette colonne en `not null` : une inscription sans
> contact échouerait. Le schéma de référence est **toujours**
> `supabase/beta-schema.sql`.

### 2. profiles — Phase 2
```sql
create table public.profiles (
  id          uuid primary key references auth.users(id),
  pseudo      text not null,
  country     text not null,
  city        text,
  language    text not null,
  trust_score int not null default 50,
  trust_level text not null default 'new',
  is_banned   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
```

### 3. call_sessions — Phase 2
```sql
create table public.call_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_a_id   uuid not null references public.profiles(id),
  user_b_id   uuid not null references public.profiles(id),
  mode        text not null,
  country_a   text not null,
  country_b   text not null,
  status      text not null default 'active',
  started_at  timestamptz not null default now(),
  ended_at    timestamptz,
  duration    int not null default 0,
  credits_used int not null default 0,
  consent_a   text not null default 'pending',
  consent_b   text not null default 'pending',
  flagged     boolean not null default false
);
```

### 4. voice_matches — Phase 3
```sql
create table public.voice_matches (
  id          uuid primary key default gen_random_uuid(),
  user_a_id   uuid not null references public.profiles(id),
  user_b_id   uuid not null references public.profiles(id),
  session_id  uuid references public.call_sessions(id),
  match_score int not null,
  mode        text not null,
  matched_at  timestamptz not null default now()
);
```

## RLS (Row Level Security)

Toutes les tables ont RLS activé. Politiques :
- `beta_signups` : accès uniquement via `service_role` (pas d'accès public)
- `profiles` : lecture publique (pseudo, pays), écriture propriétaire uniquement
- `call_sessions` : lecture propriétaire uniquement
- `voice_matches` : aucun accès public

## Comment brancher la bêta

1. Créer un projet Supabase sur [supabase.com](https://supabase.com)
2. Copier les clés dans `.env.local`
3. Exécuter `supabase/beta-schema.sql` dans **SQL Editor**
4. Le formulaire bêta envoie automatiquement à Supabase via `POST /api/beta`
5. En cas d'erreur réseau → fallback automatique localStorage

## Flux inscription bêta

```
Formulaire bêta
  → POST /api/beta
    → validation champs
    → isSupabaseConfigured() ?
      → Oui : supabaseServerInsert("beta_signups", data) → Supabase
      → Non  : { ok: true, local: true }
  → Résultat OK : signup sauvegardé
  → Résultat local: true : persistToLocalStorage(signup)
  → Erreur réseau : fallback persistToLocalStorage(signup)
```
