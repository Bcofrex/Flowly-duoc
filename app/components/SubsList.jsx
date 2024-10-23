import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { SubscriptionContext } from '../context/SubscriptionContext'; // Importar el contexto
import { useRouter } from 'expo-router';

export function SubsList() {
  const router = useRouter();
  const { suscripciones, totalCostoMensual } = useContext(SubscriptionContext); // Usar el contexto

  // Función que renderiza cada suscripción
  const renderItem = ({ item }) => (
    <View style={styles.subscriptionItem}>
      <Image source={item.imagen} style={styles.subscriptionImage} />
      <View style={styles.subscriptionInfo}>
        <Text style={styles.subscriptionName}>{item.nombre}</Text>
        <Text style={styles.subscriptionPrice}>${item.precio} al mes</Text>
        <Text style={styles.subscriptionDate}>Próxima facturación: {item.fechaFacturacion}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Mostrar mensaje si no hay suscripciones */}
      {suscripciones.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tienes suscripciones. ¡Crea una nueva!</Text>
        </View>
      ) : (
        <FlatList
          data={suscripciones}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Botón flotante para agregar una nueva suscripción */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/subs/add-subs')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Footer con el total de los costos mensuales */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total mensual: ${totalCostoMensual.toFixed(2)}</Text>
      </View>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    padding: 24,
    backgroundColor: "#f8f8f8",
  },
  listContent: {
    padding: 20,
  },
  subscriptionItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  subscriptionImage: {
    width: 40,
    height: 40,
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
    bottom: 80, // Espacio para que no choque con el footer
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
