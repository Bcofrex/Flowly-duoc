import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#004080',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
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
  registerLinkContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  registerLink: {
    fontSize: 14,
    color: '#004080', 
  },
  registerLinkBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  disabledButton: {
    backgroundColor: '#cccccc', 
  },  
  
});

export default styles;