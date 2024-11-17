import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';

import { SubscriptionProvider } from '../context/SubscriptionContext';
import { MenuIcon } from './components/Icons'; 

import styles from './styles/layout-styles';

export default function RootLayout() {

  return (
    <SubscriptionProvider>
      <Drawer
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: '#004080' },
          headerTintColor: 'white',
          headerLeft: () => (
            <Image
              source={require('../assets/Logo/logo.png')}
              style={{ width: 50, height: 50 }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ paddingRight: 15 }}
            >
              <MenuIcon />
            </TouchableOpacity>
          ),
          headerTitle: '',
          drawerStyle: {
            width: 250, 
          },
        })}
        drawerPosition="right" 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="index" options={{ title: 'Inicio de sesión' }} />
        <Drawer.Screen name="subs/index" options={{ title: 'Tus suscripciones' }} />
        <Drawer.Screen name="subs/add-subs" options={{ title: 'Agregar suscripción' }} />
        <Drawer.Screen
          name="subs/details/[id]"
          options={{ title: 'Detalles de suscripción' }}
        />
        <Drawer.Screen name="user/index" options={{ title: 'Tu perfil' }} />
        <Drawer.Screen name="user/edit_user" options={{ title: 'Editar perfil' }} />
        <Drawer.Screen name="settings/index" options={{ title: 'Configuración' }} />
      </Drawer>
    </SubscriptionProvider>
  );
}

function CustomDrawerContent(props) {
  const router = useRouter();

  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity
        onPress={() => props.navigation.closeDrawer()}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
      <View style={styles.menuItemsContainer}>
        <TouchableOpacity
          onPress={() => {router.push('/subs/');}}
        >
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {router.push('/user/');}}
        >
          <Text style={styles.menuItem}>Tu perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {router.push('/settings/');}}
        >
          <Text style={styles.menuItem}>Configuración</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {router.push('/');}}
      >
        <Text style={styles.logoutItem}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}