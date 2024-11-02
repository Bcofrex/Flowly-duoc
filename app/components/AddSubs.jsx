import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SubscriptionContext } from '../context/SubscriptionContext';
import { getAvailableSubscriptions, getSubscriptionPlans } from '../data/subscriptionData';
import { useRouter } from 'expo-router';

export function AddSubs() {
  const router = useRouter();
  const { agregarSuscripcion } = useContext(SubscriptionContext);

  // Estados para manejar el formulario
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

  // Cargar suscripciones disponibles al montar el componente
  useEffect(() => {
    const fetchSubscriptions = async () => {
      const subscriptions = await getAvailableSubscriptions();
      setAvailableSubscriptions(subscriptions);
    };
    fetchSubscriptions();
  }, []);

  // Manejar selección de servicio y cargar planes disponibles
  const selectSubscription = async (subscription) => {
    setSelectedSubscription(subscription);
    setModalVisible(false);
    setPlan('');
    setCosto('');

    // Obtener planes para la suscripción seleccionada
    const plans = await getSubscriptionPlans(subscription.nombre);
    setAvailablePlans(plans);
  };

  // Manejar selección de plan
  const handlePlanChange = (selectedPlan) => {
    setPlan(selectedPlan);
    const planInfo = availablePlans.find(p => p.value === selectedPlan);
    if (planInfo && selectedPlan !== 'personalizado') {
      setCosto(planInfo.price.toString());
      setNombre(planInfo.label);
      setShowCustomPlan(false);
    } else {
      setShowCustomPlan(true);
    }
  };

  // Manejar envío del formulario
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
      <Text style={styles.title}>Agregar Nueva Suscripción</Text>

      <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
        <Text>{selectedSubscription ? selectedSubscription.nombre : 'Seleccionar suscripción'}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={availableSubscriptions}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.subscriptionItem} onPress={() => selectSubscription(item)}>
                  <Image source={item.imagen} style={styles.subscriptionImage} />
                  <Text>{item.nombre}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {selectedSubscription && (
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
      )}

      {showCustomPlan && (
        <View>
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

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePicker}>{fecha || 'Seleccionar fecha de facturación'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || new Date();
            setShowDatePicker(false);
            setFecha(currentDate.toISOString().split('T')[0]);
          }}
        />
      )}

      <Button title="Agregar Suscripción" onPress={handleSubmit} />

      {mensaje ? <Text style={styles.message}>{mensaje}</Text> : null}
    </View>
  );
}

// Estilos para el formulario y el modal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  subscriptionItem: {
    flex: 1, 
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  subscriptionImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  subscriptionText: {
    fontSize: 12,
    textAlign: 'center',
    flexWrap: 'wrap', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  datePicker: {
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
  },
});
