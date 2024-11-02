import { Link, Stack } from 'expo-router';
import { Image, Pressable } from 'react-native';

import { SubscriptionProvider } from './context/SubscriptionContext'; 
import { availableSubscriptions } from './data/subscriptionData';
import { UserIcon } from './components/Icons';

import styles from './styles/layout-styles';

export default function RootLayout() {
  return (
    <SubscriptionProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#004080" },
          headerTintColor: "white",
          headerLeft: () => (
            <Image
              source={require('../assets/Logo/logo.png')}
              style={{ width: 50, height: 50 }}
            />
          ),
          headerRight: () => (
            <Link asChild href="/user">
              <Pressable style={styles.headerRight} >
                <UserIcon />
              </Pressable>
            </Link>
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'Inicio de sesión' }}
        />
        <Stack.Screen
          name="subs/index"
          options={{ title: 'Tus suscripciones' }}
        />
        <Stack.Screen
          name="subs/add-subs"
          options={{ title: 'Agregar suscripción' }}
        />
        <Stack.Screen 
          name="subs/details/[id]" 
          options={({ route }) => {
            const { id } = route.params;
            const subscription = availableSubscriptions.find((sub) => sub.id === id);
            return {
              title: subscription ? subscription.nombre : 'Detalle de suscripción',
            };
          }}
        />
        <Stack.Screen
          name="user/index"
          options={{ title: 'Tu perfil' }}
        />
        <Stack.Screen
          name="user/edit_user"
          options={{ title: 'Editar perfil' }}
        />
      </Stack>
    </SubscriptionProvider>
  );
}
