import React, { useContext, useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { TextInput, Button, Text, Card, ActivityIndicator } from 'react-native-paper';

import { SubscriptionContext } from '../../../context/SubscriptionContext';
import styles from '../../styles/views/id-styles';

const SubscriptionDetails = () => {
  const { id } = useLocalSearchParams();
  const { suscripciones, editSubscription, deleteSubscription, refreshSubscriptions } = useContext(SubscriptionContext);
  const router = useRouter();
  const navigation = useNavigation();

  const [subscription, setSubscription] = useState(null);
  const [price, setPrice] = useState('');
  const [billingDate, setBillingDate] = useState('');
  const [loading, setLoading] = useState(true);

  // Buscar la suscripción seleccionada y actualizar el título
  useEffect(() => {
    const foundSub = suscripciones.find((sub) => sub.id === id);
    if (foundSub) {
      setSubscription(foundSub);
      setPrice(String(foundSub.precio));
      setBillingDate(foundSub.fechaFacturacion);
      navigation.setOptions({ title: foundSub.nombre });
    } else {
      setSubscription(null);
    }
    setLoading(false);
  }, [id, suscripciones, navigation]);

  // Validar los campos antes de guardar
  const validateFields = () => {
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      Alert.alert('Error', 'Por favor ingresa un precio válido.');
      return false;
    }
    if (!billingDate.match(/^\d{2}-\d{2}-\d{4}$/)) {
      Alert.alert('Error', 'La fecha debe tener el formato DD-MM-YYYY.');
      return false;
    }
    return true;
  };

  // Guardar los cambios en la suscripción
  const handleSave = async () => {
    if (!validateFields()) return;

    const updatedData = {
      precio: parseFloat(price),
      fechaFacturacion: billingDate,
    };

    try {
      await editSubscription(id, updatedData);
      await refreshSubscriptions(); // Actualizar lista principal
      Alert.alert('Éxito', 'Suscripción editada correctamente.', [
        { text: 'OK', onPress: () => router.push('/subs') },
      ]);
    } catch (error) {
      console.error('Error al actualizar la suscripción:', error);
      Alert.alert('Error', 'No se pudo actualizar la suscripción. Intenta nuevamente.');
    }
  };

  // Eliminar la suscripción
  const handleDelete = async () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta suscripción?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await deleteSubscription(id);
              await refreshSubscriptions(); // Actualizar lista principal
              Alert.alert('Eliminada', 'La suscripción ha sido eliminada.', [
                { text: 'OK', onPress: () => router.push('/subs') },
              ]);
            } catch (error) {
              console.error('Error al eliminar la suscripción:', error);
              Alert.alert('Error', 'No se pudo eliminar la suscripción. Intenta nuevamente.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#004080" />
      </View>
    );
  }

  if (!subscription) {
    return (
      <View style={styles.container}>
        <Text>No se encontró la suscripción seleccionada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Editar Suscripción" />
        <Card.Content>
          {/* Mostrar el nombre de la suscripción (no editable) */}
          <TextInput
            label="Nombre de la Suscripción"
            value={subscription.nombre}
            editable={false}
            style={styles.input}
            mode="outlined"
          />

          {/* Campo para editar el precio */}
          <TextInput
            label="Precio Mensual"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
          />

          {/* Campo para editar la fecha de facturación */}
          <TextInput
            label="Fecha de Facturación (DD-MM-YYYY)"
            value={billingDate}
            onChangeText={setBillingDate}
            style={styles.input}
            mode="outlined"
          />
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
            Guardar Cambios
          </Button>
          <Button mode="outlined" onPress={handleDelete} style={styles.deleteButton} color="red">
            Eliminar Suscripción
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default SubscriptionDetails;
