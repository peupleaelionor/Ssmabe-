# Clefs API — guide d'insertion (Vercel → Settings → Environment Variables)

Le code est déjà câblé : chaque intégration **s'active seule** dès que sa clef
existe, et retombe proprement en mode local sinon. Après chaque ajout de
variable : **redéployer**, puis vérifier sur `https://ssmabe.vercel.app/api/health`
(la route affiche `configured` / `missing` par intégration — jamais les valeurs).

## 1. Supabase — inscriptions bêta + messages contact (priorité n°1)

| Variable | Où la trouver | Portée |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | idem → anon public key | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | idem → service_role key | **SERVEUR UNIQUEMENT — jamais de préfixe NEXT_PUBLIC_** |

Tables à créer (Supabase → SQL Editor, coller tel quel) :

```sql
create table if not exists waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  email text not null,
  phone text,
  country text not null,
  city text,
  language text not null,
  profile_type text not null,
  desired_community text,
  goal text,
  message text,
  source text not null default 'direct',
  consent boolean not null default true,
  status text not null default 'pending'
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text,
  message text not null
);

-- RLS : tout est fermé côté client ; seuls les Route Handlers (service role) écrivent.
alter table waitlist_entries enable row level security;
alter table contact_messages enable row level security;
```

Effet immédiat : le formulaire `/beta` et `/contact` écrivent en base au lieu
du repli localStorage. `/api/health` → `"supabase": "configured"`.

## 2. Voix — LiveKit (recommandé) ou Agora

| Variable | Où la trouver | Portée |
|---|---|---|
| `LIVEKIT_URL` | LiveKit Cloud → Project → URL (wss://…) | Serveur |
| `LIVEKIT_API_KEY` | LiveKit Cloud → Keys | Serveur |
| `LIVEKIT_API_SECRET` | idem | Serveur |
| `VOICE_PROVIDER` | `livekit` ou `agora` (défaut : livekit) | Serveur |

Ou Agora :

| Variable | Où | Portée |
|---|---|---|
| `AGORA_APP_ID` | Agora Console → Project | Serveur |
| `AGORA_APP_CERTIFICATE` | idem (obligatoire en prod — sinon mode « insecure ») | Serveur |

Puis activer l'UI d'appels : `NEXT_PUBLIC_FLAG_CALLS=1`.

## 3. Contact direct (boutons Appel / WhatsApp de la home)

| Variable | Format |
|---|---|
| `NEXT_PUBLIC_CONTACT_PHONE_NUMBER` | `+243XXXXXXXXX` |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_NUMBER` | `243XXXXXXXXX` (sans +) |

## 4. Analytics — PostHog (optionnel)

| Variable | Où |
|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog → Project Settings → API Key |

## 5. Domaine canonique (quand tu brancheras songisongi.app)

| Variable | Valeur |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://songisongi.app` |

Une seule variable met à jour d'un coup : metadataBase, sitemap, robots,
JSON-LD et APP_URL.

## 6. Feature flags par variable (aucun commit nécessaire)

`NEXT_PUBLIC_FLAG_CALLS`, `NEXT_PUBLIC_FLAG_WHATSAPP`, `NEXT_PUBLIC_FLAG_PAYMENTS`,
`NEXT_PUBLIC_FLAG_AUTH`, `NEXT_PUBLIC_FLAG_MOBILE_MONEY`, `NEXT_PUBLIC_FLAG_CIRCLES`,
`NEXT_PUBLIC_FLAG_BETA`, `NEXT_PUBLIC_FLAG_MAINTENANCE` — valeurs `1`/`0`.
Les variables `NEXT_PUBLIC_*` sont figées au build : un redéploiement les applique.

## Check final après insertion

1. `GET /api/health` → toutes les intégrations voulues en `configured`.
2. `GET /api/voice/config` → provider + prêt (si voix configurée).
3. Soumettre `/beta` avec un email test → la ligne apparaît dans
   Supabase → Table Editor → `waitlist_entries`.
4. Aucune de ces routes n'expose jamais une valeur de clef.
