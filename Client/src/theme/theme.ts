import { StyleSheet } from 'react-native';

export const colors = {
  blue: '#08f',
  darkBlue: '#07f',
  lightGrey: '#f5f5f5',
  grey: '#ccc',
  darkGrey: '#aaa',
  deepGrey: '#777',
  white: '#fff',
  danger: '#e45',
};

export const styles = StyleSheet.create({
  formInput: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  link: {
    color: colors.darkBlue,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  message: {
    borderRadius: 15,
    backgroundColor: colors.grey,
    padding: 20,
    marginVertical: 5,
  },
  messageText: {
    fontWeight: '600',
  },
  messageSent: {
    backgroundColor: colors.blue,
  },
  messageTextSent: {
    color: colors.white,
  },
  destructive: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  headline: {
    fontSize: 18,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: colors.blue,
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
