import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    },
    error: {
      marginTop: 20,
      textAlign: 'center',
      color: 'red',
    },
    infoContainer: {
      marginTop: 50,
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#ffe5e5', 
      borderRadius: 8,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'red',
      marginBottom: 10,
    },
    infoText: {
      fontSize: 16,
      color: '#333',
      marginBottom: 5,
    },
    bold: {
      fontWeight: 'bold',
      color: 'red',
    },
  });

export default styles;