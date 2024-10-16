import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  // Data dummy de suscripciones
  const suscripciones = [
    {
      id: '1',
      nombre: 'Netflix',
      precio: 12.99,
      fechaFacturacion: '2024-11-01',
      imagen: 'https://via.placeholder.com/100',
    },
    {
      id: '2',
      nombre: 'Spotify',
      precio: 9.99,
      fechaFacturacion: '2024-11-05',
      imagen: 'https://via.placeholder.com/100',
    },
    {
      id: '3',
      nombre: 'Disney+',
      precio: 7.99,
      fechaFacturacion: '2024-11-10',
      imagen: 'https://via.placeholder.com/100',
    },
    {
      id: '4',
      nombre: 'Canva',
      precio: 12.95,
      fechaFacturacion: '2024-11-15',
      imagen: 'https://via.placeholder.com/100',
    },
    {
      id: '5',
      nombre: 'ChatGPT Plus',
      precio: 20.00,
      fechaFacturacion: '2024-11-20',
      imagen: 'https://via.placeholder.com/100',
    },
  ];

  // Función que renderiza cada suscripción
  const renderItem = ({ item }) => (
    <View style={styles.subscriptionItem}>
      <Image source={{ uri: item.imagen }} style={styles.subscriptionImage} />
      <View style={styles.subscriptionInfo}>
        <Text style={styles.subscriptionName}>{item.nombre}</Text>
        <Text style={styles.subscriptionPrice}>${item.precio} al mes</Text>
        <Text style={styles.subscriptionDate}>Próxima facturación: {item.fechaFacturacion}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Lista de suscripciones */}
      <FlatList
        data={suscripciones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Botón flotante para crear suscripción */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/subs/new_sub')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    padding: 20,
  },
  subscriptionItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  subscriptionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  subscriptionInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  subscriptionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subscriptionPrice: {
    fontSize: 16,
    color: '#666',
  },
  subscriptionDate: {
    fontSize: 14,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
