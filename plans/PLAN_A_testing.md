# Plan A: Testing + Polish

## Objetivo
Verificar que el sistema funcione completamente: registro → login → booking → review

---

## Tareas

### 1. Seed de Datos de Prueba

```bash
# Insertar caregivers de prueba en Supabase
INSERT INTO profiles (id, full_name, phone, address) VALUES 
  ('uuid-1', 'Daniela Morales', '+502 3476-8028', 'Antigua Guatemala'),
  ('uuid-2', 'Anaidé Ponce', '+502 3476-8028', 'Antigua Guatemala'),
  ('uuid-3', 'Wendy Calderón', '+502 3476-8028', 'Antigua Guatemala'),
  ('uuid-4', 'Lourdes Arévalo', '+502 3476-8028', 'Antigua Guatemala');

INSERT INTO caregivers (user_id, bio, services, hourly_rate, rating, is_available) VALUES
  ('uuid-1', 'Fundadora y Homie original', ARRAY['Pet Sitting', 'Daycare'], 125.00, 5.0, true),
  ('uuid-2', 'Me encantan los animales', ARRAY['Pet Sitting', 'Homestay'], 95.00, 5.0, true),
  ('uuid-3', 'Me gusta conocer las necesidades de cada perro', ARRAY['Dog Walks', 'Home Visits'], 45.00, 4.0, true),
  ('uuid-4', 'Me gusta ver el amor incondicional que nos dan', ARRAY['Pet Sitting', 'Home Visits'], 45.00, 5.0, true);
```

### 2. Testing del Flujo de Usuario

**2.1 Registro**
- [ ] Ir a `/es/register`
- [ ] Crear cuenta como cliente
- [ ] Verificar perfil creado en Supabase

**2.2 Login**
- [ ] Ir a `/es/login`
- [ ] Iniciar sesión con credenciales creadas
- [ ] Verificar redirección a `/es/dashboard`

**2.3 Gestionar Mascotas**
- [ ] Ir a `/es/dashboard/pets`
- [ ] Agregar nueva mascota
- [ ] Verificar que aparece en la lista

**2.4 Realizar Reserva**
- [ ] Ir a `/es/services` o usar BookingForm
- [ ] Seleccionar servicio
- [ ] Seleccionar fechas
- [ ] Seleccionar cuidador
- [ ] Confirmar reserva
- [ ] Verificar booking en `/es/dashboard/bookings`

**2.5 Dejar Reseña**
- [ ] Ir a `/es/dashboard/reviews`
- [ ] Para booking completado, dejar reseña
- [ ] Verificar que aparece en `/es/reviews`

### 3. Testing del Flujo de Cuidador

**3.1 Registro como Cuidador**
- [ ] Ir a `/es/caregiver/register`
- [ ] Completar perfil de cuidador
- [ ] Verificar en tabla `caregivers`

**3.2 Dashboard de Cuidador**
- [ ] Ir a `/es/caregiver/dashboard`
- [ ] Ver stats (bookings, earnings)

**3.3 Gestionar Bookings**
- [ ] Aceptar/reservar booking pendiente
- [ ] Marcar como "en progreso"
- [ ] Completar booking

### 4. Edge Functions Testing

```bash
# Test get-caregivers
curl "https://powdmwsuuceobchadavg.supabase.co/functions/v1/get-caregivers"

# Test get-availability (con datos reales)
curl -X POST "https://powdmwsuuceobchadavg.supabase.co/functions/v1/get-availability" \
  -H "Content-Type: application/json" \
  -d '{"caregiver_id": "uuid-1", "start_date": "2026-05-01", "end_date": "2026-05-05"}'

# Test create-booking (requiere auth)
# Usar el Flow de la app web para testing completo
```

### 5. Chat Widget Testing

- [ ] Abrir ChatWidget en cualquier página
- [ ] Enviar mensaje a otro usuario
- [ ] Verificar mensajes en `/es/dashboard/messages`
- [ ] Verificar real-time updates

### 6. Ajustes Visuales

**6.1 Mobile Testing**
- [ ] Probar en dispositivo real o DevTools
- [ ] Verificar touch targets >= 44px
- [ ] Verificar responsive images con srcset
- [ ] Verificar hamburger menu funciona

**6.2 Dark Mode**
- [ ] Toggle dark mode en Header
- [ ] Verificar todos los componentes
- [ ] Verificar contraste WCAG

### 7. i18n Testing

- [ ] LanguageSwitcher en Header
- [ ] Cambiar a EN
- [ ] VerificarTodas las páginas en inglés
- [ ] Volver a ES
- [ ] Verificar回来 en español

---

## Verificación Final

```bash
npm run build  # Debe pasar sin errores
npm run dev   # Servidor local funciona
```

---

## Notas

- Admin credentials: `admin@homies.pets` / `homiesadmin123`
- Para test de pagos, usar sandbox de Wompi (future)
- Todas las páginas están en `/es/` y `/en/`