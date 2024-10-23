import React, { createContext, useState } from 'react';

// Crear el contexto
export const SubscriptionContext = createContext();

// Proveedor de suscripciones
export const SubscriptionProvider = ({ children }) => {
  const [suscripciones, setSuscripciones] = useState([]);
  const [totalCostoMensual, setTotalCostoMensual] = useState(0);

  // Función para agregar una nueva suscripción
  const agregarSuscripcion = (nuevaSuscripcion) => {
    setSuscripciones((prevSubs) => [...prevSubs, nuevaSuscripcion]);
    setTotalCostoMensual((prevTotal) => prevTotal + parseFloat(nuevaSuscripcion.precio));
  };

  return (
    <SubscriptionContext.Provider value={{ suscripciones, totalCostoMensual, agregarSuscripcion }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
