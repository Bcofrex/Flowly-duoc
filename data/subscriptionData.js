import { AVAILABLE_SUBSCRIPTIONS, SUBSCRIPTION_PLANS } from '../constants/subscriptions';

// Función asíncrona para obtener suscripciones disponibles (simula una llamada a una API o Firebase)
export const getAvailableSubscriptions = async () => {
  // Aquí se podría reemplazar con una llamada a Firebase en el futuro
  return AVAILABLE_SUBSCRIPTIONS;
};

// Función asíncrona para obtener los planes de suscripción
export const getSubscriptionPlans = async (subscriptionName) => {
  // Simula una llamada a Firebase o base de datos; en el futuro, podrías filtrar desde una base de datos en lugar de este archivo
  return SUBSCRIPTION_PLANS[subscriptionName] || [];
};
