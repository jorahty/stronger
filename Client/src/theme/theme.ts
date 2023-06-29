import { StyleSheet } from 'react-native';

export const colors = {
  lightGrey: '#f5f5f5',
  grey: '#ccc',
  darkGrey: '#aaa',
  white: '#fff',
};

export const styles = StyleSheet.create({
  headline: {
    fontSize: 18,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: '#08f',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 18,
  },
  buttonText: {
    fontWeight: '700',
    color: colors.white,
  },
  textInput: {
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    borderColor: colors.darkGrey,
    backgroundColor: colors.white,
  },
});
