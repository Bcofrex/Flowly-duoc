import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

import styles from '../styles/components/login-styles';

export function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Para redirigir al Home después del inicio de sesión

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
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      {/* Campo de contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Botón de inicio de sesión */}
      <Button title="Iniciar Sesión" onPress={handleLogin} />

      {/* Mensaje de error */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
  
      {/* Información de inicio de sesión */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Credenciales temporales</Text>
        <Text style={styles.infoText}>Usuario: <Text style={styles.bold}>Admin</Text></Text>
        <Text style={styles.infoText}>Password: <Text style={styles.bold}>Admin</Text></Text>
      </View>
    </View>
  );
}

