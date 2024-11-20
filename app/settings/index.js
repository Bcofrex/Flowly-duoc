import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, List, Button, Divider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

export default function SettingsScreen() {
  // Estados para las configuraciones
  const [currency, setCurrency] = useState('USD');
  const [notificationTypes, setNotificationTypes] = useState({
    push: true,
    sms: false,
    email: false,
  });
  const [notificationDays, setNotificationDays] = useState(1);

  // Opciones para los selectores
  const currencyOptions = [
    { label: 'Dólares (USD)', value: 'USD' },
    { label: 'Euros (EUR)', value: 'EUR' },
    { label: 'Pesos Chilenos (CLP)', value: 'CLP' },
    { label: 'Pesos Argentinos (ARS)', value: 'ARS' },
  ];

  const daysOptions = [
    { label: '1 día antes', value: 1 },
    { label: '2 días antes', value: 2 },
    { label: '3 días antes', value: 3 },
    { label: '5 días antes', value: 5 },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Selección de Moneda */}
      <List.Section>
        <List.Subheader>Moneda</List.Subheader>
        <RNPickerSelect
          onValueChange={(value) => setCurrency(value)}
          items={currencyOptions}
          value={currency}
          style={pickerSelectStyles}
          placeholder={{}}
        />
      </List.Section>

      <Divider />

      {/* Administración de Notificaciones */}
      <List.Section>
        <List.Subheader>Notificaciones</List.Subheader>

        <View style={styles.notificationOption}>
          <Text>Notificaciones Push</Text>
          <Switch
            value={notificationTypes.push}
            onValueChange={(value) =>
              setNotificationTypes({ ...notificationTypes, push: value })
            }
          />
        </View>

        <View style={styles.notificationOption}>
          <Text>SMS</Text>
          <Switch
            value={notificationTypes.sms}
            onValueChange={(value) =>
              setNotificationTypes({ ...notificationTypes, sms: value })
            }
          />
        </View>

        <View style={styles.notificationOption}>
          <Text>Correo Electrónico</Text>
          <Switch
            value={notificationTypes.email}
            onValueChange={(value) =>
              setNotificationTypes({ ...notificationTypes, email: value })
            }
          />
        </View>

        <RNPickerSelect
          onValueChange={(value) => setNotificationDays(value)}
          items={daysOptions}
          value={notificationDays}
          style={pickerSelectStyles}
          placeholder={{}}
        />
      </List.Section>

      <Divider />

      {/* Botón para guardar cambios */}
      <Button mode="contained" onPress={() => console.log('Configuraciones guardadas')}>
        Guardar Cambios
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioButtonGroup: {
    flexDirection: 'row',
  },
  radioButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#004080',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginVertical: 8,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#004080',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginVertical: 8,
  },
});
