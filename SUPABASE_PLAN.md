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
profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  role TEXT CHECK (role IN ('client', 'caregiver', 'admin')),
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  address TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
)

-- Cuidadores (extensión de profiles)
caregivers (
  profile_id UUID PRIMARY KEY REFERENCES profiles,
  specialties TEXT[],
  availability JSONB,
  hourly_rate DECIMAL,
  service_types TEXT[],
  is_verified BOOLEAN DEFAULT false,
  average_rating DECIMAL
)

-- Mascotas
pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles,
  name TEXT,
  type TEXT CHECK (type IN ('dog', 'cat', 'bird', 'other')),
  breed TEXT,
  size TEXT CHECK (size IN ('small', 'medium', 'large')),
  age_months INTEGER,
  notes TEXT,
  photo_url TEXT
)

-- Servicios disponibles
services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  description TEXT,
  price_cents INTEGER,
  duration_minutes INTEGER,
  is_active BOOLEAN DEFAULT true
)

-- Bookings
bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES profiles,
  caregiver_id UUID REFERENCES caregivers,
  service_id UUID REFERENCES services,
  pet_id UUID REFERENCES pets,
  start_date DATE,
  end_date DATE,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_price DECIMAL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
)

-- Reviews
reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
)

-- Mensajes (chat simple)
messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES profiles,
  receiver_id UUID REFERENCES profiles,
  content TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
)
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