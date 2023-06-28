import { Button, StyleSheet, Text, View } from 'react-native';

export default function Chats() {
  return (
    <View style={styles.container}>
      <Text>Hello, Chats!</Text>
      <Button onPress={() => {}} title="Chat" />
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
