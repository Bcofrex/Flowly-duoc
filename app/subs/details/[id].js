import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { subscriptionPlans } from '../../data/subscriptionData';
import { SubscriptionContext } from '../../context/SubscriptionContext';

const SubscriptionDetails = () => {
  const { suscripciones, editSubscription, deleteSubscription } = useContext(SubscriptionContext);
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const subscription = suscripciones.find((sub) => sub.id === id);
  const availablePlans = subscription ? subscriptionPlans[subscription.nombre] || [] : [];

  // Estados locales para los valores del formulario
  const [planType, setPlanType] = useState(subscription?.planType || '');
  const [customPrice, setCustomPrice] = useState(subscription?.precio?.toString() || '');
  const [billingDate, setBillingDate] = useState(subscription?.fechaFacturacion || '');
  const [showCustomPlan, setShowCustomPlan] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (subscription) {
      navigation.setOptions({ title: subscription.nombre });
    }
  }, [subscription, navigation]);

  const handleSave = () => {
    if (planType && (customPrice || !showCustomPlan) && billingDate) {
      editSubscription(id, {
        planType,
        precio: showCustomPlan ? parseFloat(customPrice) : availablePlans.find(p => p.value === planType)?.price,
        fechaFacturacion: billingDate,
      });
      Alert.alert('Éxito', 'Suscripción actualizada correctamente', [
        { text: 'OK', onPress: () => router.replace('/subs') },
      ]);
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos.');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Suscripción',
      '¿Estás seguro de que deseas eliminar esta suscripción?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
            deleteSubscription(id);
            setTimeout(() => {
              router.replace('/subs');
            }, 100); 
          }
        }
      ]
    );
  };

  if (!subscription) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de {subscription?.nombre}</Text>

      <Text style={styles.label}>Tipo de Plan</Text>
      <Picker
        selectedValue={planType}
        onValueChange={(value) => {
          setPlanType(value);
          if (value !== 'personalizado') {
            const selectedPlan = availablePlans.find(p => p.value === value);
            setCustomPrice(selectedPlan?.price.toString() || '');
            setShowCustomPlan(false);
          } else {
            setShowCustomPlan(true);
          }
        }}
        style={styles.input}
      >
        <Picker.Item label="Seleccionar plan" value="" />
        {availablePlans.map((plan) => (
          <Picker.Item key={plan.value} label={`${plan.label} - CLP ${plan.price || 'Personalizado'}`} value={plan.value} />
        ))}
      </Picker>

      {showCustomPlan && (
        <TextInput
          style={styles.input}
          value={customPrice}
          onChangeText={setCustomPrice}
          placeholder="Costo Personalizado"
          keyboardType="numeric"
        />
      )}

      <Text style={styles.label}>Fecha de Facturación</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePicker}>{billingDate || 'Seleccionar fecha de facturación'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
        value={new Date(billingDate || Date.now())}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            const adjustedDate = new Date(
              selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
            ).toISOString().split('T')[0];
            setBillingDate(adjustedDate);
          }
          setShowDatePicker(false);
        }}
      />
      
      )}

      <Button title="Guardar Cambios" onPress={handleSave} />
      <Button title="Eliminar Suscripción" onPress={handleDelete} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  datePicker: {
    fontSize: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
  },
});

export default SubscriptionDetails;
