import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export function SubsList() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  // Data dummy de suscripciones
  const suscripciones = [
    {
        id: '1',
        nombre: 'Netflix',
        precio: 12.990,
        fechaFacturacion: '2024-11-01',
        imagen: require('../../assets/ServiciosStreaming/icons8-netflix-96.png'),
    },
    {
        id: '2',
        nombre: 'Spotify',
        precio: 9.990,
        fechaFacturacion: '2024-11-05',
        imagen: require('../../assets/ServiciosStreaming/icons8-spotify-96.png'),
    },
    {
        id: '3',
        nombre: 'Disney+',
        precio: 7.990,
        fechaFacturacion: '2024-11-10',
        imagen: require('../../assets/ServiciosStreaming/icons8-disney-1-96.png'),
    },
    {
        id: '4',
        nombre: 'Canva',
        precio: 12.950,
        fechaFacturacion: '2024-11-15',
        imagen: require('../../assets/ServiciosStreaming/icons8-canva-96.png'),
    },
    {
        id: '5',
        nombre: 'ChatGPT Plus',
        precio: 20.00,
        fechaFacturacion: '2024-11-20',
        imagen: require('../../assets/ServiciosStreaming/icons8-chatear-96.png'),
    },
];

// Función que renderiza cada suscripción
    const renderItem = ({ item }) => (
        <View style={styles.subscriptionItem}>
            <Image source={item.imagen } style={styles.subscriptionImage} />
            <View style={styles.subscriptionInfo}>
                <Text style={styles.subscriptionName}>{item.nombre}</Text>
                <Text style={styles.subscriptionPrice}>${item.precio} al mes</Text>
                <Text style={styles.subscriptionDate}>Próxima facturación: {item.fechaFacturacion}</Text>
            </View>
        </View>
    );
    
  return (
    <SafeAreaView style={styles.container}>
            <FlatList
                data={suscripciones}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/subs/add-subs')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    padding: 24,
    backgroundColor: "#f8f8f8"
  },

  listContent: {
    padding: 20,
  },
  subscriptionItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  subscriptionImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 15,
  },
  subscriptionInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  subscriptionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subscriptionPrice: {
    fontSize: 16,
    color: '#666',
  },
  subscriptionDate: {
    fontSize: 14,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
