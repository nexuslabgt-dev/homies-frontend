# Homies Pets - Roadmap de Implementación

## Sitio actual
- **Nombre**: Homies Pets - Antigua Guatemala
- **Servicios**: Pet Sitting, Daycare, Dog Walks, Home Visits
- **Servicios próximos**: Homestay, Photography
- **Equipo**: 4 cuidadoras con perfiles y fotos
- **Tech stack**: Astro 6 + Tailwind CSS 4 + TypeScript

---

## Feature Ideas

### 1. Booking System ⭐
Formulario de reserva que capture:
- Fechas desired (check-in/check-out)
- Servicio seleccionado
- Tipo/mascota (perro, gato, etc), tamaño, raza
- Necesidades especiales (medicación, instrucciones)
- Preferencias del cuidador

### 2. Perfiles de Cuidadores
Página dedicada por cada Homie con:
- Foto y bio ampliada
- Especialidades (ej. perros ansiosos, perros grandes)
- Disponibilidad semanal
- Reseñas y calificaciones
- Idiomas

### 3. Mapa de Zona de Servicio
- Visualizar áreas de cobertura en Antigua Guatemala
- Radio desde centro, barrios cubiertos
- Indicación de "disponible ahora" vs "reservado"

### 4. Garantía de Seguridad
Nueva sección destacando:
- Identidad verificada con documentos
- Seguro de cobertura
- Protocolo de emergencia
- Pagos seguros

### 5. Paquetes y Descuentos
- "5 paseos = Q.200" (vs Q.45/hr individual)
- Descuento por reserva frecuente
- Ofertas para múltiples mascotas
- Descuentos en servicios combinados

### 6. Galería "Antes/Después"
- Especialmente para Photography service
- Transformaciones de grooming
- Sesiones fotográficas de clientes

### 7. Blog de Tips
Artículos como:
- "10 señales de estrés en tu perro"
- "Qué llevar cuando dejas tu mascota"
- "Cómo preparar a tu gato para su primera guardería"

### 8. Video Testimoniales
- Clientes grabando short video review
- Más auténtico que fotos
- Se puede embeber de TikTok/YouTube

### 9. FAQ Real
Reemplazar los pasos de registro con preguntas reales:
- ¿Qué pasa si mi mascota se enferma?
- ¿Puedo conocer al cuidador antes?
- ¿Qué incluye el servicio de emergencia?
- ¿Cómo funciona el pago?

### 10. Instagram/TikTok Feed
- Mostrar posts recientes de redes sociales
- Demostrar actividad y comunidad
- FOTOS no iconos de redes en footer

### 11. Contador de Disponibilidad
- "3 Homies disponibles este fin de semana"
- "1 hueco para Homestay la próxima semana"
- Crear urgencia y transparencia

---

## Prioridad sugerida

1. **Booking System** - Es el core del negocio
2. **FAQ Real** - Responde dudas y cierra ventas
3. **Perfiles Cuidadores** - Construye confianza
4. **Zona de Servicio** - Establece expectativas
5. **Garantía de Seguridad** - Reduce fricción de primera vez

---

## Notas técnicas
- `src/data/site.ts` contiene todo el contenido centralizado
- `tailwind.config.js` para paleta de colores
- `src/layouts/Base.astro` para Google Fonts y meta tags
- No hay backend actualmente - considerar Netlify Forms para booking