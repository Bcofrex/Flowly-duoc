import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';

import { AuthContext } from '../../context/AuthContext';

import styles from '../styles/components/login-styles';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    const response = login({ username, password });

    if (response.success) {
      router.replace('/subs'); 
    } else {
      Alert.alert('Error', response.message);
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

      {/* Botón de inicio de sesión */}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Iniciar Sesión
      </Button>

      {/* Botón para redirigir a registro */}
      <TouchableOpacity
        style={styles.registerLinkContainer}
        onPress={() => router.push('/signUp')}
      >
        <Text style={styles.registerLink}>
          ¿No tienes cuenta? <Text style={styles.registerLinkBold}>Regístrate aquí</Text>
        </Text>
      </TouchableOpacity>

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
