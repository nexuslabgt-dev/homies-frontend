-- =============================================================================
-- Seed de Datos de Prueba - Homies Pets
-- =============================================================================
-- SCHEMA REAL: Basado en supabase/migrations/001_schema.sql
-- IMPORTANTE: SUPABASE_PLAN.md y src/lib/types.ts están DESACTUALIZADOS
-- respecto al schema real de la base de datos.
--
-- ADAPTACIONES AL SEED ORIGINAL:
-- 1. profiles.id tiene FK a auth.users. Se insertan usuarios auth primero.
--    El trigger on_auth_user_created creará automáticamente los perfiles.
-- 2. profiles NO tiene columna 'role' ni 'bio' en el schema real.
-- 3. caregivers.user_id referencia profiles.id (no profile_id).
-- 4. caregivers.services es TEXT[] (no specialties ni service_types).
-- 5. caregivers.rating existe (no average_rating).
-- 6. caregivers.is_available existe (no is_verified).
-- 7. bookings.caregiver_id referencia caregivers.id (no user_id).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Usuarios Auth (trigger auto-crea perfiles)
-- -----------------------------------------------------------------------------
INSERT INTO auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES
  ('b59f99be-8a38-40db-88ed-62d04cdff29b', 'authenticated', 'authenticated', 'daniela@homies.test', '$2a$10$abcdefghijklmnopqrstuuxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Daniela Morales"}'),
  ('9653611e-7bda-4d51-b2da-55367653e882', 'authenticated', 'authenticated', 'anaide@homies.test',  '$2a$10$abcdefghijklmnopqrstuuxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Anaidé Ponce"}'),
  ('227c2bbe-0f69-4bd9-87b0-45da92a05924', 'authenticated', 'authenticated', 'wendy@homies.test',   '$2a$10$abcdefghijklmnopqrstuuxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Wendy Calderón"}'),
  ('ae22d6f7-79fb-4073-b364-cf1b3a8b2f63', 'authenticated', 'authenticated', 'lourdes@homies.test', '$2a$10$abcdefghijklmnopqrstuuxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Lourdes Arévalo"}')
ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 2. Actualizar Perfiles (teléfono y dirección)
-- -----------------------------------------------------------------------------
UPDATE public.profiles SET phone = '+502 3476-8028', address = 'Antigua Guatemala' WHERE id = 'b59f99be-8a38-40db-88ed-62d04cdff29b';
UPDATE public.profiles SET phone = '+502 3476-8028', address = 'Antigua Guatemala' WHERE id = '9653611e-7bda-4d51-b2da-55367653e882';
UPDATE public.profiles SET phone = '+502 3476-8028', address = 'Antigua Guatemala' WHERE id = '227c2bbe-0f69-4bd9-87b0-45da92a05924';
UPDATE public.profiles SET phone = '+502 3476-8028', address = 'Antigua Guatemala' WHERE id = 'ae22d6f7-79fb-4073-b364-cf1b3a8b2f63';

-- -----------------------------------------------------------------------------
-- 3. Cuidadores
-- -----------------------------------------------------------------------------
INSERT INTO public.caregivers (
  id,
  user_id,
  bio,
  services,
  hourly_rate,
  rating,
  is_available
) VALUES
  ('9481ce05-9246-4455-95a4-67e63043fe43', 'b59f99be-8a38-40db-88ed-62d04cdff29b', 'Fundadora y Homie original',                ARRAY['Pet Sitting', 'Daycare'],     125.00, 5.0, true),
  ('5e3d0805-38da-4973-ad1d-3806e5d5f369', '9653611e-7bda-4d51-b2da-55367653e882', 'Me encantan los animales',                  ARRAY['Pet Sitting', 'Homestay'],    95.00,  5.0, true),
  ('2ea64fe7-4232-46c1-867c-f3f34fb5df8c', '227c2bbe-0f69-4bd9-87b0-45da92a05924', 'Me gusta conocer las necesidades de cada perro', ARRAY['Dog Walks', 'Home Visits'],   45.00,  4.0, true),
  ('d31bbf58-6d77-45ec-a51d-7012d5128b87', 'ae22d6f7-79fb-4073-b364-cf1b3a8b2f63', 'Me gusta ver el amor incondicional que nos dan', ARRAY['Pet Sitting', 'Home Visits'], 45.00,  5.0, true)
ON CONFLICT (id) DO NOTHING;
