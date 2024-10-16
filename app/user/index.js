import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

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

// Estilos para la vista de perfil
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
});
