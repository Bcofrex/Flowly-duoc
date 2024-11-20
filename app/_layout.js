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
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inLogin = segments.length === 0 || segments[0] === 'index';

    if (!isAuthenticated && !inLogin) {
      router.replace('/');
    }
  }, [isAuthenticated, segments]);

  return (
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
    >
    </Drawer>
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
          onPress={() => { router.push('/subs/'); }}
        >
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { router.push('/user/'); }}
        >
          <Text style={styles.menuItem}>Tu perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { router.push('/settings/'); }}
        >
          <Text style={styles.menuItem}>Configuración</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          logout();
          router.push('/');
        }}
      >
        <Text style={styles.logoutItem}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}