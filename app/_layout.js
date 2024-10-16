import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
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
