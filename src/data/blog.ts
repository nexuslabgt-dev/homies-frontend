export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: '10-senales-estres-perro',
    title: '10 señales de estrés en tu perro que debes conocer',
    excerpt: 'Descubre cómo identificar si tu perro está experimentando estrés y qué medidas puedes tomar para ayudarlo.',
    content: `
      <p>Como dueños de mascotas, es fundamental que aprendamos a reconocer las señales de estrés en nuestros perros. Aquí te presentamos las 10 señales más comunes que indican que tu peludo amigo podría estar bajo estrés:</p>
      
      <h2>1. Jadeos excesivos</h2>
      <p>Si tu perro jadea más de lo normal sin haber hecho ejercicio intenso, podría estar estresado. El jadeo excesivo es una forma en que los perros regulan su temperatura corporal cuando están ansiosos.</p>
      
      <h2>2. Lamer excesivamente sus labios o patas</h2>
      <p>Este comportamiento repetitivo es a menudo una señal de incomodidad o estrés. Si notas que tu perro se lame constantemente, observa qué podría estar causando su inquietud.</p>
      
      <h2>3. Bostezos frecuentes</h2>
      <p>Aunque los bostezos pueden ser naturales, hacerlo frecuentemente en situaciones no relacionadas con el sueño puede indicar estrés.</p>
      
      <h2>4. Cambios en el apetito</h2>
      <p>Un perro estresado puede perder el interés por la comida o, por el contrario, comer en exceso como mecanismo de réconfort.</p>
      
      <h2>5. Destrucción excesiva</h2>
      <p>Si tu perro de repente comienza a destruir objetos de la casa, especialmente cuando está solo, podría estar experimentando ansiedad por separación.</p>
      
      <h2>6. Movimientos repetitivos</h2>
      <p>Caminar en círculos, girando sobre sí mismo o balanceándose constantemente son señales claras de estrés en perros.</p>
      
      <h2>7. Cambios en el comportamiento social</h2>
      <p>Un perro que normalmente es amigable pero de repente se vuelve agresivo o muy callado, podría estar bajo estrés.</p>
      
      <h2>8. Temblores</h2>
      <p>Los temblores sin motivo aparente, especialmente cuando no hace frío, son una señal común de estrés o ansiedad.</p>
      
      <h2>9. Cambios en los patrones de sueño</h2>
      <p>Dormir más de lo normal o tener dificultades para conciliar el sueño pueden indicar que tu perro está experimentando estrés.</p>
      
      <h2>10. Agresividad o miedo exagerado</h2>
      <p>Reacciones exageradas a estímulos cotidianos, como ruidos o personas, pueden ser señales de estrés acumulativo.</p>
      
      <h2>¿Qué hacer si tu perro muestra estas señales?</h2>
      <p>Lo más importante es identificar la causa del estrés y, si es posible, eliminarla. Consulta con un veterinario o especialista en comportamiento canino para obtener orientación profesional.</p>
    `,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=500&fit=crop',
    date: '2024-01-15',
    category: 'Bienestar',
    readTime: '5 min',
  },
  {
    slug: 'que-llevar-dejando-mascota',
    title: 'Qué llevar cuando dejas tu mascota: Guía completa',
    excerpt: 'Prepara todo lo necesario para que tu mascota se sienta cómoda cuando no estés.',
    content: `
      <p>Dejar a tu mascota al cuidado de alguien más puede ser difícil, pero con la preparación adecuada, puedes asegurarte de que tu peludo amigo tenga todo lo que necesita.</p>
      
      <h2>Elementos esenciales</h2>
      <p>Cuando dejes a tu mascota, asegúrate de incluir:</p>
      
      <h2>1. Comida y agua</h2>
      <p>Prepara porciones individuales etiquetadas con el nombre de tu mascota y las instrucciones de alimentación. Incluye también sus platos favoritos.</p>
      
      <h2>2. Medicamentos</h2>
      <p>Si tu mascota toma algún medicamento, deja instrucciones claras sobre la dosis y el horario. Asegúrate de tener suficiente medicación para toda la duración.</p>
      
      <h2>3. Juguetes favoritos</h2>
      <p>Los juguetes familiares pueden ayudar a reducir la ansiedad de tu mascota. Incluye su juguete favorito para confort.</p>
      
      <h2>4. Cama o manta</h2>
      <p>El olor de su espacio familiar puede ser reconfortante. Si tu mascota tiene una cama o manta especial, llévala también.</p>
      
      <h2>5. Información veterinaria</h2>
      <p>Deja los datos de tu veterinario, información sobre alergias, y cualquier condición médica relevante.</p>
      
      <h2>6. Rutina</h2>
      <p>Escribe las rutinas diarias de tu mascota: horarios de comida, paseos, medicamentos, y cualquier otra necesidad especial.</p>
    `,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=500&fit=crop',
    date: '2024-01-10',
    category: 'Guía',
    readTime: '4 min',
  },
  {
    slug: 'preparar-gato-guarderia',
    title: 'Cómo preparar a tu gato para su primera guardería',
    excerpt: 'Tips para que la primera experiencia de tu gato en una guardería sea positiva y sin estrés.',
    content: `
      <p>Los gatos pueden ser más sensibles a los cambios que los perros, por lo que preparar a tu felino para su primera guardería requiere planificación y paciencia.</p>
      
      <h2>Antes de la visita</h2>
      
      <h2>1. Visitas de familiarización</h2>
      <p>Antes de dejar a tu gato, considera hacer visitas cortas al lugar para que se acostumbre al ambiente nuevo.</p>
      
      <h2>2. Preparación emocional</h2>
      <p>Juega con tu gato más frecuentemente antes de la guardería para ayudarle a liberar energía y mantenerse relajado.</p>
      
      <h2>3. Artículos de confort</h2>
      <p>Llena una mochila con su manta favorita, juguetes, y un pulverizador con feromonas felinas para crear un ambiente tranquilo.</p>
      
      <h2>Durante la estancia</h2>
      
      <h2>4. Comunicación con el cuidador</h2>
      <p>Asegúrate de que el cuidador tenga toda la información necesaria sobre las preferencias y necesidades de tu gato.</p>
      
      <h2>5. Rutinas similares</h2>
      <p>Mantén los horarios de alimentación y juego lo más similar posible a los de casa.</p>
    `,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=500&fit=crop',
    date: '2024-01-05',
    category: 'Gatos',
    readTime: '4 min',
  },
  {
    slug: 'beneficios-daycare-perros',
    title: 'Beneficios del daycare para perros: Más que solo diversión',
    excerpt: 'Descubre por qué el daycare para perros puede transformar la vida de tu peludo compañero.',
    content: `
      <p>El daycare para perros ha ganado popularidad como una excelente opción de cuidado canino. Más allá de ser un lugar donde tu perro juega, ofrece múltiples beneficios.</p>
      
      <h2>Beneficios sociales</h2>
      
      <h2>1. Socialización</h2>
      <p>El daycare permite que tu perro interactúe con otros canes de manera controlada, desarrollando habilidades sociales importantes.</p>
      
      <h2>2. Reducción de ansiedad por separación</h2>
      <p>Al estar rodeado de otros perros y con supervisión profesional, tu perro aprende a sentirse seguro cuando no estás.</p>
      
      <h2>Beneficios físicos</h2>
      
      <h2>3. Ejercicio adecuado</h2>
      <p>Los perros en daycare burn off energía a través de juego activo, manteniendo un peso saludable y músculos fuertes.</p>
      
      <h2>4. Rutina estructurada</h2>
      <p>El daycare proporciona una rutina diaria que ayuda a los perros a sentirse más seguros y organizados.</p>
      
      <h2>Beneficios emocionales</h2>
      
      <h2>5. Estimulación mental</h2>
      <p>Las actividades variadas mantienen a tu perro mentalmente estimulado, evitando el aburrimiento y comportamientos destructivos.</p>
      
      <h2>6. Confianza</h2>
      <p>Los perros que asisten a daycare regularmente desarrollan mayor confianza y estabilidad emocional.</p>
    `,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b27925af7c?w=800&h=500&fit=crop',
    date: '2024-01-01',
    category: 'Daycare',
    readTime: '5 min',
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}