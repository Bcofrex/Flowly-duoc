import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';

import { AuthContext } from '../../context/AuthContext';

import styles from '../styles/components/login-styles';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleLogin = () => {

    const success = login({ username, password });

    if (success) {
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