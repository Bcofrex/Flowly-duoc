import React, { useState, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, HelperText, Snackbar } from 'react-native-paper';

import { AuthContext } from '../../context/AuthContext';

import styles from '../styles/components/login-styles';

const LogIn = () => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [loading, setLoading] = useState(false); // Control de carga
  const [error, setError] = useState(null); // Manejo de errores en campos
  const [snackbarVisible, setSnackbarVisible] = useState(false); // Confirmación de éxito
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    setError(null); // Reinicia el error al intentar loguear

    if (!correoElectronico || !contrasenna) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await login({ correoElectronico, contrasenna });

      if (response.success) {
        setSnackbarVisible(true); // Muestra confirmación antes de redirigir
        setTimeout(() => router.replace('/subs'), 1500);
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
        error={!!error && !correoElectronico}
      />

      {/* Campo de contraseña */}
      <TextInput
        label="Contraseña"
        value={contrasenna}
        onChangeText={setContrasenna}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        left={<TextInput.Icon name="lock" />}
        error={!!error && !contrasenna}
      />
      <HelperText type="error" visible={!!error && !contrasenna}>
        La contraseña es obligatoria.
      </HelperText>

      {/* Botón de inicio de sesión */}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        loading={loading}
        disabled={loading}
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
      <HelperText type="error" visible={!!error && correoElectronico && contrasenna}>
        {error}
      </HelperText>

      {/* Snackbar de éxito */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={1500}
      >
        ¡Inicio de sesión exitoso!
      </Snackbar>
    </View>
  );
};

export default LogIn;
