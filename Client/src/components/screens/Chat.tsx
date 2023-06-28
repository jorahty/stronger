import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Chat() {
  const { navigate } = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text>Hello, Chat messages!</Text>
      <Button onPress={() => navigate('Profile')} title="Profile" />
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
