import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f4f4f4',
    },
    selectButton: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 12,
      borderRadius: 10,
      backgroundColor: '#e0e0e0',
      marginBottom: 20,
      textAlign: 'center',
      color: '#fff',
      fontWeight: '500',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '90%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    subscriptionItem: {
      flex: 1,
      margin: 8,
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: '#f0f0f0',
    },
    subscriptionImage: {
      width: 50,
      height: 50,
      marginBottom: 5,
    },
    subscriptionText: {
      fontSize: 12,
      textAlign: 'center',
      flexWrap: 'wrap',
    },
    stepContainer: {
      marginBottom: 20,
    },
    stepTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      padding: 12,
      backgroundColor: '#e0e0e0',
      marginBottom: 20,
    },
    datePicker: {
      fontSize: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      textAlign: 'center',
      backgroundColor: '#e0e0e0',
    },
    message: {
      marginTop: 20,
      textAlign: 'center',
      color: 'green',
    },
  });

  export default styles;