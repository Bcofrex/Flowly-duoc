import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../utils/apiClient';
import { AuthContext } from './AuthContext';
import { AVAILABLE_SUBSCRIPTIONS } from '../constants/subscriptions';

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Acceder al userId desde AuthContext
  const [suscripciones, setSuscripciones] = useState([]);
  const [totalCostoMensual, setTotalCostoMensual] = useState(0);

  // Cargar las suscripciones del usuario al inicio
  useEffect(() => {
    if (user?.id) {
      refreshSubscriptions();
    }
  }, [user]);

  // Función para obtener y enriquecer las suscripciones del usuario
  const refreshSubscriptions = async () => {
    if (!user?.id) return;
    try {
      const response = await apiClient.get(`/subscriptions/getSubs/${user.id}`);
      if (response.data.error) {
        setSuscripciones([]);
      } else {
        const enrichedSubscriptions = response.data.map((sub) => ({
          ...sub,
          imagen: getLocalImage(sub.nombre), // Asignar la imagen local basada en el nombre
        }));
        setSuscripciones(enrichedSubscriptions);
        calculateTotalCosto(enrichedSubscriptions);
      }
    } catch (error) {
      console.error('Error al obtener suscripciones:', error.message);
      setSuscripciones([]);
    }
  };

  // Función para obtener la imagen local basada en el nombre de la suscripción
  const getLocalImage = (nombre) => {
    if (!nombre) return require('../assets/ServiciosStreaming/default-subscription.png'); // Imagen predeterminada
    const subscription = AVAILABLE_SUBSCRIPTIONS.find((sub) => sub.nombre === nombre);
    return subscription?.imagen || require('../assets/ServiciosStreaming/default-subscription.png');
  };

  // Función para calcular el costo mensual total
  const calculateTotalCosto = (subscriptions) => {
    const total = subscriptions.reduce((sum, sub) => sum + (parseFloat(sub.precio) || 0), 0);
    setTotalCostoMensual(total);
  };

  // Función para agregar una nueva suscripción
  const agregarSuscripcion = async (nuevaSuscripcion) => {
    try {
      const response = await apiClient.post('/subscriptions/add', nuevaSuscripcion);
      const addedSub = {
        ...response.data,
        imagen: getLocalImage(response.data.nombre), // Asignar imagen local
      };
      const updatedSubs = [...suscripciones, addedSub];
      setSuscripciones(updatedSubs);
      calculateTotalCosto(updatedSubs);
    } catch (error) {
      console.error('Error al agregar suscripción:', error.message);
    }
  };

  // Función para editar una suscripción existente
  const editSubscription = async (id, updatedData) => {
    try {
      const response = await apiClient.put(`/subscriptions/update/${id}`, updatedData);
      const updatedSubs = suscripciones.map((sub) =>
        sub.id === id
          ? { ...sub, ...response.data, imagen: getLocalImage(response.data.nombre) }
          : sub
      );
      setSuscripciones(updatedSubs);
      calculateTotalCosto(updatedSubs);
    } catch (error) {
      console.error('Error al editar suscripción:', error.message);
    }
  };

  // Función para eliminar una suscripción
  const deleteSubscription = async (id) => {
    try {
      await apiClient.delete(`/subscriptions/delete/${id}`);
      const updatedSubs = suscripciones.filter((sub) => sub.id !== id);
      setSuscripciones(updatedSubs);
      calculateTotalCosto(updatedSubs);
    } catch (error) {
      console.error('Error al eliminar suscripción:', error.message);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        suscripciones,
        totalCostoMensual,
        agregarSuscripcion,
        editSubscription,
        deleteSubscription,
        refreshSubscriptions, // Método manual para actualizar la lista
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
