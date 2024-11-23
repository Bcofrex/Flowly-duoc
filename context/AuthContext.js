import React, { createContext, useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [user, setUser] = useState(null); // Información del usuario
  const router = useRouter();
  const segments = useSegments();

  // Inicio de sesión
  const login = ({ username, password }) => {
    if (username === 'Admin' && password === 'Admin') {
      setIsAuthenticated(true);
      setUser({ username });
      return { success: true };
    }
    return { success: false, message: 'Usuario o contraseña incorrectos.' };
  };  

  // Registro (simulado, listo para conectarse a backend)
  const signUp = ({ username, password }) => {
    // Esta lógica se puede conectar fácilmente a un backend
    if (username === 'Admin') {
      return { success: false, message: 'Este usuario ya está registrado.' };
    }
    return { success: true, message: 'Registro exitoso. Por favor inicia sesión.' };
  };

  // Cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    router.replace('/');
  };

  // Redirigir si no está autenticado
  useEffect(() => {
    const publicRoutes = ['login', 'signUp'];
    const currentRoute = segments[0] || 'login';

    if (!isAuthenticated && !publicRoutes.includes(currentRoute)) {
      router.replace('/');
    }
  }, [isAuthenticated, segments]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
