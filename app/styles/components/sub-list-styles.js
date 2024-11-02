import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 20,
      backgroundColor: "#f8f8f8",
    },
    listContent: {
      paddingBottom: 100,
    },
    subscriptionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
      backgroundColor: '#ffffff',
      padding: 15,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    subscriptionImage: {
      width: 50,
      height: 50,
      marginRight: 15,
    },
    subscriptionInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    subscriptionName: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 3,
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
      bottom: 80,
      backgroundColor: '#007AFF',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 6,
    },
    fabText: {
      color: '#fff',
      fontSize: 28,
      fontWeight: 'bold',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 18,
      color: '#999',
      textAlign: 'center',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
export default styles;  