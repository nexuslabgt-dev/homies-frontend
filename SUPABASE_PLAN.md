# Plan Supabase - Homies Pets

## Visión General
Agregar backend a Astro para manejar: usuarios, bookings, mensajería, y pagos.

---

## Tech Stack Complementario
- **Frontend**: Astro (existente)
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Hosting**: Mantener en Vercel/Netlify

---

## 1. Schema de Base de Datos

### Tablas

```sql
-- Perfiles de usuario (extiende auth.users)
create table profiles (
  id uuid primary key references auth.users(id),
  full_name text not null,
  phone text,
  avatar_url text,
  address text,
  city text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Cuidadores (extensión de profiles)
create table caregivers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references profiles(id),
  bio text,
  experience text,
  services text[] not null default '{}',
  hourly_rate numeric,
  rating numeric default 0,
  review_count integer default 0,
  is_available boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Mascotas
create table pets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  name text not null,
  species text not null,
  breed text,
  age integer,
  weight numeric,
  temperament text,
  medical_notes text,
  photo_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Servicios disponibles
create table services (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  base_price numeric not null,
  price_unit text not null,
  duration_minutes integer,
  icon text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Bookings
create table bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id),
  caregiver_id uuid not null references caregivers(id),
  service_id uuid not null references services(id),
  pet_id uuid not null references pets(id),
  start_date timestamptz not null,
  end_date timestamptz,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  total_price numeric,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Reviews
create table reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references bookings(id),
  author_id uuid not null references profiles(id),
  caregiver_id uuid not null references caregivers(id),
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now()
);

-- Mensajes (chat simple)
create table messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references profiles(id),
  receiver_id uuid not null references profiles(id),
  content text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Newsletter subscribers
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  is_active boolean default true,
  subscribed_at timestamptz default now()
);
```

---

## 2. Auth (Supabase Auth)

- **Proveedores**: Email/password + Google
- **RLS policies**:
  - Clients ven solo sus bookings y mascotas
  - Caregivers ven bookings asignados a ellos
  - Admin ve todo

```sql
-- Ejemplo RLS para bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients see own bookings"
ON bookings FOR SELECT
USING (auth.uid() = client_id);
```

---

## 3. Edge Functions (Server-side)

Funciones necesarias:

| Función | Descripción |
|---------|-------------|
| `POST /bookings` | Crear reserva (validar disponibilidad) |
| `GET /caregivers` | Listar cuidadores con filtros |
| `POST /messages` | Enviar mensaje |
| `GET /availability` | Consultar fechas disponibles |
| `POST /payments/webhook` | Procesar webhooks de pago |

---

## 4. Integración con Astro

### Archivos a crear/modificar

```
src/
├── lib/
│   ├── supabase.ts       # Cliente Supabase
│   └── types.ts          # Tipos de la DB
├── components/
│   ├── BookingForm.astro
│   ├── LoginForm.astro
│   ├── CaregiverCard.astro
│   └── ChatWidget.astro
├── pages/
│   ├── login.astro
│   ├── register.astro
│   ├── dashboard/
│   │   ├── index.astro      # Panel cliente
│   │   ├── bookings.astro
│   │   ├── pets.astro
│   │   └── messages.astro
│   ├── caregiver/
│   │   ├── register.astro
│   │   └── dashboard.astro
│   └── api/
│       ├── bookings.ts      # Edge Function
│       ├── messages.ts
│       └── webhooks/
│           └── payments.ts
```

### Cliente Supabase

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 5. Variables de Entorno

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 6. Flujo de Booking

```
Cliente → Select Service → Select Dates → Select Caregiver → Confirm → Payment → Confirmation Email
```

1. Cliente llena formulario en `/contact` o sección servicios
2. Edge Function valida disponibilidad
3. Crea booking con status "pending"
4. Procesa pago (Wompi/PayPal)
5. Confirma booking → status "confirmed"
6. Email de confirmación a ambos

---

## 7. Prioridad de Implementación

### Fase 1: Auth + Perfiles (1-2 días)
- [ ] Crear proyecto Supabase
- [ ] Configurar Auth (email + Google)
- [ ] Crear tablas (profiles, caregivers)
- [ ] Login/Register pages

### Fase 2: Booking Core (2-3 días)
- [ ] Tablas (pets, services, bookings)
- [ ] BookingForm component
- [ ] Edge Function para crear bookings
- [ ] Dashboard básico del cliente

### Fase 3: Messaging + Reviews (1-2 días)
- [ ] Tabla messages
- [ ] Chat widget básico
- [ ] Reviews después de booking completado

### Fase 4: Pagos (2-3 días)
- [ ] Integración Wompi (locale GT)
- [ ] Webhooks
- [ ] Historial de transactions

---

## 8. Comandos Setup Supabase

```bash
# Login
npx supabase login

# Link proyecto
npx supabase link --project-ref your-project-ref

# Push schema (crear tables.sql y ejecutar)
npx supabase db push

# Start local (para desarrollo)
npx supabase start
```

---

## 9. Coste Estimado

| Servicio | Free Tier | Uso estimado |
|----------|-----------|---------------|
| Supabase | 500MB DB, 50K usuarios | Suficiente para empezar |
| Vercel | 100GB bandwidth/mes | Suficiente |
| Wompi | 2.9% + Q1.50 por transacción | Solo cuando haya ventas |

**Total mensual inicial: Q0**

---

## Próximos Pasos

1. Crear cuenta en [supabase.com](https://supabase.com)
2. Nuevo proyecto → nombre "homies-pets"
3. Copiar Project URL y anon key a `.env`
4. Ejecutar SQL del schema
5. Empezar con Auth (login/register)