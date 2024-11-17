import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
  },
  name: {
    fontSize: 24,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
  button: {
    width: '80%',
    marginTop: 10,
  },
});

export default styles;