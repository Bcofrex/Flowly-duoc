import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SubscriptionContext } from '../context/SubscriptionContext'; // Importar el contexto
import { useRouter } from 'expo-router';

// Lista de suscripciones disponibles
const availableSubscriptions = [
  { id: '1', nombre: 'Netflix', imagen: require('../../assets/ServiciosStreaming/icons8-netflix-96.png') },
  { id: '2', nombre: 'Spotify', imagen: require('../../assets/ServiciosStreaming/icons8-spotify-96.png') },
  { id: '3', nombre: 'Disney+', imagen: require('../../assets/ServiciosStreaming/icons8-disney-1-96.png') },
  { id: '4', nombre: 'Canva', imagen: require('../../assets/ServiciosStreaming/icons8-canva-96.png') },
  { id: '5', nombre: 'ChatGPT Plus', imagen: require('../../assets/ServiciosStreaming/icons8-chatear-96.png') },
];

// Planes específicos de cada suscripción
const subscriptionPlans = {
  'Netflix': [
    { label: 'Básico', value: 'Básico', price: 6540 },
    { label: 'Estándar', value: 'Estándar', price: 9190 },
    { label: 'Premium', value: 'Premium', price: 11790 },
    { label: 'Personalizado', value: 'personalizado' }
  ],
  'Spotify': [
    { label: 'Individual', value: 'Individual', price: 4940 },
    { label: 'Duo', value: 'Duo', price: 6360 },
    { label: 'Familiar', value: 'Familiar', price: 8060 },
    { label: 'Personalizado', value: 'personalizado' }
  ],
  'Disney+': [
    { label: 'Estándar', value: 'Estándar', price: 7700 },
    { label: 'Premium', value: 'Premium', price: 10500 },
    { label: 'Personalizado', value: 'personalizado' }
  ],
  'Canva': [
    { label: 'Pro', value: 'Pro', price: 12490 },
    { label: 'Empresa', value: 'Empresa', price: 27990 },
    { label: 'Personalizado', value: 'personalizado' }
  ],
  'ChatGPT Plus': [
    { label: 'Plus', value: 'Plus', price: 20000 },
    { label: 'Personalizado', value: 'personalizado' }
  ],
};

export function AddSubs() {
  const router = useRouter();
  const { agregarSuscripcion } = useContext(SubscriptionContext); // Usar el contexto

  // Estados para manejar el formulario
  const [nombre, setNombre] = useState('');
  const [costo, setCosto] = useState('');
  const [fecha, setFecha] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [plan, setPlan] = useState('');
  const [showCustomPlan, setShowCustomPlan] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Función para manejar la selección del servicio
  const selectSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setModalVisible(false);
    setPlan(''); // Reiniciar el plan cuando se selecciona una nueva suscripción
    setCosto(''); // Limpiar el costo
  };

  // Función para manejar la selección de un plan
  const handlePlanChange = (selectedPlan) => {
    setPlan(selectedPlan);
    const planInfo = subscriptionPlans[selectedSubscription.nombre].find(p => p.value === selectedPlan);
    if (planInfo && selectedPlan !== 'personalizado') {
      setCosto(planInfo.price.toString());
      setNombre(planInfo.label);
      setShowCustomPlan(false);
    } else {
      setShowCustomPlan(true);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (!selectedSubscription || costo === '' || fecha === '') {
      setMensaje('Por favor, rellena todos los campos.');
      return;
    }

    // Crear el objeto de la nueva suscripción
    const nuevaSuscripcion = {
      id: Math.random().toString(), // Generar un id único
      nombre: selectedSubscription.nombre,
      precio: parseFloat(costo),
      fechaFacturacion: fecha,
      imagen: selectedSubscription.imagen,
    };

    // Agregar la nueva suscripción al contexto
    agregarSuscripcion(nuevaSuscripcion);

    // Limpiar los campos y redirigir al home
    setMensaje(`Suscripción añadida: ${selectedSubscription.nombre} con un costo de $${costo}`);
    setSelectedSubscription(null);
    setCosto('');
    setFecha('');
    setPlan('');
    setShowCustomPlan(false);
    router.push('/subs'); // Redirigir al home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nueva Suscripción</Text>

      {/* Botón para abrir el modal de selección de suscripción */}
      <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
        <Text>{selectedSubscription ? selectedSubscription.nombre : 'Seleccionar suscripción'}</Text>
      </TouchableOpacity>

      {/* Modal para seleccionar suscripción */}
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

      {/* Dropdown dinámico según la suscripción seleccionada */}
      {selectedSubscription && (
        <Picker
          selectedValue={plan}
          onValueChange={handlePlanChange}
          style={styles.input}
        >
          <Picker.Item label="Seleccionar plan" value="" />
          {subscriptionPlans[selectedSubscription.nombre].map((plan) => (
            <Picker.Item key={plan.value} label={`${plan.label} - CLP ${plan.price}`} value={plan.value} />
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

      {/* Input para seleccionar fecha con Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePicker}>{fecha ? fecha : 'Seleccionar fecha de facturación'}</Text>
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

      {/* Botón para agregar suscripción */}
      <Button title="Agregar Suscripción" onPress={handleSubmit} />

      {/* Mensaje de éxito o error */}
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
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  subscriptionItem: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscriptionImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
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
