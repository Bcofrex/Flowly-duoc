import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

import { SubscriptionContext } from '../context/SubscriptionContext';
import { getAvailableSubscriptions, getSubscriptionPlans } from '../data/subscriptionData';

import styles from '../styles/components/add-subs-styles';

// Función para formatear precios con puntos en los miles
const formatPrice = (price) => {
  if (!price) return '';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const AddSubs = () => {
  const router = useRouter();
  const { agregarSuscripcion } = useContext(SubscriptionContext);

  const [nombre, setNombre] = useState('');
  const [costo, setCosto] = useState('');
  const [fecha, setFecha] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [dayPickerVisible, setDayPickerVisible] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [availableSubscriptions, setAvailableSubscriptions] = useState([]);
  const [plan, setPlan] = useState('');
  const [availablePlans, setAvailablePlans] = useState([]);
  const [showCustomPlan, setShowCustomPlan] = useState(false);

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
      setCosto(formatPrice(planInfo.price));
      setNombre(planInfo.label);
      setShowCustomPlan(false);
      setPlanModalVisible(false);
    } else {
      setNombre('');
      setCosto('');
      setShowCustomPlan(true);
    }
  };

  const handleSubmit = () => {
    if (!selectedSubscription || costo === '' || fecha === '') {
      setMensaje('Por favor, rellena todos los campos.');
      return;
    }

    const nuevaSuscripcion = {
      id: Math.random().toString(),
      nombre: selectedSubscription.nombre,
      precio: parseFloat(costo.replace(/\./g, '')),
      fechaFacturacion: fecha,
      imagen: selectedSubscription.imagen,
    };

    agregarSuscripcion(nuevaSuscripcion);
    setMensaje(`Suscripción añadida: ${selectedSubscription.nombre} con un costo de $${costo}`);
    resetForm();
    router.push('/subs');
  };

  const resetForm = () => {
    setSelectedSubscription(null);
    setCosto('');
    setFecha('');
    setPlan('');
    setShowCustomPlan(false);
  };

  return (
    <View style={styles.container}>
      {/* Selector de suscripción */}
      <Text style={styles.stepTitle}>Seleccionar Suscripción</Text>
      <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
        <Text>{selectedSubscription ? selectedSubscription.nombre : 'Seleccionar suscripción'}</Text>
      </TouchableOpacity>

      {/* Modal para mostrar suscripciones disponibles */}
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

      {/* Botón para abrir el modal del selector de plan */}
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Selecciona un Plan</Text>
        <TouchableOpacity style={styles.selectButton} onPress={() => setPlanModalVisible(true)}>
          <Text>{plan ? `Plan seleccionado: ${plan}` : 'Seleccionar plan'}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para seleccionar el plan de la suscripción */}
      <Modal visible={planModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Plan</Text>
            <Picker
              selectedValue={plan}
              onValueChange={handlePlanChange}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar plan" value="" />
              {availablePlans.map((plan) => (
                <Picker.Item key={plan.value} label={`${plan.label} - CLP ${formatPrice(plan.price) || 'Personalizado'}`} value={plan.value} />
              ))}
            </Picker>
            <Button title="Cerrar" onPress={() => setPlanModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Campos para el plan personalizado */}
      {showCustomPlan && (
        <Modal visible={showCustomPlan} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
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
                onChangeText={(text) => setCosto(formatPrice(text.replace(/\./g, '')))}
              />
              <Button title="Cerrar" onPress={() => setShowCustomPlan(false)} />
            </View>
          </View>
        </Modal>
      )}

      {/* Selector de día de facturación en modal */}
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Día de Facturación</Text>
        <TouchableOpacity onPress={() => setDayPickerVisible(true)} style={styles.selectButton}>
          <Text>{fecha || 'Seleccionar día de facturación'}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={dayPickerVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona el Día de Facturación</Text>
            <FlatList
              data={[...Array(31)].map((_, i) => ({ day: i + 1 }))}
              numColumns={5}
              keyExtractor={(item) => item.day.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dayItem,
                    fecha === item.day.toString() && styles.dayItemSelected,
                  ]}
                  onPress={() => {
                    setFecha(item.day.toString());
                    setDayPickerVisible(false);
                  }}
                >
                  <Text style={styles.dayText}>{item.day}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.dayPickerContainer}
            />
            <Button title="Cerrar" onPress={() => setDayPickerVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Botón para agregar la suscripción */}
      <Button title="Agregar Suscripción" onPress={handleSubmit} />
      {mensaje ? <Text style={styles.message}>{mensaje}</Text> : null}
    </View>
  );
}

export default AddSubs;
