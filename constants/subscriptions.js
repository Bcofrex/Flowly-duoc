// Lista de suscripciones disponibles
export const AVAILABLE_SUBSCRIPTIONS = [
  { id: '1', nombre: 'Netflix', imagen: require('../assets/ServiciosStreaming/icons8-netflix-96.png') },
  { id: '2', nombre: 'Spotify', imagen: require('../assets/ServiciosStreaming/icons8-spotify-96.png') },
  { id: '3', nombre: 'Disney+', imagen: require('../assets/ServiciosStreaming/icons8-disney-1-96.png') },
  { id: '4', nombre: 'Canva', imagen: require('../assets/ServiciosStreaming/icons8-canva-96.png') },
  { id: '5', nombre: 'ChatGPT Plus', imagen: require('../assets/ServiciosStreaming/icons8-chatear-96.png') },
  { id: '6', nombre: 'Amazon Prime', imagen: require('../assets/ServiciosStreaming/icons8-amazon-prime-video-96.png') },
  { id: '7', nombre: 'HBO Max', imagen: require('../assets/ServiciosStreaming/icons8-hbo-max-100.png') },
  { id: '8', nombre: 'YouTube Premium', imagen: require('../assets/ServiciosStreaming/icons8-youtube-96.png') },
  { id: '9', nombre: 'Wifi', imagen: require('../assets/ServiciosStreaming/wifi.png') },
  { id: '10', nombre: 'Redes Móviles', imagen: require('../assets/ServiciosStreaming/redes-moviles.png') },
];

// Planes específicos de cada suscripción
export const SUBSCRIPTION_PLANS = {
  'Netflix': [
    { label: 'Básico', value: 'Básico', price: 5940 },
    { label: 'Estándar', value: 'Estándar', price: 8320 },
    { label: 'Premium', value: 'Premium', price: 10700 },
  ],
  'Spotify': [
    { label: 'Individual', value: 'Individual', price: 4550 },
    { label: 'Duo', value: 'Duo', price: 5850 },
    { label: 'Familiar', value: 'Familiar', price: 7050 },
    { label: 'Estudiantes', value: 'Estudiantes', price: 2500 },
  ],
  'Disney+': [
    { label: 'Estándar', value: 'Estándar', price: 9900 },
    { label: 'Premium', value: 'Premium', price: 13500 },
  ],
  'Canva': [
    { label: 'Pro', value: 'Pro', price: 12490 },
    { label: 'Empresa', value: 'Empresa', price: 27990 },
  ],
  'ChatGPT Plus': [
    { label: 'Plus', value: 'Plus', price: 19500 },
    { label: 'Team', value: 'Team', price: 24300 },
  ],
  'Amazon Prime': [
    { label: 'Mensual', value: 'Mensual', price: 5790 },
  ],
  'HBO Max': [
    { label: 'Básico', value: 'Básico', price: 5990 },
    { label: 'Estándar', value: 'Estándar', price: 7990 },
    { label: 'Platino', value: 'Platino', price: 9900 },
  ],
  'YouTube Premium': [
    { label: 'Individual', value: 'Individual', price: 4100 },
    { label: 'Familiar', value: 'Familiar', price: 6150 },
  ],
  'Wifi': [
  ],
  'Redes Móviles': [
  ],
};
