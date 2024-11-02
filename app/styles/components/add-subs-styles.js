import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f4f4f4',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 20,
    },
    selectButton: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 12,
      borderRadius: 10,
      backgroundColor: '#DEDEDE',
      marginBottom: 20,
      textAlign: 'center',
      color: '#fff',
      fontWeight: '500',
      fontSize: 16,
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
      color: '#4a90e2',
      marginBottom: 15,
      textAlign: 'center',
    },
    subscriptionItem: {
      flex: 1,
      margin: 8,
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: '#e8e8e8',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 2,
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
      color: '#333',
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
      backgroundColor: '#fff',
      fontSize: 16,
      marginBottom: 20,
      color: '#333',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    message: {
      marginTop: 20,
      textAlign: 'center',
      color: 'green',
      fontWeight: '500',
    },
    dayPickerContainer: {
      alignItems: 'center',
    },
    dayItem: {
      margin: 5,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      backgroundColor: '#f0f0f0',
      alignItems: 'center',
    },
    dayItemSelected: {
      backgroundColor: '#4a90e2',
    },
    dayText: {
      fontSize: 16,
      color: '#333',
    },
  });

export default styles;