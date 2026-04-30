-- Migration: Security Guarantee features table
-- Created: 2026-04-30
-- Status: PENDING - Run after Supabase project is set up
--
-- This table stores the security guarantee features displayed on the homepage.
-- Currently the data is hardcoded in src/data/site.ts.
-- After connecting Supabase, update the SecurityGuarantee component to fetch from here.

CREATE TABLE IF NOT EXISTS security_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'shield',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE security_features ENABLE ROW LEVEL SECURITY;

-- Anyone can read active features
CREATE POLICY "Public read active security features"
  ON security_features FOR SELECT
  USING (is_active = true);

-- Only admins can manage
CREATE POLICY "Admin full access on security features"
  ON security_features FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Seed initial data (matches current hardcoded content)
INSERT INTO security_features (title, description, icon, sort_order)
VALUES
  ('Identidad Verificada', 'Todos nuestros cuidadores pasan por un proceso de verificación de identidad con documentos oficiales y revisión de antecedentes.', 'shield', 1),
  ('Seguro de Cobertura', 'Contamos con seguro que cubre incidentes durante el servicio, protegiendo a tu mascota, tu hogar y al cuidador.', 'umbrella', 2),
  ('Protocolo de Emergencia', 'Tenemos un plan de acción claro ante cualquier eventualidad: contacto inmediato, veterinario de confianza y seguimiento 24/7.', 'alert-circle', 3),
  ('Pagos Seguros', 'Todas las transacciones se procesan a través de la plataforma con encriptación SSL. Nunca compartas datos bancarios directamente.', 'lock', 4)
ON CONFLICT DO NOTHING;

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_security_features_updated_at
  BEFORE UPDATE ON security_features
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
