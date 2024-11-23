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
  const signUp = async ({ nombre, apellido, correoElectronico, contrasenna }) => {
    try {
      const response = await apiClient.post('/users/register', {
        nombre,
        apellido,
        correoElectronico,
        contrasenna,
      });

      // Usuario registrado correctamente
      setUser(response.data);
      setIsAuthenticated(true);
      return { success: true, message: 'Registro exitoso' };
    } catch (error) {
      console.error('Error en el método signUp:', error);
      const errorMessage =
        error.response?.data?.message || 'Error al registrarse. Intenta nuevamente.';
      return { success: false, message: errorMessage };
    }
  };

  // Inicio de sesión
  const login = async ({ userId }) => {
    try {
      // Recuperar datos del usuario desde el backend
      const userResponse = await apiClient.get(`/users/${userId}`);
      console.log('Datos del usuario obtenidos del backend:', userResponse.data);

      // Establecer el estado de usuario y autenticación
      setUser(userResponse.data);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error('Error en el método login:', error);
      const errorMessage =
        error.response?.data?.error || 'Usuario o contraseña incorrectos.';
      return { success: false, message: errorMessage };
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  // Redirigir si no está autenticado
  useEffect(() => {
    const publicRoutes = ['signUp'];
    const currentRoute = segments[0] || '/';

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
