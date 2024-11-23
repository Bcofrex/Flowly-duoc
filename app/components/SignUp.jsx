import React, { useState, useContext } from 'react';
import { View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';

import { AuthContext } from '../../context/AuthContext';
import styles from '../styles/components/sign-up-styles';

const RegisterScreen = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useContext(AuthContext);
  const router = useRouter();

  const isPasswordValid = contrasenna.length >= 6;
  const isPasswordMatch = contrasenna === confirmPassword;

  const handleRegister = async () => {
    if (!nombre || !apellido || !correoElectronico || !contrasenna || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    if (!correoElectronico.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (!isPasswordValid) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (!isPasswordMatch) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    const response = await signUp({ nombre, apellido, correoElectronico, contrasenna });

    if (response.success) {
      Alert.alert('Registro exitoso', response.message, [
        { text: 'OK', onPress: () => router.replace('/') },
      ]);
    } else {
      Alert.alert('Error', response.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regístrate</Text>

      {/* Campo de nombre */}
      <TextInput
        label="Nombre"
        value={nombre}
        onChangeText={setNombre}
        mode="outlined"
        style={styles.input}
      />

      {/* Campo de apellido */}
      <TextInput
        label="Apellido"
        value={apellido}
        onChangeText={setApellido}
        mode="outlined"
        style={styles.input}
      />

      {/* Campo de correo electrónico */}
      <TextInput
        label="Correo Electrónico"
        value={correoElectronico}
        onChangeText={setCorreoElectronico}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
      />

      {/* Campo de contraseña */}
      <TextInput
        label="Contraseña"
        value={contrasenna}
        onChangeText={setContrasenna}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />

      {/* Campo de confirmación de contraseña */}
      <TextInput
        label="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />

      {/* Botón de registro */}
      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Registrarse
      </Button>

      {/* Redirección al login */}
      <Button
        mode="text"
        onPress={() => router.push('/')}
        style={styles.textButton}
      >
        ¿Ya tienes una cuenta? Inicia sesión
      </Button>
    </View>
  );
};

export default RegisterScreen;
