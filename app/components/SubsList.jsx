import React, { useContext, useState } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

import { SubscriptionContext } from '../../context/SubscriptionContext';
import styles from '../styles/components/sub-list-styles';

// Función para formatear precios
const formatPrice = (price) => {
  if (typeof price !== 'number') return '0';
  return price.toLocaleString('es-CL');
};

// Función para extraer solo el día de la fecha
const extractDay = (fechaFacturacion) => {
  if (!fechaFacturacion) return 'N/A';
  const [day] = fechaFacturacion.split('-');
  return day;
};

const SubsList = () => {
  const router = useRouter();
  const { suscripciones, totalCostoMensual, refreshSubscriptions } = useContext(SubscriptionContext);
  const [refreshing, setRefreshing] = useState(false);

  // Función de Pull-to-Refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshSubscriptions();
    setRefreshing(false);
  };

  // Renderizar suscripciones
  const renderItem = ({ item }) => {
    const { nombre = 'Suscripción', precio = 0, fechaFacturacion = 'N/A', imagen } = item;

    return (
      <TouchableOpacity
        onPress={() => router.push(`/subs/details/${item.id}`)}
        activeOpacity={0.7}
        style={styles.subscriptionItem}
      >
        <Image source={imagen} style={styles.subscriptionImage} />
        <View style={styles.subscriptionInfo}>
          <Text style={styles.subscriptionName}>{nombre}</Text>
          <Text style={styles.subscriptionPrice}>${formatPrice(precio)} al mes</Text>
          <Text style={styles.subscriptionDate}>
            Facturación el día {extractDay(fechaFacturacion)} de cada mes
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {suscripciones.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tienes suscripciones. ¡Crea una nueva!</Text>
        </View>
      ) : (
        <FlatList
          data={suscripciones}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id || index.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* Botón flotante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/subs/add-subs')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total mensual: ${formatPrice(totalCostoMensual)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default SubsList;
