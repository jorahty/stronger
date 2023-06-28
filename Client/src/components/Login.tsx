import { Button, StyleSheet, Text, View } from 'react-native';
import { useViewModel } from '../model/ViewModel';

export default function Login() {
  const { login } = useViewModel();
  return (
    <View style={styles.container}>
      <Text>Hello, Login!</Text>
      <Button onPress={login} title="Login" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
