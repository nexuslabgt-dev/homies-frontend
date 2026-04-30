export interface BeforeAfterItem {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  description: string;
}

export const beforeAfterGallery: BeforeAfterItem[] = [
  {
    before: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=450&fit=crop',
    after: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=450&fit=crop',
    beforeAlt: 'Perro con pelaje descuidado',
    afterAlt: 'Perro con pelaje limpio y cepillado',
    description: 'Transformación de pelaje después de una sesión de grooming completo',
  },
  {
    before: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=450&fit=crop',
    after: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=450&fit=crop',
    beforeAlt: 'Cachorro ansiedad',
    afterAlt: 'Cachorro feliz y relajado',
    description: 'Bienestar emocional después de una semana en nuestro daycare',
  },
  {
    before: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&h=450&fit=crop',
    after: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=450&fit=crop',
    beforeAlt: 'Perro necesitando actividad',
    afterAlt: 'Perro activo y feliz',
    description: 'Después de paseos diarios con nuestros Homies',
  },
  {
    before: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&h=450&fit=crop',
    after: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=450&fit=crop',
    beforeAlt: 'Gato estresado',
    afterAlt: 'Gato tranquilo y cómodo',
    description: 'Gatos que se adaptan rápidamente a nuestro cuidado',
  },
];