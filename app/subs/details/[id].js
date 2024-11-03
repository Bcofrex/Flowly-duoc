import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';

import { SubscriptionContext } from '../../context/SubscriptionContext'; 

const SubscriptionDetails = () => {
  const { id } = useLocalSearchParams();
  const { suscripciones, editSubscription, deleteSubscription } = useContext(SubscriptionContext);
  const router = useRouter();
  const navigation = useNavigation(); 

  const [subscription, setSubscription] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // Buscar la suscripción seleccionada y actualizar el título
  useEffect(() => {
    const foundSub = suscripciones.find((sub) => sub.id === id);
    if (foundSub) {
      setSubscription(foundSub);
      setName(foundSub.nombre);
      setPrice(String(foundSub.precio));
      navigation.setOptions({ title: foundSub.nombre });
    } else {
      setSubscription(null);
    }
  }, [id, suscripciones, navigation]);

  // Guardar los cambios en la suscripción
  const handleSave = () => {
    if (!name || !price) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const updatedData = { nombre: name, precio: parseFloat(price) };
    editSubscription(id, updatedData);
    Alert.alert('Éxito', 'Suscripción editada correctamente', [
      { text: 'OK', onPress: () => router.push('/subs') }
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
              { text: 'OK', onPress: () => router.push('/subs') }
            ]);
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (!subscription) {
    return <Text>No se encontró la suscripción seleccionada.</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Editar suscripción</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nombre de la suscripción"
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Precio mensual"
        keyboardType="numeric"
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <Button title="Guardar cambios" onPress={handleSave} />
      <Button title="Eliminar suscripción" onPress={handleDelete} color="red" />
    </View>
  );
};

export default SubscriptionDetails;
