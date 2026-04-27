-- Fix services policy for seeding (allow INSERT without auth for initial seed)
-- This is needed because services need to be seeded before users can authenticate

CREATE POLICY "Services can be inserted by anyone for seeding"
    ON public.services FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow anon to read services (for public display)
CREATE POLICY "Services are viewable by everyone"
    ON public.services FOR SELECT
    TO anon
    USING (true);

-- ============================================
-- SEED DATA: Services (only if table is empty)
-- ============================================

INSERT INTO public.services (name, description, base_price, price_unit, duration_minutes, icon)
SELECT 'Pet Sitting', 'Your pet stays in the comfort of their own home while we provide love and care', 125.00, 'night', NULL, '🏠'
WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE name = 'Pet Sitting');

INSERT INTO public.services (name, description, base_price, price_unit, duration_minutes, icon)
SELECT 'Daycare', 'Your pet spends the day at our home with plenty of play and socialization', 35.00, 'day', NULL, '☀️'
WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE name = 'Daycare');

INSERT INTO public.services (name, description, base_price, price_unit, duration_minutes, icon)
SELECT 'Homestay', 'Your pet stays at our home like part of the family', 95.00, 'day', NULL, '❤️'
WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE name = 'Homestay');

INSERT INTO public.services (name, description, base_price, price_unit, duration_minutes, icon)
SELECT 'Dog Walks', 'Individual or group walks with lots of adventure and exercise', 45.00, 'hour', 60, '🦮'
WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE name = 'Dog Walks');

INSERT INTO public.services (name, description, base_price, price_unit, duration_minutes, icon)
SELECT 'Home Visits', 'Quick check-ins for feeding, play, and companionship', 45.00, 'hour', 30, '🚶'
WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE name = 'Home Visits');

INSERT INTO public.services (name, description, base_price, price_unit, duration_minutes, icon)
SELECT 'Photography', 'Professional pet photoshoot to capture your furry friend''s personality', 350.00, 'session', NULL, '📷'
WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE name = 'Photography');