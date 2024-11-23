import React, { useState, useContext } from 'react';
import { View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';

import { AuthContext } from '../../context/AuthContext';
import styles from '../styles/components/sign-up-styles';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useContext(AuthContext);
  const router = useRouter();

  // Validaciones básicas
  const isEmailValid = email.includes('@');
  const isPasswordValid = password.length >= 6;
  const isPasswordMatch = password === confirmPassword;

  const handleRegister = () => {
    // Validaciones
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    if (!isEmailValid) {
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

    // Llamar a la función de registro del contexto
    setLoading(true);
    const response = signUp({ username, email, password });

    if (response.success) {
      Alert.alert(
        'Registro exitoso',
        response.message,
        [{ text: 'OK', onPress: () => router.replace('/login') }] // Redirigir al login
      );
    } else {
      Alert.alert('Error', response.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regístrate</Text>

      {/* Campo de nombre de usuario */}
      <TextInput
        label="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        style={styles.input}
      />

      {/* Campo de correo electrónico */}
      <TextInput
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
      />
      <HelperText type="error" visible={email && !isEmailValid}>
        Ingresa un correo válido.
      </HelperText>

      {/* Campo de contraseña */}
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />
      <HelperText type="error" visible={password && !isPasswordValid}>
        La contraseña debe tener al menos 6 caracteres.
      </HelperText>

      {/* Campo de confirmación de contraseña */}
      <TextInput
        label="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />
      <HelperText type="error" visible={confirmPassword && !isPasswordMatch}>
        Las contraseñas no coinciden.
      </HelperText>

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
