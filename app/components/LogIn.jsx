import React, { useState, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, HelperText, Snackbar } from 'react-native-paper';

import { AuthContext } from '../../context/AuthContext';

import styles from '../styles/components/login-styles';

const LogIn = () => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(''); // Error global
  const [snackbarVisible, setSnackbarVisible] = useState(false); // Confirmación de éxito
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const validateFields = () => {
    if (!correoElectronico.trim() || !contrasenna.trim()) {
      setError('Por favor, completa todos los campos.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError(''); // Reinicia el mensaje de error

    if (!validateFields()) {
      return;
    }

    setLoading(true);

    try {
      const response = await login({ correoElectronico, contrasenna });

      if (response.success) {
        setSnackbarVisible(true); // Muestra confirmación antes de redirigir
        setTimeout(() => router.replace('/subs'), 2000); // Redirige después de 2 segundos
      } else {
        setError(response.message || 'Credenciales inválidas.');
      }
    } catch (error) {
      setError('Hubo un problema con el servidor. Intenta nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      {/* Campo de correo electrónico */}
      <TextInput
        label="Correo Electrónico"
        value={correoElectronico}
        onChangeText={setCorreoElectronico}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon name="email" />}
        keyboardType="email-address"
        error={!!error && !correoElectronico.trim()}
      />

      {!correoElectronico.trim() && !!error && (
        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
          El correo electrónico es obligatorio.
        </Text>
      )}

      {/* Campo de contraseña */}
      <TextInput
        label="Contraseña"
        value={contrasenna}
        onChangeText={setContrasenna}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        left={<TextInput.Icon name="lock" />}
        error={!!error && !contrasenna.trim()}
      />
      <HelperText type="error" visible={!!error && !contrasenna.trim()}>
        La contraseña es obligatoria.
      </HelperText>

      {/* Botón de inicio de sesión */}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={[styles.button, (!correoElectronico.trim() || !contrasenna.trim() || loading) && styles.disabledButton]}
        loading={loading}
        disabled={!correoElectronico.trim() || !contrasenna.trim() || loading}
      >
        Iniciar Sesión
      </Button>

      {/* Botón para redirigir a registro */}
      <TouchableOpacity
        style={styles.registerLinkContainer}
        onPress={() => router.push('/signUp')}
      >
        <Text style={styles.registerLink}>
          ¿No tienes cuenta?{' '}
          <Text style={styles.registerLinkBold}>Regístrate aquí</Text>
        </Text>
      </TouchableOpacity>

      {/* Mensaje de error global */}
      <HelperText type="error" visible={!!error && correoElectronico.trim() && contrasenna.trim()}>
        {error}
      </HelperText>

      {/* Snackbar de éxito */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000} // Duración ajustada
      >
        ¡Inicio de sesión exitoso!
      </Snackbar>
    </View>
  );
};

export default LogIn;
