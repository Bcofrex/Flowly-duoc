import React, { useState } from 'react';
import { View, Pressable, Image, Text } from 'react-native';
import { Stack, useNavigation } from 'expo-router';
import { Overlay, ListItem, Icon } from 'react-native-elements';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { UserIcon } from './components/Icons';
import styles from './styles/layout-styles'; 

export default function RootLayout() {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation(); 

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const closeOverlay = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    closeOverlay();
    navigation.navigate('index');
  };

  return (
    <SubscriptionProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#004080" },
          headerTintColor: "white",
          headerLeft: ({ canGoBack }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {canGoBack && (
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                  <Icon name="arrow-back" size={24} color="white" />
                </Pressable>
              )}
              <Image
                source={require('../assets/Logo/logo.png')}
                style={{ width: 50, height: 50 }}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ position: 'relative' }}>
              <Pressable onPress={toggleOverlay} style={styles.headerRight}>
                <UserIcon />
              </Pressable>

              <Overlay
                isVisible={visible}
                onBackdropPress={closeOverlay}
                overlayStyle={styles.dropdownOverlay}
              >
                <View>
                  <ListItem onPress={() => { closeOverlay(); navigation.navigate('user/index'); }}>
                    <Icon name="person" />
                    <ListItem.Content>
                      <ListItem.Title>
                        <Text style={styles.menuItemText}>Perfil</Text>
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>

                  <ListItem onPress={closeOverlay}>
                    <Icon name="settings" />
                    <ListItem.Content>
                      <ListItem.Title>
                        <Text style={styles.menuItemText}>Configuraciones</Text>
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>

                  <ListItem onPress={handleLogout}>
                    <Icon name="exit-to-app" />
                    <ListItem.Content>
                      <ListItem.Title>
                        <Text style={styles.menuItemText}>Cerrar sesión</Text>
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </View>
              </Overlay>
            </View>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Inicio de sesión' }} />
        <Stack.Screen name="subs/index" options={{ title: 'Tus suscripciones' }} />
        <Stack.Screen name="subs/add-subs" options={{ title: 'Agregar suscripción' }} />
        <Stack.Screen name="subs/details/[id]" options={{ title: 'Detalles de suscripción' }} />
        <Stack.Screen name="user/index" options={{ title: 'Tu perfil' }} />
        <Stack.Screen name="user/edit_user" options={{ title: 'Editar perfil' }} />
      </Stack>
    </SubscriptionProvider>
  );
}
