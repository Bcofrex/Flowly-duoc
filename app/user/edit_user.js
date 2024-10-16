import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function EditarPerfil() {
  const router = useRouter(); // Para redirigir al perfil después de guardar

  // Estados para el nombre y el correo del usuario
  const [nombre, setNombre] = useState('Juan Pérez');
  const [email, setEmail] = useState('juan.perez@email.com');

  // Función para manejar el guardado de los datos
  const handleSave = () => {
    // Mostrar un mensaje de confirmación
    Alert.alert('Perfil actualizado', 'Los cambios han sido guardados con éxito', [
      { text: 'OK', onPress: () => router.push('/perfil') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      {/* Campo de texto para el nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
      />

      {/* Campo de texto para el correo */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Botón para guardar los cambios */}
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}

// Estilos para la vista de edición de perfil
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
