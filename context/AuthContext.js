import React, { createContext, useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../utils/apiClient';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const segments = useSegments();

  // Cargar estado inicial desde AsyncStorage
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedAuthState = await AsyncStorage.getItem('isAuthenticated');

        if (storedUserId && storedAuthState === 'true') {
          const userResponse = await apiClient.get(`/users/getInfo/${storedUserId}`);
          setUser({ id: storedUserId, ...userResponse.data }); // Asignar el UID
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error al cargar el estado de autenticación:', error);
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    loadAuthState();
  }, []);

  // Registro de usuario
  const signUp = async ({ nombre, apellido, correoElectronico, contrasenna }) => {
    try {
      const response = await apiClient.post('/users/register', {
        nombre,
        apellido,
        correoElectronico,
        contrasenna,
      });

      const { userId } = response.data;
      const userResponse = await apiClient.get(`/users/getInfo/${userId}`);
      setUser({ id: userId, ...userResponse.data }); // Asignar el UID
      setIsAuthenticated(true);

      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('isAuthenticated', 'true');

      return { success: true, message: 'Registro exitoso' };
    } catch (error) {
      console.error('Error en el método signUp:', error);
      return { success: false, message: 'Error al registrarse. Intenta nuevamente.' };
    }
  };

  // Inicio de sesión
  const login = async ({ correoElectronico, contrasenna }) => {
    try {
      const response = await apiClient.post('/users/login', { correoElectronico, contrasenna });

      if (response.data?.uid) {
        const userResponse = await apiClient.get(`/users/getInfo/${response.data.uid}`);
        setUser({ id: response.data.uid, ...userResponse.data }); // Asignar el UID
        setIsAuthenticated(true);

        await AsyncStorage.setItem('userId', response.data.uid);
        await AsyncStorage.setItem('isAuthenticated', 'true');

        return { success: true };
      } else {
        throw new Error('UID no devuelto por el servidor.');
      }
    } catch (error) {
      console.error('Error en el método login:', error);
      return { success: false, message: 'Usuario o contraseña incorrectos.' };
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);

      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('isAuthenticated');

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
