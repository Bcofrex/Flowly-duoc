import React, { useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useRouter, useSegments } from 'expo-router';

import { AuthProvider, AuthContext } from '../context/AuthContext';
import { SubscriptionProvider } from '../context/SubscriptionContext';
import { MenuIcon } from './components/Icons';

import styles from './styles/layout-styles';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <AppDrawer />
      </SubscriptionProvider>
    </AuthProvider>
  );
}

function AppDrawer() {
  const { isAuthenticated, user } = useContext(AuthContext); 
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    console.log('Estado de autenticación:', { isAuthenticated, user });
    const publicRoutes = ['login', 'signUp'];
    const currentRoute = segments[0] || 'login';

    if (!isAuthenticated && !publicRoutes.includes(currentRoute)) {
      router.replace('/');
    }
  }, [isAuthenticated, segments]);

  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#C6E7FF' },
        headerTintColor: 'white',
        headerLeft: () => (
          <Image
            source={require('../assets/Logo/Flowly-sin-fondo.png')}
            style={{ width: 140, height: 140 }}
          />
        ),
        headerRight: () =>
          isAuthenticated ? (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ paddingRight: 15 }}
            >
              <MenuIcon />
            </TouchableOpacity>
          ) : null,
        headerTitle: '',
        drawerStyle: {
          width: 250,
        },
      })}
      drawerPosition="right"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    />
  );
}

function CustomDrawerContent(props) {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

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
          onPress={() => router.push('/subs/')}
        >
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/user/')}
        >
          <Text style={styles.menuItem}>Tu perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/settings/')}
        >
          <Text style={styles.menuItem}>Configuración</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}
      >
        <Text style={styles.logoutItem}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
