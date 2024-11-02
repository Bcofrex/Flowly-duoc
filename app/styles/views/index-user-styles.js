import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    email: {
      fontSize: 16,
      color: 'gray',
      marginBottom: 20,
    },
  });

export default styles;