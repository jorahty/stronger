import { Button, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>Hello, Profile!</Text>
      <Button onPress={() => {}} title="Chat" />
      <Button onPress={() => {}} title="Edit" />
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
