import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CrearSuscripcion() {
  // Estados para los valores del formulario
  const [nombre, setNombre] = useState('');
  const [costo, setCosto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [fecha, setFecha] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (nombre === '' || costo === '' || fecha === '') {
      setMensaje('Por favor, rellena todos los campos.');
      return;
    }
    setMensaje(`Suscripción añadida: ${nombre} con un costo de $${costo}`);
    setNombre('');
    setCosto('');
    setFecha('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nueva Suscripción</Text>
      

      <TextInput
        style={styles.input}
        placeholder="Servicio"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Costo mensual ej: 4500"
        keyboardType="numeric"
        value={costo}
        onChangeText={(text) => setCosto(text)}
      />

<TextInput
        style={styles.input}
        placeholder="Fecha de facturación"
        keyboardType="numeric"
        value={fecha}
        onChangeText={(text) => setCosto(text)}
      />


      <Button title="Agregar Suscripción" onPress={handleSubmit} />

      {mensaje ? <Text style={styles.message}>{mensaje}</Text> : null}
    </View>
  );
}

// Estilos para el formulario
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
  message: {
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
  },
});
