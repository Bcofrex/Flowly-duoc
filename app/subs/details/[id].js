import React, { useContext, useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { TextInput, Button, Text, Card, ActivityIndicator } from 'react-native-paper';

import { SubscriptionContext } from '../../../context/SubscriptionContext';

import styles from '../../styles/views/id-styles';

const SubscriptionDetails = () => {
  const { id } = useLocalSearchParams();
  const { suscripciones, editSubscription, deleteSubscription } = useContext(SubscriptionContext);
  const router = useRouter();
  const navigation = useNavigation();

  const [subscription, setSubscription] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [billingDate, setBillingDate] = useState('');
  const [loading, setLoading] = useState(true);

  // Buscar la suscripción seleccionada y actualizar el título
  useEffect(() => {
    const foundSub = suscripciones.find((sub) => sub.id === id);
    if (foundSub) {
      setSubscription(foundSub);
      setName(foundSub.nombre);
      setPrice(String(foundSub.precio));
      setBillingDate(foundSub.fechaFacturacion);
      navigation.setOptions({ title: foundSub.nombre });
    } else {
      setSubscription(null);
    }
    setLoading(false);
  }, [id, suscripciones, navigation]);

  // Guardar los cambios en la suscripción
  const handleSave = () => {
    if (!name || !price || !billingDate) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const updatedData = {
      nombre: name,
      precio: parseFloat(price),
      fechaFacturacion: billingDate,
    };
    editSubscription(id, updatedData);
    Alert.alert('Éxito', 'Suscripción editada correctamente', [
      { text: 'OK', onPress: () => router.push('/subs') },
    ]);
  };

  // Eliminar la suscripción
  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta suscripción?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            deleteSubscription(id);
            Alert.alert('Eliminada', 'La suscripción ha sido eliminada', [
              { text: 'OK', onPress: () => router.push('/subs') },
            ]);
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
          {/* Campo para editar el nombre de la suscripción */}
          <TextInput
            label="Nombre de la Suscripción"
            value={name}
            onChangeText={setName}
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
            label="Fecha de Facturación"
            value={billingDate}
            onChangeText={setBillingDate}
            keyboardType="numeric"
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