import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

import { SubscriptionContext } from '../context/SubscriptionContext';
import { getAvailableSubscriptions, getSubscriptionPlans } from '../data/subscriptionData';

import styles from '../styles/components/add-subs-styles';

export function AddSubs() {
  const router = useRouter();
  const { agregarSuscripcion } = useContext(SubscriptionContext);

  const [nombre, setNombre] = useState('');
  const [costo, setCosto] = useState('');
  const [fecha, setFecha] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [availableSubscriptions, setAvailableSubscriptions] = useState([]);
  const [plan, setPlan] = useState('');
  const [availablePlans, setAvailablePlans] = useState([]);
  const [showCustomPlan, setShowCustomPlan] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const subscriptions = await getAvailableSubscriptions();
      setAvailableSubscriptions(subscriptions);
    };
    fetchSubscriptions();
  }, []);

  const selectSubscription = async (subscription) => {
    setSelectedSubscription(subscription);
    setModalVisible(false);
    setPlan('');
    setCosto('');
    const plans = await getSubscriptionPlans(subscription.nombre);
    setAvailablePlans(plans);
  };

  const handlePlanChange = (selectedPlan) => {
    setPlan(selectedPlan);
    const planInfo = availablePlans.find((p) => p.value === selectedPlan);

    if (planInfo && selectedPlan !== 'personalizado') {
      setCosto(planInfo.price.toString());
      setNombre(planInfo.label);
      setShowCustomPlan(false);
    } else {
      setShowCustomPlan(true);
    }
  };

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setFecha(currentDate.toISOString().split('T')[0]);
  };

  const handleSubmit = () => {
    if (!selectedSubscription || costo === '' || fecha === '') {
      setMensaje('Por favor, rellena todos los campos.');
      return;
    }

    const nuevaSuscripcion = {
      id: Math.random().toString(),
      nombre: selectedSubscription.nombre,
      precio: parseFloat(costo),
      fechaFacturacion: fecha,
      imagen: selectedSubscription.imagen,
    };

    agregarSuscripcion(nuevaSuscripcion);
    setMensaje(`Suscripción añadida: ${selectedSubscription.nombre} con un costo de $${costo}`);
    setSelectedSubscription(null);
    setCosto('');
    setFecha('');
    setPlan('');
    setShowCustomPlan(false);
    router.push('/subs');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.stepTitle}>Seleccionar Suscripción</Text>
      <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
        <Text>{selectedSubscription ? selectedSubscription.nombre : 'Seleccionar suscripción'}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Suscripciones disponibles</Text>
            <FlatList
              data={availableSubscriptions}
              keyExtractor={(item) => item.id}
              numColumns={3}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.subscriptionItem} onPress={() => selectSubscription(item)}>
                  <Image source={item.imagen} style={styles.subscriptionImage} />
                  <Text style={styles.subscriptionText}>{item.nombre}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Selecciona un Plan</Text>
        <Picker
          selectedValue={plan}
          onValueChange={handlePlanChange}
          style={styles.input}
        >
          <Picker.Item label="Seleccionar plan" value="" />
          {availablePlans.map((plan) => (
            <Picker.Item key={plan.value} label={`${plan.label} - CLP ${plan.price || 'Personalizado'}`} value={plan.value} />
          ))}
        </Picker>
      </View>

      {showCustomPlan && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Plan Personalizado</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del plan"
            value={nombre}
            onChangeText={(text) => setNombre(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Costo del plan"
            keyboardType="numeric"
            value={costo}
            onChangeText={(text) => setCosto(text)}
          />
        </View>
      )}

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Fecha de Facturación</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePicker}>{fecha || 'Seleccionar fecha de facturación'}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateSelect}
          />
        )}
      </View>

      <Button title="Agregar Suscripción" onPress={handleSubmit} />

      {mensaje ? <Text style={styles.message}>{mensaje}</Text> : null}
    </View>
  );
}
