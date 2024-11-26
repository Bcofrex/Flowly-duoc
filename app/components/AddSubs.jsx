import React, { useState, useContext, useEffect } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, RadioButton, HelperText, Avatar } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { SubscriptionContext } from '../../context/SubscriptionContext';
import { AuthContext } from '../../context/AuthContext';
import { getAvailableSubscriptions, getSubscriptionPlans } from '../../data/subscriptionData';

import styles from '../styles/components/add-subs-styles';

const AddSubs = () => {
  const router = useRouter();
  const { agregarSuscripcion, refreshSubscriptions } = useContext(SubscriptionContext); // Usar el método refreshSubscriptions
  const { user } = useContext(AuthContext); // Usar el usuario autenticado

  const [nombre, setNombre] = useState('');
  const [costo, setCosto] = useState('');
  const [fecha, setFecha] = useState(''); // Ahora siempre en formato "DD-MM-YYYY"
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga
  const [modalVisible, setModalVisible] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [availableSubscriptions, setAvailableSubscriptions] = useState([]);
  const [plan, setPlan] = useState('');
  const [availablePlans, setAvailablePlans] = useState([]);
  const [showCustomPlan, setShowCustomPlan] = useState(false);

  // Cargar suscripciones disponibles al iniciar
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
      setPlanModalVisible(false);
    } else {
      setNombre('');
      setCosto('');
      setShowCustomPlan(true);
      setPlanModalVisible(false);
    }
  };

  const validateFields = () => {
    if (!selectedSubscription) {
      setError('Por favor, selecciona una suscripción.');
      return false;
    }
    if (!plan) {
      setError('Por favor, selecciona un plan.');
      return false;
    }
    if (!costo || isNaN(parseFloat(costo))) {
      setError('Por favor, ingresa un costo válido.');
      return false;
    }
    if (!fecha) {
      setError('Por favor, selecciona un día de facturación.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError(''); // Limpiar errores previos
    if (!validateFields()) return;

    const nuevaSuscripcion = {
      userId: user.id,
      nombre: selectedSubscription.nombre,
      precio: parseFloat(costo),
      moneda: 'CLP',
      fechaFacturacion: fecha,
      tipoPlan: plan || 'Personalizado',
      imagen: `https://example.com/${selectedSubscription.nombre.toLowerCase()}-logo.png`, // Generación dinámica
    };

    console.log('Datos enviados al backend:', nuevaSuscripcion);

    try {
      setLoading(true);
      await agregarSuscripcion(nuevaSuscripcion);
      await refreshSubscriptions(); // Actualizar la lista automáticamente
      router.push('/subs');
    } catch (error) {
      console.error('Error al añadir suscripción:', error);
      const errorMessage = error.response?.data?.message || 'No se pudo agregar la suscripción. Intenta nuevamente.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = (date) => {
    // Convertir a "DD-MM-YYYY"
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    // Imprimir para verificar el formato
    console.log('Fecha seleccionada (formateada):', formattedDate);
    setFecha(formattedDate);
    hideDatePicker();
  };

  const hideDatePicker = () => setDatePickerVisible(false);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.stepTitle}>Seleccionar Suscripción</Text>
          <Button
            mode="outlined"
            onPress={() => setModalVisible(true)}
            style={styles.selectButton}
          >
            {selectedSubscription ? selectedSubscription.nombre : 'Seleccionar suscripción'}
          </Button>

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
                      <Avatar.Image source={item.imagen} size={60} style={styles.subscriptionImage} />
                      <Text style={styles.subscriptionText}>{item.nombre}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <Button onPress={() => setModalVisible(false)}>Cerrar</Button>
              </View>
            </View>
          </Modal>

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

          <Modal visible={planModalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Seleccionar Plan</Text>
                <RadioButton.Group onValueChange={handlePlanChange} value={plan}>
                  <ScrollView>
                    {availablePlans.map((plan) => (
                      <RadioButton.Item
                        key={plan.value}
                        label={`${plan.label} - CLP $${plan.price.toLocaleString('es-CL')}`}
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
                onChangeText={setCosto}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
              />
            </View>
          )}

          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Día de Facturación</Text>
            <Button
              mode="outlined"
              onPress={() => setDatePickerVisible(true)}
              style={styles.selectButton}
            >
              {fecha ? `Día ${fecha.split('-')[0]}` : 'Seleccionar día de facturación'}
            </Button>
          </View>

          <DateTimePickerModal
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            display="spinner"
            locale="es-ES"
          />

          {error ? <HelperText type="error">{error}</HelperText> : null}
          <Button mode="contained" onPress={handleSubmit} style={styles.addButton}>
            Agregar Suscripción
          </Button>
        </>
      )}
    </View>
  );
};

export default AddSubs;
