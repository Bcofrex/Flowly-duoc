import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useRouter } from 'expo-router';

import styles from '../styles/views/index-user-styles';

export default function Perfil() {
  const router = useRouter(); 
  const [user, setUser] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@email.com',
    avatar: 'https://via.placeholder.com/100', 
  });

  // Función para cerrar sesión
  const handleLogout = () => {
    // Aquí puedes manejar la lógica de cierre de sesión
    router.push('/'); // Redirige al inicio de sesión
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Imagen del avatar del usuario */}
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.nombre}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Botón para editar perfil */}
      <Button title="Editar Perfil" onPress={() => alert('Editar perfil')} />

      {/* Botón para cerrar sesión */}
      <Button title="Cerrar Sesión" color="red" onPress={handleLogout} />
    </View>
  );
}


