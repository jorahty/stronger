import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Chats() {
  const { navigate } = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text>Hello, Chats!</Text>
      <Button onPress={() => navigate('Chat')} title="Chat" />
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
