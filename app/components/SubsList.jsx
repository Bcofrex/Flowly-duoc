import React, { useContext } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

import { SubscriptionContext } from '../context/SubscriptionContext'; 

import styles from '../styles/components/sub-list-styles';

export function SubsList() {
  const router = useRouter();
  const { suscripciones, totalCostoMensual } = useContext(SubscriptionContext);

  // Renderiza cada suscripción con enlace a la vista de detalles
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/subs/details/${item.id}`)}
      activeOpacity={0.7}
      style={styles.subscriptionItem}
    >
      <Image source={item.imagen} style={styles.subscriptionImage} />
      <View style={styles.subscriptionInfo}>
        <Text style={styles.subscriptionName}>{item.nombre}</Text>
        <Text style={styles.subscriptionPrice}>${item.precio} al mes</Text>
        <Text style={styles.subscriptionDate}>Próxima facturación: {item.fechaFacturacion}</Text>
      </View>
    </TouchableOpacity>
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
        <Text style={styles.totalText}>Total mensual: ${totalCostoMensual}</Text>
      </View>
    </SafeAreaView>
  );
}

