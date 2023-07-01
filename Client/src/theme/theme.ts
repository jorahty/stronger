import { StyleSheet } from 'react-native';

export const colors = {
  lightGrey: '#f5f5f5',
  grey: '#ccc',
  darkGrey: '#aaa',
  deepGrey: '#777',
  white: '#fff',
  danger: '#e45',
};

export const styles = StyleSheet.create({
  destructive: {
    backgroundColor: colors.danger,
  },
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
  buttonText: {
    fontWeight: '700',
    color: colors.white,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 18,
  },
  buttonOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.darkGrey,
  },
  buttenTextOutlined: {
    color: colors.deepGrey,
  },
  textInput: {
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    borderColor: colors.darkGrey,
    backgroundColor: colors.white,
  },
});
