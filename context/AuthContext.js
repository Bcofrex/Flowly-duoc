import React, { createContext, useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import apiClient from '../utils/apiClient';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const segments = useSegments();

  // Registro de usuario
  const signUp = async (email, password) => {
    try {
      const response = await apiClient.post('/users/register', { email, password });
      setUser(response.data);
      setIsAuthenticated(true);
      return { success: true, message: 'Registro exitoso' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error al registrarse' };
    }
  };

  // Inicio de sesión
  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/users/login', { email, password });
      setUser(response.data);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Usuario o contraseña incorrectos' };
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      await apiClient.post('/users/logout');
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  // Redirigir si no está autenticado
  useEffect(() => {
    const publicRoutes = ['login', 'signUp'];
    const currentRoute = segments[0] || 'login';

    if (!isAuthenticated && !publicRoutes.includes(currentRoute)) {
      router.replace('/login');
    }
  }, [isAuthenticated, segments]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
