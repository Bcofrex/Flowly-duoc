import { Stack } from 'expo-router';
import { StyleSheet, Image } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#004080" },
        headerTintColor: "white",
        headerLeft: () => (
          <Image
            source={require('../assets/Logo/logo.png')}
            style={{ width: 50, height: 50 }}
          />
        )
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
        name="user/index"
        options={{ title: 'Tu perfil' }}
      />
      <Stack.Screen
        name="user/edit_user"
        options={{ title: 'Editar perfil' }}
      />
      <Stack.Screen
        name="subs/new_sub"
        options={{ title: 'Crear nueva suscripción' }}
      />

    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
})