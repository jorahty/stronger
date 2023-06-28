import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Hello, Home!</Text>
    </View>
  );
}

export const HomeHeaderRight = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      accessibilityLabel="add message"
      onPress={() => {
        navigation.navigate('Chats');
      }}>
      <Text>Chats</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
