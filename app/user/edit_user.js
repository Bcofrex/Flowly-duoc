import React, { useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Avatar, Title } from 'react-native-paper';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import styles from '../styles/views/edit-user-styles';

export default function EditarPerfil() {
  const router = useRouter();

  // Estados para los datos del usuario
  const [nombre, setNombre] = useState('Juan Pérez');
  const [email, setEmail] = useState('juan.perez@email.com');
  const [avatarUri, setAvatarUri] = useState('https://via.placeholder.com/150');

  // Función para seleccionar imagen
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a tus fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  // Función para manejar el guardado de los datos
  const handleSave = () => {
    if (!nombre.trim() || !email.trim()) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Aquí iría la lógica para guardar los datos en el backend o contexto

    Alert.alert('Perfil actualizado', 'Los cambios han sido guardados con éxito', [
      {
        text: 'OK',
        onPress: () => router.push('/user/index'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Avatar del usuario */}
      <TouchableOpacity onPress={pickImage}>
        <Avatar.Image size={100} source={{ uri: avatarUri }} style={styles.avatar} />
      </TouchableOpacity>

      <Title style={styles.title}>Editar Perfil</Title>

      {/* Campo de texto para el nombre */}
      <TextInput
        label="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
        mode="outlined"
      />

      {/* Campo de texto para el correo */}
      <TextInput
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        mode="outlined"
      />

      {/* Botón para guardar los cambios */}
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Guardar
      </Button>
    </View>
  );
}