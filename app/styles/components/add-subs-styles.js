import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  selectButton: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  addButton: {
    marginTop: 20,
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 15,
    textAlign: 'center',
  },
  subscriptionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subscriptionItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
  },
  subscriptionImage: {
    backgroundColor: '#f0f0f0',
  },
  subscriptionText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    marginTop: 5,
  },
  stepContainer: {
    marginBottom: 20,
  },
});

export default styles;