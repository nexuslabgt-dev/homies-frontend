# Plan B: Features Nuevas

## Objetivo
Implementar features adicionales después de testing exitoso

---

## Features

### 1. Instagram/TikTok Feed Embed ✅

**Archivo:** `src/components/sections/InstagramFeed.astro`

```astro
---
// Embed recent posts from Instagram/TikTok
// Option 1: SnapWidget - https://www.snapwidget.com/
// Option 2: Elfsight - https://elfsight.com/
// Option 3: Custom embed from Instagram API
---

<section class="section-padding bg-white dark:bg-gray-950">
  <div class="container mx-auto container-padding">
    <h2 class="text-center">@{site.social.instagram}</h2>
    
    <!-- Embed widget code -->
    <div class="mt-8 grid gap-4">
      <!-- Instagram embed or widget -->
    </div>
  </div>
</section>
```

**Integración:**
- [x] Agregar en `src/pages/es/index.astro` después de Gallery
- [x] Duplicar para `/en/`

**Estado:** Implementado con Elfsight widget

---

### 2. Mapa de Zona de Servicio ✅

**Archivo:** `src/components/sections/ServiceMap.astro`

```astro
---
// Google Maps embed para Antigua Guatemala
const mapUrl = "https://www.google.com/maps/embed?pb=..."
---

<section id="coverage" class="section-padding">
  <div class="container mx-auto container-padding">
    <h2 class="text-center">Zona de Cobertura</h2>
    
    <div class="mt-8 aspect-video">
      <iframe
        src={mapUrl}
        class="w-full h-full rounded-2xl"
        loading="lazy"
        allowfullscreen
      />
    </div>
    
    <div class="mt-8 grid gap-4 sm:grid-cols-3">
      <div class="text-center">
        <h3 class="font-bold">Centro</h3>
        <p>Antigua Guatemala</p>
      </div>
      <div class="text-center">
        <h3 class="font-bold">Jocotenango</h3>
        <p>5 kmradius</p>
      </div>
      <div class="text-center">
        <h3 class="font-bold">Ciudad Vieja</h3>
        <p>8 kmradius</p>
      </div>
    </div>
  </div>
</section>
```

**Agregar en:**
- [x] Nueva página `/es/coverage` y `/en/coverage`
- [x] Link desde Footer

**Estado:** Implementado con Google Maps embed y 3 zonas

---

### 3. Paquetes y Descuentos ✅

**3.1 BookingForm actualizado con lógica:**

```typescript
// En BookingForm.astro, agregar lógica de paquetes:
// - 5 paseos = 10% descuento
// - Reserva semanal = 15% descuento
// - 2+ mascotas = 20% descuento combo

const calculateDiscount = (service: string, quantity: number, pets: number) => {
  let discount = 0;
  if (service === 'Dog Walks' && quantity >= 5) discount = 0.10;
  if (quantity >= 7) discount = 0.15;
  if (pets >= 2) discount = 0.20;
  return discount;
}
```

**3.2 Badge visual:**

```astro
<!-- En service card -->
{service.package && (
  <span class="badge-discount">Paquete: {service.package}</span>
)}
```

**Estado:** Implementado en BookingForm.astro con badges visuales

---

### 4. Contador de Disponibilidad ✅

**4.1 Component** `src/components/AvailabilityCounter.astro`

```astro
---
import { supabase } from '@/lib/supabase'
// Fetch available caregivers count
const { count } = await supabase
  .from('caregivers')
  .select('*', { count: true, head: true })
  .eq('is_available', true)
---

<div class="bg-accent-500 text-white px-4 py-2 rounded-full">
  {count} Homies disponibles ahora
</div>
```

**4.2 Usage**
- [x] Agregar en Hero section
- [ ] O en fixed position como notification

**Estado:** Implementado en Hero.astro con query a Supabase (client-side)

---

### 5. Blog de Tips ✅

**5.1 Estructura:**

```
src/
├── pages/
│   ├── es/
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
```

**5.2 Contenido inicial:**
- [x] "10 señales de estrés en tu perro"
- [x] "Qué llevar cuando dejas tu mascota"
- [x] "Cómo preparar a tu gato para su primera guardería"
- [x] "Beneficios del daycare para perros"

**5.3 Componente Card:**

```astro
---
// src/components/BlogCard.astro
const { post } = Astro.props
---
<article class="blog-card">
  <img src={post.image} alt={post.title} />
  <h3>{post.title}</h3>
  <p>{post.excerpt}</p>
  <a href={`/blog/${post.slug}`}>Leer más</a>
</article>
```

**Estado:** Blog completo con 4 posts, slug routing, y página de detalle
src/
├── pages/
│   ├── es/
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
```

**5.2 Contenido inicial**
- "10 señales de estrés en tu perro"
- "Qué llevar cuando dejas tu mascota"
- "Cómo preparar a tu gato para su primera guardería"
- "Beneficios del daycare para perros"

**5.3 Componente Card**

```astro
---
// src/components/BlogCard.astro
const { post } = Astro.props
---
<article class="blog-card">
  <img src={post.image} alt={post.title} />
  <h3>{post.title}</h3>
  <p>{post.excerpt}</p>
  <a href={`/blog/${post.slug}`}>Leer más</a>
</article>
```

---

### 6. Video Testimoniales ✅

**6.1 Componente:**

```astro
---
// src/components/VideoTestimonial.astro
const { videoUrl, author, pet } = Astro.props
---
<div class="video-testimonial">
  <video controls src={videoUrl} poster={poster} />
  <cite>{author} - {pet}</cite>
</div>
```

**6.2 Uso:**
- [x] En `/es/reviews` y `/en/reviews`
- [x] Embed desde TikTok/YouTube/Vimeo

**Estado:** Componente creado e integrado en pages/reviews

---

### 7. Gallery "Antes/Después" ✅

**7.1 Componente:**

```astro
---
// src/components/BeforeAfter.astro
const { before, after, description } = Astro.props
---
<div class="before-after">
  <img src={before} alt="Antes" class="before" />
  <img src={after} alt="Después" class="after" />
  <p>{description}</p>
</div>
```

**7.2 Uso:**
- [x] En Photography service detail
- [x] En `/es/services`

**Estado:** BeforeAfterSection.astro creado con 4 pares de ejemplo

---

### 8. Newsletter Signup ✅

**8.1 Form:**

```astro
---
// src/components/Newsletter.astro
---
<form action="/api/newsletter" method="POST">
  <input type="email" name="email" placeholder="Tu correo" required />
  <button type="submit">Suscribirse</button>
</form>
```

**8.2 API Route:**

```typescript
// src/pages/api/newsletter.ts
// Guardar en Supabase: tabla newsletter_subscribers
```

**8.3 Placement:**
- [x] En Footer (después de social links)
- [x] En Cta section

**Estado:** Newsletter.astro creado con Supabase integration y integrado en Footer y Cta

---

## Orden de Implementación Sugerido

1. ~~**Newsletter**~~ - Quick win ✅
2. ~~**Mapa de Cobertura**~~ - Alta prioridad ✅
3. ~~**Contador Disponibilidad**~~ - Quick win ✅
4. ~~**Paquetes/Descuentos**~~ - Negocio ✅
5. ~~**Instagram Feed**~~ - Marketing ✅
6. ~~**Blog**~~ - SEO ✅
7. ~~**Video Testimoniales**~~ - Social proof ✅
8. ~~**Gallery Before/After**~~ - Photography ✅

**Todas las features completadas!**

---

## Commands

```bash
npm run build  # Verificar después de cada feature
npm run dev   # Testing local
```