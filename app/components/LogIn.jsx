import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';

import styles from '../styles/components/login-styles';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [error, setError] = useState('');

  const handleLogin = () => {
    // Validación simple de inicio de sesión
    if (username === 'Admin' && password === 'Admin') {
      // Redirige al Home después del inicio de sesión exitoso
      router.push('/subs');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      {/* Campo de usuario */}
      <TextInput
        label="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon name="account" />}
      />

      {/* Campo de contraseña */}
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        left={<TextInput.Icon name="lock" />}
      />

      {/* Mensaje de error */}
      {error ? <HelperText type="error">{error}</HelperText> : null}

      {/* Botón de inicio de sesión */}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Iniciar Sesión
      </Button>

      {/* Información de inicio de sesión */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Credenciales temporales</Text>
        <Text style={styles.infoText}>
          Usuario: <Text style={styles.bold}>Admin</Text>
        </Text>
        <Text style={styles.infoText}>
          Contraseña: <Text style={styles.bold}>Admin</Text>
        </Text>
      </View>
    </View>
  );
};

export default LogIn;