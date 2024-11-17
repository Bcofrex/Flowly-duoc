import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Avatar, Title, Paragraph, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

import styles from '../styles/views/index-user-styles';

export default function Perfil() {
  const router = useRouter();

  // Estado para los datos del usuario
  const [user, setUser] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    avatar: 'https://via.placeholder.com/150',
  });

  // Simulación de la obtención de datos del backend
  useEffect(() => {
    // Aquí puedes hacer una llamada al backend para obtener los datos del usuario
    // Por ejemplo:
    // fetchUserData().then(data => setUser(data));

    // Por ahora, mantenemos los datos predeterminados
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    // Aquí puedes manejar la lógica de cierre de sesión, como limpiar tokens, etc.
    router.push('/'); // Redirige al inicio de sesión
  };

  return (
    <View style={styles.container}>
      {/* Avatar del usuario */}
      <Avatar.Image size={120} source={{ uri: user.avatar }} style={styles.avatar} />

      {/* Nombre y correo del usuario */}
      <Title style={styles.name}>{user.nombre}</Title>
      <Paragraph style={styles.email}>{user.email}</Paragraph>

      {/* Botón para editar perfil */}
      <Button
        mode="contained"
        onPress={() => router.push('/user/edit_user')}
        style={styles.button}
      >
        Editar Perfil
      </Button>

      {/* Botón para cerrar sesión */}
      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.button}
      >
        Cerrar Sesión
      </Button>
    </View>
  );
}