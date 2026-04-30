// Site configuration and content
// All text content is centralized here for easy editing

export interface NavItem {
  text: string;
  url: string;
  icon?: string;
}

export interface Service {
  name: string;
  description: string;
  price: string;
  duration?: string;
  image: string;
  popular?: boolean;
  soon?: boolean;
  features?: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties?: string[];
  rating?: number;
  whatsapp?: string;
  email?: string;         
}

export interface Testimonial {
  quote: string;
  author: string;
  pet: string;
  image: string;
  rating: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SecurityFeature {
  title: string;
  description: string;
  icon: string;
}

// Site metadata
export const site = {
  name: 'Homies Pets',
  tagline: 'You leave them, we love them!',
  description:
    '¿Buscas a alguien que cuide a tu mascota con mucho amor y ternura? ¡Estás en la página correcta! Explora nuestros servicios de cuidado y encuentra el que mejor se acomode a tus necesidades y las de tu mascota.',
  url: '/',
  email: 'homies.pets.care@gmail.com',
  phone: '+502 3476-8028',
  address: {
    street: 'Callejón del Burrito 4',
    city: 'Antigua Guatemala',
    state: 'Guatemala',
    zip: '03001',
  },
  hours: {
    weekdays: '7:00 AM - 7:00 PM',
    saturday: '8:00 AM - 6:00 PM',
    sunday: '9:00 AM - 5:00 PM',
  },
  social: {
    facebook: 'https://www.facebook.com/homies.petsitters',
    instagram: 'https://www.instagram.com/homies.pets/',
    threads: 'https://www.threads.net/@homies.pets',
    tiktok: 'https://www.tiktok.com/@homies.pets.gt',
    whatsapp: 'https://api.whatsapp.com/send?phone=50234768028',
  },
};

// Navigation
export const nav: NavItem[] = [
  { text: 'Somos', url: '/#about', icon: '<path id="users2" serif:id="users" d="M76.185,109.738C88.172,109.738 99.249,103.343 105.242,92.961C111.236,82.58 111.236,69.79 105.242,59.409C99.249,49.028 88.172,42.633 76.185,42.633C64.198,42.633 53.122,49.028 47.128,59.409C41.135,69.79 41.135,82.58 47.128,92.961C53.122,103.343 64.198,109.738 76.185,109.738ZM230.525,109.738C242.512,109.738 253.588,103.343 259.582,92.961C265.575,82.58 265.575,69.79 259.582,59.409C253.588,49.028 242.512,42.633 230.525,42.633C218.538,42.633 207.462,49.028 201.468,59.409C195.475,69.79 195.475,82.58 201.468,92.961C207.462,103.343 218.538,109.738 230.525,109.738ZM15.792,167.908C15.792,172.815 19.818,176.842 24.725,176.842L114.519,176.842C103.363,166.986 96.359,152.6 96.359,136.579C96.359,133.392 96.652,130.288 97.155,127.227C91.452,124.584 85.119,123.158 78.45,123.158L60.542,123.158C35.839,123.158 15.792,143.206 15.792,167.908ZM185.775,176.842L275.275,176.842C280.224,176.842 284.208,172.815 284.208,167.908C284.208,143.206 264.161,123.158 239.458,123.158L221.592,123.158C214.923,123.158 208.59,124.626 202.886,127.227C203.432,130.246 203.683,133.392 203.683,136.579C203.683,152.6 196.637,166.986 185.523,176.842L185.817,176.842L185.775,176.842ZM150,116.448C157.192,116.448 163.838,120.285 167.434,126.514C171.03,132.742 171.03,140.416 167.434,146.645C163.838,152.873 157.192,156.71 150,156.71C142.808,156.71 136.162,152.873 132.566,146.645C128.97,140.416 128.97,132.742 132.566,126.514C136.162,120.285 142.808,116.448 150,116.448ZM150,176.842C164.384,176.842 177.676,169.168 184.868,156.71C192.061,144.253 192.061,128.905 184.868,116.448C177.676,103.991 164.384,96.317 150,96.317C135.616,96.317 122.324,103.991 115.132,116.448C107.939,128.905 107.939,144.253 115.132,156.71C122.324,169.168 135.616,176.842 150,176.842ZM125.381,210.394L174.619,210.394C191.311,210.394 205.319,221.801 209.261,237.235L90.739,237.235C94.723,221.801 108.731,210.394 125.381,210.394ZM125.381,190.262C94.513,190.262 69.475,215.301 69.475,246.169C69.475,252.334 74.466,257.367 80.673,257.367L219.327,257.367C225.492,257.367 230.525,252.376 230.525,246.169C230.525,215.301 205.487,190.262 174.619,190.262L125.381,190.262L125.381,190.262Z" style="fill-rule:nonzero;"/>' },
  { text: 'Servicios', url: '/#services', icon: '<path id="users" d="M117.468,115.214C100.54,120.769 80.729,107.038 73.234,84.554C65.74,62.07 73.392,39.377 90.32,33.821C107.248,28.266 127.059,41.997 134.554,64.481C142.049,86.965 134.397,109.658 117.468,115.214ZM231.565,119.878C241.471,102.897 259.866,95.088 272.707,102.426C285.547,109.763 287.958,129.522 278.053,146.503C268.147,163.483 249.751,171.293 236.911,163.955C224.07,156.618 221.66,136.859 231.565,119.878L231.565,119.878ZM68.413,119.878C78.318,136.859 75.907,156.618 63.067,163.955C50.226,171.293 31.778,163.483 21.925,146.503C12.072,129.522 14.43,109.763 27.271,102.426C40.111,95.088 58.56,102.898 68.413,119.878L68.413,119.878ZM161.283,64.481C168.778,41.997 188.589,28.266 205.517,33.821C222.446,39.377 230.098,62.07 222.603,84.554C215.108,107.038 195.297,120.769 178.369,115.214C161.44,109.658 153.789,86.965 161.283,64.481L161.283,64.481ZM75.75,230.516C75.016,232.455 74.545,234.971 74.545,237.958C74.545,240.317 76.431,242.203 78.79,242.203L80.572,242.203C81.725,242.203 82.825,241.994 83.874,241.574L121.976,226.323C139.952,219.143 160.025,219.143 178.054,226.323L216.157,241.574C217.205,241.994 218.358,242.203 219.458,242.203L221.24,242.203C223.599,242.203 225.485,240.317 225.485,237.958C225.485,234.971 225.014,232.507 224.28,230.516C200.381,166.418 160.812,158.347 150.015,158.347C139.219,158.347 99.649,166.418 75.75,230.516ZM52.166,221.763C79.628,148.075 128.422,133.19 150.015,133.19C171.608,133.19 220.402,148.075 247.865,221.763C249.804,226.952 250.642,232.455 250.642,238.011C250.642,254.258 237.487,267.413 221.24,267.413L219.458,267.413C215.108,267.413 210.811,266.574 206.775,264.949L168.673,249.698C156.671,244.876 143.307,244.876 131.305,249.698L93.203,264.949C89.167,266.574 84.869,267.413 80.519,267.413L78.737,267.413C62.49,267.413 49.335,254.258 49.335,238.011C49.335,232.507 50.174,226.952 52.113,221.763L52.166,221.763Z" style="fill-rule:nonzero;"/>' },
  { text: 'Galería', url: '/#gallery', icon: '<path id="users" d="M120.179,32.604C107.549,32.604 96.333,40.675 92.35,52.677L87.843,66.146L49.375,66.146C30.875,66.146 15.833,81.187 15.833,99.687L15.833,233.854C15.833,252.354 30.875,267.396 49.375,267.396L250.625,267.396C269.125,267.396 284.167,252.354 284.167,233.854L284.167,99.687C284.167,81.187 269.125,66.146 250.625,66.146L212.157,66.146L207.65,52.677C203.667,40.675 192.451,32.604 179.821,32.604L120.179,32.604ZM116.196,60.643C116.773,58.913 118.345,57.76 120.179,57.76L179.821,57.76C181.603,57.76 183.227,58.913 183.804,60.643L191.141,82.707C192.87,87.843 197.64,91.302 203.09,91.302L250.625,91.302C255.237,91.302 259.01,95.076 259.01,99.687L259.01,233.854C259.01,238.466 255.237,242.24 250.625,242.24L49.375,242.24C44.763,242.24 40.99,238.466 40.99,233.854L40.99,99.687C40.99,95.076 44.763,91.302 49.375,91.302L96.91,91.302C102.308,91.302 107.13,87.843 108.859,82.707L116.196,60.643ZM150,225.469C170.971,225.469 190.349,214.281 200.834,196.12C211.319,177.959 211.319,155.583 200.834,137.422C190.349,119.261 170.971,108.073 150,108.073C129.029,108.073 109.651,119.261 99.166,137.422C88.681,155.583 88.681,177.959 99.166,196.12C109.651,214.281 129.029,225.469 150,225.469ZM116.458,166.771C116.458,154.788 122.851,143.715 133.229,137.723C143.607,131.731 156.393,131.731 166.771,137.723C177.149,143.715 183.542,154.788 183.542,166.771C183.542,178.754 177.149,189.827 166.771,195.819C156.393,201.81 143.607,201.81 133.229,195.819C122.851,189.827 116.458,178.754 116.458,166.771Z" style="fill-rule:nonzero;"/>' },
  { text: 'Preguntas', url: '/team', icon: '<path id="users" d="M107.331,73.261C114.104,73.261 120.611,70.54 125.412,65.74L150,41.205L174.588,65.794C179.388,70.594 185.896,73.314 192.669,73.314L226.805,73.314L226.805,107.449C226.805,114.223 229.525,120.73 234.325,125.531L258.647,149.852L234.325,174.174C229.525,178.974 226.805,185.481 226.805,192.255L226.805,226.87L192.189,226.87C185.416,226.87 178.908,229.59 174.108,234.391L150,258.446L125.945,234.391C121.145,229.59 114.638,226.87 107.864,226.87L73.195,226.87L73.195,192.255C73.195,185.481 70.475,178.974 65.675,174.174L41.407,149.799L65.728,125.477C70.528,120.677 73.249,114.17 73.249,107.396L73.249,73.261L107.384,73.261L107.331,73.261ZM168.081,23.071C158.107,13.097 141.893,13.097 131.866,23.071L107.331,47.659L73.195,47.659C59.061,47.659 47.594,59.126 47.594,73.261L47.594,107.396L23.272,131.718C13.298,141.692 13.298,157.906 23.272,167.933L47.594,192.255L47.594,226.87C47.594,241.004 59.061,252.472 73.195,252.472L107.811,252.472L131.866,276.527C141.839,286.501 158.054,286.501 168.081,276.527L192.189,252.472L226.805,252.472C240.939,252.472 252.406,241.004 252.406,226.87L252.406,192.255L276.728,167.933C286.702,157.959 286.702,141.745 276.728,131.718L252.406,107.396L252.406,73.261C252.406,59.126 240.939,47.659 226.805,47.659L192.669,47.659L168.081,23.071ZM104.024,101.689L103.81,102.329C101.464,108.996 104.931,116.303 111.598,118.65C118.265,120.997 125.572,117.53 127.919,110.863L128.132,110.223C128.719,108.516 130.372,107.396 132.132,107.396L163.228,107.396C167.708,107.396 171.281,111.023 171.281,115.45C171.281,118.33 169.735,120.997 167.228,122.437L143.6,135.985C139.599,138.278 137.146,142.492 137.146,147.079L137.146,154.332C137.146,161.426 142.853,167.133 149.947,167.133C156.934,167.133 162.641,161.533 162.747,154.546L179.975,144.678C190.429,138.651 196.883,127.504 196.883,115.45C196.883,96.835 181.789,81.795 163.228,81.795L132.186,81.795C119.545,81.795 108.291,89.742 104.024,101.689ZM167.068,201.269C167.068,191.842 159.426,184.201 150,184.201C140.574,184.201 132.932,191.842 132.932,201.269C132.932,210.695 140.574,218.336 150,218.336C159.426,218.336 167.068,210.695 167.068,201.269Z" style="fill-rule:nonzero;"/>' },
  { text: 'Contacto', url: '/contact', icon: '<path id="users" d="M212.785,159.788C204.191,156.119 194.234,158.53 188.312,165.762L170.913,187.039C146.806,173.046 126.682,152.922 112.69,128.816L133.914,111.469C141.146,105.547 143.609,95.59 139.889,86.996L114.734,28.301C110.803,19.077 100.899,13.942 91.099,16.038L32.404,28.615C22.761,30.659 15.844,39.201 15.844,49.106C15.844,170.269 107.659,270.05 225.52,282.575C230.656,283.099 235.792,283.518 241.032,283.728L241.085,283.728C244.281,283.832 247.426,283.937 250.622,283.937C260.527,283.937 269.069,277.02 271.113,267.377L283.691,208.682C285.787,198.882 280.651,188.978 271.428,185.047L212.733,159.892L212.785,159.788ZM247.216,258.73C134.176,256.896 42.833,165.552 41.051,52.512L93.038,41.35L115.572,93.966L96.758,109.373C87.221,117.181 84.758,130.755 90.941,141.445C107.135,169.378 130.403,192.646 158.335,208.839C169.026,215.023 182.599,212.56 190.408,203.022L205.815,184.209L258.431,206.743L247.216,258.73Z" style="fill-rule:nonzero;"/>' },
  { text: 'Perfil', url: '/contact', icon: '<path id="users" d="M157.244,32.179C153.051,28.638 146.949,28.638 142.756,32.179L19.772,136.529C15.067,140.535 14.508,147.569 18.468,152.274C22.428,156.979 29.509,157.538 34.214,153.579L45.673,143.889L45.673,230.77C45.673,251.36 62.351,268.037 82.941,268.037L217.105,268.037C237.696,268.037 254.373,251.36 254.373,230.77L254.373,143.889L265.786,153.579C270.491,157.585 277.572,156.979 281.532,152.274C285.492,147.569 284.933,140.488 280.228,136.529L157.244,32.179ZM232.012,124.929L232.012,230.77C232.012,239.015 225.351,245.677 217.105,245.677L82.941,245.677C74.696,245.677 68.034,239.015 68.034,230.77L68.034,124.929L150.023,55.378L232.012,124.929ZM179.838,133.873C179.838,123.222 174.155,113.379 164.93,108.053C155.706,102.728 144.341,102.728 135.116,108.053C125.892,113.379 120.209,123.222 120.209,133.873C120.209,144.525 125.892,154.367 135.116,159.693C144.341,165.019 155.706,165.019 164.93,159.693C174.155,154.367 179.838,144.525 179.838,133.873ZM135.116,178.595C114.526,178.595 97.848,195.272 97.848,215.863C97.848,219.962 101.202,223.316 105.302,223.316L194.745,223.316C198.844,223.316 202.198,219.962 202.198,215.863C202.198,195.272 185.521,178.595 164.93,178.595L135.116,178.595Z" style="fill-rule:nonzero;"/>' },
];

// Header configuration
export const header = {
  darkMode: true,
  cta: {
    text: 'Tu Perfil',
    url: '/contact',
  },
};

// Hero section
export const hero = {
  title: 'You leave them, we love them!',
  subtitle:
    '¿Buscas a alguien que cuide a tu mascota con mucho amor y ternura? ¡Estás en la página correcta! Explora nuestros servicios de cuidado y encuentra el que mejor se acomode a tus necesidades y las de tu mascota.',
  primaryCta: {
    text: 'Solicita un servicio',
    url: '/contact',
  },
  secondaryCta: {
    text: 'Ofrece tus servicios',
    url: '/#services',
  },
  image:
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=800&fit=crop',
  stats: [
    { value: '10K+', label: 'Happy Pets' },
    { value: '8+', label: 'Years Experience' },
    { value: '4.9', label: 'Average Rating' },
    { value: '50+', label: 'Services' },
  ],
};

// Services
export const services: Service[] = [
  {
    name: 'Pet Sitting',
    description:
      '¡Hogar, dulce hogar!',
    price: 'Q.125 /noche',
    duration: 'Nada como cuidar a tus mascotas en el lugar más cómodo y seguro: su hogar. Este servicio es ideal para:',
    image:
      'https://images.unsplash.com/photo-1609103566358-ccab56549f8d?w=600&h=400&fit=crop',
    popular: true,
    features: ['Mascotas que prefieren la comodidad y seguridad de su hogar', 'Mascotas que necesitan compañía constante y atención personalizada', 'Dueños que desean mantener la rutina y cuidados específicos de sus mascotas' ],
  },
  {
    name: 'Daycare',
    description:
      '¡Sal de casa sin preocupaciones!',
    price: 'Q.35 /día',
    duration: 'Nuestros Homies anfitriones estarán felices de recibir a tu mascota en su hogar. Este servicio es ideal para:',
    image:
      'https://images.unsplash.com/photo-1622050163882-6cdf82e5b4c2?w=600&h=400&fit=crop',
    features: ['Cachorros o perros muy activos que no deben quedarse solos', 'Perros mayores o con necesidades especiales que requieren más cuidado', 'Dueños que sufren al dejarlos solos'],
  },
  {
    name: 'Homestay',
    description:
      '¡Olvídate de las perreras y las jaulas!',
    price: 'Q.95 /día',
    duration: 'El mejor Homie que recibirá a tu mascota como parte de su familia cuando tengas que ausentarte. Este servicio es ideal para:',
    image:
      'https://images.unsplash.com/photo-1602027439122-724dff5d9bc7?w=600&h=400&fit=crop',
    soon: true,
    features: ['Mascotas que necesitan atención personalizada y comodidad', 'Dueños que buscan una alternativa más segura que guarderías u hoteles', 'Mascotas sociables que disfrutan convivir en un ambiente controlado'],
  },
  {
    name: 'Dog Walks',
    description:
      '¡Paseos divertidos y seguros!',
    price: 'Q.45 /hora',
    duration: 'Que no se frustre la mejor parte del día porque tienes un compromiso que atender. ¡Podemos cubrirte! Te encantará porque:',
    image:
      'https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?w=600&h=400&fit=crop',
    popular: true,
    features: ['Tu perro recibe el cuidado que merece', 'Paseos en su vecindario seguro.', 'Siempre con un Homie experto'],
  },
  {
    name: 'Home Visits',
    description:
      '¡Dosis de amor a domicilio!',
    price: 'Q.45 /hora',
    duration: 'Coordina las visitas que consideres necesarias para atender las necesidades de tu mascota. Este servicio es ideal para:',
    image:
      'https://images.unsplash.com/photo-1769922927790-b7ac9f316191?w=600&h=400&fit=crop',
    features: ['Dueños que quieren visitas cortas para sus mascotas', 'Mascotas autónomas que solo necesitan comida, agua y tranquilidad', 'Mascotas que prefieren quedarse en casa'],
  },
  {
    name: 'Photography',
    description:
      'Uno... Dos... ¡Guau!',
    price: 'Q.350 /sesión',
    duration: 'Crea memorias que duren toda la vida. Obtén paquetes de imágenes profesionales. Este servicio es una gran opción porque:',
    image:
      'https://images.unsplash.com/photo-1761035912545-1ec51bbad426?w=600&h=400&fit=crop',
    soon: true,
    features: ['Fotos de alta calidad que capturan la esencia de tu mascota', 'Ideas creativas y resultados profesionales garantizados', 'Recuerdos únicos que reflejan su espíritu y amor'],
  },
];

// Service categories for the services page
export const serviceCategories = [
  {
    name: 'Grooming',
    description: 'Professional grooming services for dogs and cats of all breeds and sizes.',
    services: services.filter((s) =>
      ['Full Grooming', 'Bath & Brush', 'Nail Trim', 'Puppy Package'].includes(s.name)
    ),
  },
  {
    name: 'Boarding & Daycare',
    description: 'Safe and loving environment for your pet while you\'re away.',
    services: services.filter((s) =>
      ['Daycare', 'Overnight Boarding'].includes(s.name)
    ),
  },
];

// Team members
export const team: TeamMember[] = [
  {
    name: 'Daniela Morales',
    role: 'Fundadora y Homie original :3',
    bio: 'La visionaria. Daniela comenzó este proyecto para crear un espacio donde las mascotas fueran tratadas como parte de la familia.',
    image: '/assets/img/Dani.png',
    specialties: ['Show grooming', 'Anxious pets', 'Senior pets'],
    rating: 5,
    whatsapp: 'https://api.whatsapp.com/send?phone=50234768028',
    email: 'homies.pets.care@gmail.com',
  },
  {
    name: 'Anaidé Ponce',
    role: 'Partner y Homie',
    bio: 'Me llamo Anaidé ¡y me encantan los animales! Sobre todo con los que puedo pasar tiempo; por eso llevo varios años dedicándome a cuidar lindas mascotas.',
    image: '/assets/img/anaide_ponce.jpg',
    specialties: ['Creative grooming', 'Asian fusion', 'Poodles'],
    rating: 5,
    whatsapp: 'https://api.whatsapp.com/send?phone=50234768028',
    email: 'homies.pets.care@gmail.com',
  },
  {
    name: 'Wendy Calderón',
    role: 'Pet Sitter',
    bio: '¡Hola! Soy Wendy también conocida cómo “Gwen”. Me tomo el tiempo para conocer las necesidades y personalidades de cada perro, para que se sientan amados y cuidados.',
    image: '/assets/img/gwendy_calderon.jpg',
    specialties: ['Behavior training', 'Pack dynamics', 'Puppy socialization'],
    rating: 4,
    whatsapp: 'https://api.whatsapp.com/send?phone=50234768028',
    email: 'homies.pets.care@gmail.com',
  },
  {
    name: 'Lourdes Arévalo',
    role: 'Senior Pet Sitter',
    bio: 'Soy amante de los animales. Me gusta ver a través de ellos el amor incondicional que nos brindan y lo afortunados que somos que Dios los puso en nuestro vida.',
    image: '/assets/img/Lourdes-Arevalo.jpg',
    specialties: ['Special needs pets', 'Medication administration', 'Senior care'],
    rating: 5,
    whatsapp: 'https://api.whatsapp.com/send?phone=50234768028',
    email: 'homies.pets.care@gmail.com',
  },
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    quote:
      'A mis perros siempre los han cuidado con mucho amor. Recomiendo el servicio porque son personas muy confiables y responsables',
    author: 'Martha Nazario',
    pet: 'Max, Golden Retriever',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    rating: 5,
  },
  {
    quote:
      'Cuando salgo de viaje contrato los servicios de Homies y siempre han sido muy cuidadosas con mis gatos. Los consienten y atiendan muy bien. Los recomiendo',
    author: 'Alex Martínez',
    pet: 'Luna, Labradoodle',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
  },
  {
    quote:
      'Cuando no puedo llevar a mi perro a caminar todos los días me comunico con Homies y pido dos horas de caminata, mi perro disfruta mucho de sus paseos que son divertidos y seguros',
    author: 'Antoine Crawford',
    pet: 'Whiskers & Shadow, Gatos',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 5,
  },
  {
    quote:
      'Cuando tengo reuniones largas y no puedo estar en casa, confío en Homies para cuidar a mi perrita. Siempre la atienden con cariño y responsabilidad, y me da tranquilidad saber que está feliz y segura',
    author: 'Sheyla Gómez',
    pet: 'Princess, Maltese',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
  },
];

// Gallery images
export const gallery: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&h=600&fit=crop',
    alt: 'Happy golden retriever after grooming',
    category: 'Pet sitting',
  },
  {
    src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop',
    alt: 'Dogs playing in daycare',
    category: 'Dog Walks',
  },
  {
    src: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&h=600&fit=crop',
    alt: 'Dalmatian portrait',
    category: 'Homestay',
  },
  {
    src: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&h=600&fit=crop',
    alt: 'Cat being groomed',
    category: 'Home Visits',
  },
  {
    src: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=600&h=600&fit=crop',
    alt: 'Dog in boarding suite',
    category: 'Pet Sitting',
  },
  {
    src: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=600&fit=crop',
    alt: 'Puppy bath time',
    category: 'Pet Sitting',
  },
  {
    src: 'https://images.unsplash.com/photo-1604848698030-c434ba08ece1?w=600&h=600&fit=crop',
    alt: 'Happy pomeranian',
    category: 'Home Visits',
  },
  {
    src: 'https://images.unsplash.com/photo-1620325466037-4b405e531c49?w=600&h=600&fit=crop',
    alt: 'French bulldog relaxing',
    category: 'Homestay',
  },
];

// About section
export const about = {
  title: 'Taking care of your pets like Homies',
  subtitle: 'Sobre Nosotros',
  description: [
    'En Homies somos apasionados por los animales y ofrecemos servicios de cuidado que cumplen con los más altos estándares de calidad.',
    'Nuestra prioridad es la seguridad y bienestar de cada mascota, brindándoles atención personalizada basada en confianza, responsabilidad y cariño.',
    'Nos comprometemos a cuidarlas como si fueran nuestras propias, asegurándote tranquilidad al saber que están en las mejores manos.',
    'Cuando confías en Homies, obtienes:',
  ],
  features: [
    {
      title: 'Disponibilidad',
      description: 'Encuentras siempre a un buen Homie disponible para las fechas que necesites.',
    },
    {
      title: 'Seguridad',
      description: 'Todos los usuarios cuentan con identidad verificada mediante documentos oficiales.',
    },
    {
      title: 'Reseñas',
      description: 'Los usuarios dejan reseñas y calificaciones después de cada servicio. Al ser visibles para otros usuarios, ayudan a construir una reputación confiable.',
    },
    {
      title: 'Comunicación Segura',
      description: 'Proporcionamos una comunicación segura para que los clientes y proveedores puedan coordinarse sin riesgo de intercepción o fraude.',
    },
  ],
  image:
    'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop',
};

// Security Guarantee
export const securityGuarantee = {
  title: 'Garantía de Seguridad',
  subtitle: 'Tu tranquilidad es nuestra prioridad. Por eso implementamos rigurosos protocolos de seguridad en cada servicio.',
};

export const securityFeatures: SecurityFeature[] = [
  {
    title: 'Identidad Verificada',
    description: 'Todos nuestros cuidadores pasan por un proceso de verificación de identidad con documentos oficiales y revisión de antecedentes.',
    icon: 'shield',
  },
  {
    title: 'Seguro de Cobertura',
    description: 'Contamos con seguro que cubre incidentes durante el servicio, protegiendo a tu mascota, tu hogar y al cuidador.',
    icon: 'umbrella',
  },
  {
    title: 'Protocolo de Emergencia',
    description: 'Tenemos un plan de acción claro ante cualquier eventualidad: contacto inmediato, veterinario de confianza y seguimiento 24/7.',
    icon: 'alert-circle',
  },
  {
    title: 'Pagos Seguros',
    description: 'Todas las transacciones se procesan a través de la plataforma con encriptación SSL. Nunca compartas datos bancarios directamente.',
    icon: 'lock',
  },
];

// FAQ
export const faqs: FAQ[] = [
  {
    question: '¿Qué pasa si mi mascota se enferma durante el servicio?',
    answer:
      'Contamos con un protocolo de emergencia claro: el Homie te contactará de inmediato y, si es necesario, llevará a tu mascota al veterinario de tu confianza o al más cercano. Todos nuestros cuidadores están capacitados para detectar signos de alerta y actuar con rapidez.',
  },
  {
    question: '¿Puedo conocer al cuidador antes de contratar el servicio?',
    answer:
      '¡Por supuesto! Puedes solicitar una reunión previa (virtual o presencial) para que tú y tu mascota conozcan al Homie. Esto ayuda a generar confianza y asegurar que ambos se sientan cómodos antes del servicio.',
  },
  {
    question: '¿Cómo funcionan los pagos? ¿Son seguros?',
    answer:
      'Los pagos se realizan a través de la plataforma con métodos seguros. No necesitas entregar efectivo directamente al cuidador. Recibirás un comprobante digital y puedes pagar con tarjeta o transferencia bancaria.',
  },
  {
    question: '¿Cómo sé que mi mascota está bien mientras estoy fuera?',
    answer:
      'Nuestros Homies envían actualizaciones periódicas con fotos y mensajes sobre el estado de tu mascota. También puedes coordinar videollamadas o contactar directamente al cuidador a través de nuestro sistema de mensajería segura.',
  },
  {
    question: '¿Puedo contratar para varias mascotas al mismo tiempo?',
    answer:
      'Sí. Ofrecemos descuentos especiales cuando contratas para 2 o más mascotas. El Homie asignado tendrá la experiencia necesaria para cuidar a todos tus amigos peludos simultáneamente.',
  },
  {
    question: '¿Qué pasa si necesito cancelar o cambiar fechas?',
    answer:
      'Puedes cancelar o modificar tu reserva sin costo hasta 24 horas antes del servicio. Para cancelaciones de última hora, aplicamos una política justa que protege tanto al cliente como al cuidador. Consulta los detalles en tu panel de reservas.',
  },
  {
    question: '¿Los cuidadores tienen identidad verificada?',
    answer:
      'Sí. Todos nuestros Homies pasan por un proceso de verificación de identidad con documentos oficiales. Además, revisamos sus antecedentes y validamos sus referencias para garantizar la máxima seguridad para tu hogar y tu mascota.',
  },
  {
    question: '¿Qué áreas cubren sus servicios?',
    answer:
      'Actualmente operamos en Antigua Guatemala, Jocotenango y Ciudad Vieja. Si no estás seguro de si cubrimos tu zona, contáctanos y con gusto te confirmamos la disponibilidad.',
  },
];

// Footer configuration
export const footer = {
  description:
    'Servicios de pet sitting, homestay, visitas a domicilio y paseos para perros. Cuidamos a tus mascotas con el mismo amor y dedicación que tú les das.',
  links: [
    {
      title: 'Servicios',
      items: [
        { text: 'Pet sitting', url: '/services#grooming' },
        { text: 'Homestay', url: '/services#daycare' },
        { text: 'Home visits', url: '/services#boarding' },
        { text: 'Dog walks', url: '/services' },
      ],
    },
    {
      title: 'Compañía',
      items: [
        { text: 'Sobre Nosotros', url: '/#about' },
        { text: 'Nuestro equipo', url: '/team' },
        { text: 'Zona de Cobertura', url: '/coverage' },
        { text: 'Galería', url: '/#gallery' },
        { text: 'Contacto', url: '/contact' },
      ],
    },
    {
      title: 'Asistencia',
      items: [
        { text: 'Preguntas', url: '/contact#faq' },
        { text: 'Información para Nuevos Clientes', url: '/contact#new-clients' },
        { text: 'Política de Privacidad', url: '/contact#faq' },
        { text: 'Condiciones de uso', url: '/contact#faq' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} ${site.name}. All rights reserved.`,
};
