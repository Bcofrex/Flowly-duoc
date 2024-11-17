import React, { useState, useContext, useEffect } from 'react';
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, RadioButton, HelperText, Avatar } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { SubscriptionContext } from '../../context/SubscriptionContext';
import { getAvailableSubscriptions, getSubscriptionPlans } from '../../data/subscriptionData';

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
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
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
      setPlanModalVisible(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedSubscription || costo === '' || fecha === '') {
      setError('Por favor, rellena todos los campos.');
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
    resetForm();
    router.push('/subs');
  };

  const resetForm = () => {
    setSelectedSubscription(null);
    setCosto('');
    setFecha('');
    setPlan('');
    setShowCustomPlan(false);
    setError('');
  };

  // Funciones para el DatePicker
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    const day = date.getDate();
    setFecha(day.toString());
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      {/* Selector de suscripción */}
      <Text style={styles.stepTitle}>Seleccionar Suscripción</Text>
      <Button
        mode="outlined"
        onPress={() => setModalVisible(true)}
        style={styles.selectButton}
      >
        {selectedSubscription ? selectedSubscription.nombre : 'Seleccionar suscripción'}
      </Button>

      {/* Modal para mostrar suscripciones disponibles */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Suscripciones disponibles</Text>
            <ScrollView contentContainerStyle={styles.subscriptionList}>
              {availableSubscriptions.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.subscriptionItem}
                  onPress={() => selectSubscription(item)}
                >
                  <Avatar.Image
                    source={item.imagen}
                    size={60}
                    style={styles.subscriptionImage}
                  />
                  <Text style={styles.subscriptionText}>{item.nombre}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button onPress={() => setModalVisible(false)}>Cerrar</Button>
          </View>
        </View>
      </Modal>

      {/* Botón para abrir el modal del selector de plan */}
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Selecciona un Plan</Text>
        <Button
          mode="outlined"
          onPress={() => setPlanModalVisible(true)}
          style={styles.selectButton}
          disabled={!selectedSubscription}
        >
          {plan ? `Plan seleccionado: ${plan}` : 'Seleccionar plan'}
        </Button>
      </View>

      {/* Modal para seleccionar el plan de la suscripción */}
      <Modal visible={planModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Plan</Text>
            <RadioButton.Group onValueChange={handlePlanChange} value={plan}>
              <ScrollView>
                {availablePlans.map((plan) => (
                  <RadioButton.Item
                    key={plan.value}
                    label={`${plan.label} - CLP $${formatPrice(plan.price)}`}
                    value={plan.value}
                  />
                ))}
                <RadioButton.Item label="Personalizado" value="personalizado" />
              </ScrollView>
            </RadioButton.Group>
            <Button onPress={() => setPlanModalVisible(false)}>Cerrar</Button>
          </View>
        </View>
      </Modal>

      {/* Campos para el plan personalizado */}
      {showCustomPlan && (
        <View style={styles.stepContainer}>
          <TextInput
            label="Nombre del plan"
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Costo del plan"
            value={costo}
            onChangeText={(text) => setCosto(formatPrice(text.replace(/\./g, '')))}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
          />
        </View>
      )}

      {/* Selector de día de facturación */}
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Día de Facturación</Text>
        <Button
          mode="outlined"
          onPress={showDatePicker}
          style={styles.selectButton}
        >
          {fecha ? `Día ${fecha}` : 'Seleccionar día de facturación'}
        </Button>
      </View>

      {/* DateTimePickerModal para seleccionar la fecha */}
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display="spinner"
        locale="es-ES"
        headerTextIOS="Elige una fecha"
      />

      {/* Mensaje de error */}
      {error ? <HelperText type="error">{error}</HelperText> : null}

      {/* Botón para agregar la suscripción */}
      <Button mode="contained" onPress={handleSubmit} style={styles.addButton}>
        Agregar Suscripción
      </Button>

      {mensaje ? <Text style={styles.message}>{mensaje}</Text> : null}
    </View>
  );
};

export default AddSubs;