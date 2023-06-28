import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const { navigate } = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text>Hello, Profile!</Text>
      <Button onPress={() => navigate('Chat')} title="Chat" />
      <Button onPress={() => navigate('Edit')} title="Edit" />
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
