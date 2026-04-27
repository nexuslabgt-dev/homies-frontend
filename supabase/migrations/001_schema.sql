-- Homies Pets Database Schema
-- Supabase PostgreSQL Migration

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    address TEXT,
    city TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Caregivers table
CREATE TABLE public.caregivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    bio TEXT,
    experience TEXT,
    services TEXT[] NOT NULL DEFAULT '{}',
    hourly_rate DECIMAL(10,2),
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pets table
CREATE TABLE public.pets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    breed TEXT,
    age INTEGER,
    weight DECIMAL(5,2),
    temperament TEXT,
    medical_notes TEXT,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    price_unit TEXT NOT NULL,
    duration_minutes INTEGER,
    icon TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    caregiver_id UUID NOT NULL REFERENCES public.caregivers(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES public.services(id),
    pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    total_price DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL UNIQUE REFERENCES public.bookings(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    caregiver_id UUID NOT NULL REFERENCES public.caregivers(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_caregivers_user_id ON public.caregivers(user_id);
CREATE INDEX idx_caregivers_is_available ON public.caregivers(is_available);
CREATE INDEX idx_pets_owner_id ON public.pets(owner_id);
CREATE INDEX idx_bookings_client_id ON public.bookings(client_id);
CREATE INDEX idx_bookings_caregiver_id ON public.bookings(caregiver_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_dates ON public.bookings(start_date, end_date);
CREATE INDEX idx_reviews_caregiver_id ON public.reviews(caregiver_id);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-create profile on auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE OR REPLACE TRIGGER caregivers_updated_at
    BEFORE UPDATE ON public.caregivers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE OR REPLACE TRIGGER pets_updated_at
    BEFORE UPDATE ON public.pets
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE OR REPLACE TRIGGER bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by all authenticated users"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- Caregivers policies
CREATE POLICY "Caregivers are viewable by all authenticated users"
    ON public.caregivers FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Caregivers can update their own profile"
    ON public.caregivers FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid());

-- Pets policies
CREATE POLICY "Pet owners can view their own pets"
    ON public.pets FOR SELECT
    TO authenticated
    USING (owner_id = auth.uid());

CREATE POLICY "Pet owners can insert their own pets"
    ON public.pets FOR INSERT
    TO authenticated
    WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Pet owners can update their own pets"
    ON public.pets FOR UPDATE
    TO authenticated
    USING (owner_id = auth.uid());

CREATE POLICY "Pet owners can delete their own pets"
    ON public.pets FOR DELETE
    TO authenticated
    USING (owner_id = auth.uid());

-- Services policies
CREATE POLICY "Services are viewable by all"
    ON public.services FOR SELECT
    TO authenticated
    USING (is_active = true);

-- Bookings policies
CREATE POLICY "Clients can view their own bookings"
    ON public.bookings FOR SELECT
    TO authenticated
    USING (client_id = auth.uid());

CREATE POLICY "Caregivers can view their assigned bookings"
    ON public.bookings FOR SELECT
    TO authenticated
    USING (caregiver_id IN (SELECT id FROM public.caregivers WHERE user_id = auth.uid()));

CREATE POLICY "Authenticated users can create bookings"
    ON public.bookings FOR INSERT
    TO authenticated
    WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update their own bookings"
    ON public.bookings FOR UPDATE
    TO authenticated
    USING (client_id = auth.uid());

CREATE POLICY "Caregivers can update their assigned bookings"
    ON public.bookings FOR UPDATE
    TO authenticated
    USING (caregiver_id IN (SELECT id FROM public.caregivers WHERE user_id = auth.uid()));

-- Reviews policies
CREATE POLICY "Reviews are viewable by all"
    ON public.reviews FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Clients can insert reviews only for completed bookings they own"
    ON public.reviews FOR INSERT
    TO authenticated
    WITH CHECK (
        author_id = auth.uid() AND
        booking_id IN (SELECT id FROM public.bookings WHERE client_id = auth.uid() AND status = 'completed')
    );

-- Messages policies
CREATE POLICY "Users can view messages they sent or received"
    ON public.messages FOR SELECT
    TO authenticated
    USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can insert messages they send"
    ON public.messages FOR INSERT
    TO authenticated
    WITH CHECK (sender_id = auth.uid());

-- ============================================
-- SEED DATA: Services
-- ============================================

INSERT INTO public.services (name, description, base_price, price_unit, duration_minutes, icon) VALUES
    ('Pet Sitting', 'Your pet stays in the comfort of their own home while we provide love and care', 125.00, 'night', NULL, '🏠'),
    ('Daycare', 'Your pet spends the day at our home with plenty of play and socialization', 35.00, 'day', NULL, '☀️'),
    ('Homestay', 'Your pet stays at our home like part of the family', 95.00, 'day', NULL, '❤️'),
    ('Dog Walks', 'Individual or group walks with lots of adventure and exercise', 45.00, 'hour', 60, '🦮'),
    ('Home Visits', 'Quick check-ins for feeding, play, and companionship', 45.00, 'hour', 30, '🚶'),
    ('Photography', 'Professional pet photoshoot to capture your furry friend''s personality', 350.00, 'session', NULL, '📷');