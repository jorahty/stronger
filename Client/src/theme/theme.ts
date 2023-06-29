import { StyleSheet } from 'react-native';

export const colors = {
  grey: '#f5f5f5',
};

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#08f',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '700',
    color: '#fff',
  },
  textInput: {
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    borderColor: '#888',
    backgroundColor: '#fff',
  },
});
