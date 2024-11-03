import React, { createContext, useState } from 'react';

// Crear el contexto
export const SubscriptionContext = createContext();

// Proveedor de suscripciones
export const SubscriptionProvider = ({ children }) => {
  const [suscripciones, setSuscripciones] = useState([]); // Inicializar vacío
  const [totalCostoMensual, setTotalCostoMensual] = useState(0);

  // Función para agregar una nueva suscripción
  const agregarSuscripcion = (nuevaSuscripcion) => {
    setSuscripciones((prevSubs) => [...prevSubs, nuevaSuscripcion]);
    setTotalCostoMensual((prevTotal) => prevTotal + parseFloat(nuevaSuscripcion.precio));
  };

  // Función para editar una suscripción existente
  const editSubscription = (id, updatedData) => {
    setSuscripciones((prevSubs) =>
      prevSubs.map((sub) => (sub.id === id ? { ...sub, ...updatedData } : sub))
    );
    setTotalCostoMensual((prevTotal) => {
      const oldSub = suscripciones.find((sub) => sub.id === id);
      return oldSub && updatedData.precio !== undefined
        ? prevTotal - oldSub.precio + parseFloat(updatedData.precio)
        : prevTotal;
    });
  };

  // Función para eliminar una suscripción
  const deleteSubscription = (id) => {
    const subToDelete = suscripciones.find((sub) => sub.id === id);
    if (subToDelete) {
      setSuscripciones((prevSubs) => prevSubs.filter((sub) => sub.id !== id));
      setTotalCostoMensual((prevTotal) => prevTotal - subToDelete.precio);
    }
  };

  return (
    <SubscriptionContext.Provider value={{
      suscripciones,  // Solo contiene suscripciones añadidas por el usuario
      totalCostoMensual,
      agregarSuscripcion,
      editSubscription,
      deleteSubscription
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
