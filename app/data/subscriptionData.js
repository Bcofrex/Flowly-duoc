
// Lista de suscripciones disponibles
export const availableSubscriptions = [
    { id: '1', nombre: 'Netflix', imagen: require('../../assets/ServiciosStreaming/icons8-netflix-96.png') },
    { id: '2', nombre: 'Spotify', imagen: require('../../assets/ServiciosStreaming/icons8-spotify-96.png') },
    { id: '3', nombre: 'Disney+', imagen: require('../../assets/ServiciosStreaming/icons8-disney-1-96.png') },
    { id: '4', nombre: 'Canva', imagen: require('../../assets/ServiciosStreaming/icons8-canva-96.png') },
    { id: '5', nombre: 'ChatGPT Plus', imagen: require('../../assets/ServiciosStreaming/icons8-chatear-96.png') },
  ];
  
  // Planes específicos de cada suscripción
  export const subscriptionPlans = {
    'Netflix': [
      { label: 'Básico', value: 'Básico', price: 6540 },
      { label: 'Estándar', value: 'Estándar', price: 9190 },
      { label: 'Premium', value: 'Premium', price: 11790 },
      { label: 'Personalizado', value: 'personalizado' }
    ],
    'Spotify': [
      { label: 'Individual', value: 'Individual', price: 4940 },
      { label: 'Duo', value: 'Duo', price: 6360 },
      { label: 'Familiar', value: 'Familiar', price: 8060 },
      { label: 'Personalizado', value: 'personalizado' }
    ],
    'Disney+': [
      { label: 'Estándar', value: 'Estándar', price: 7700 },
      { label: 'Premium', value: 'Premium', price: 10500 },
      { label: 'Personalizado', value: 'personalizado' }
    ],
    'Canva': [
      { label: 'Pro', value: 'Pro', price: 12490 },
      { label: 'Empresa', value: 'Empresa', price: 27990 },
      { label: 'Personalizado', value: 'personalizado' }
    ],
    'ChatGPT Plus': [
      { label: 'Plus', value: 'Plus', price: 20000 },
      { label: 'Personalizado', value: 'personalizado' }
    ],
  };
  