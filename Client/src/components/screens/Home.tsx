import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useViewModel } from '../../model/ViewModel';

export default function Home() {
  const { navigate } = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text>Hello, Home!</Text>
      <Button title="Chat" onPress={() => navigate('Chat')} />
      <Button title="Profile" onPress={() => navigate('Profile')} />
    </View>
  );
}

export const HomeHeaderLeft = () => {
  const { logout } = useViewModel();
  return (
    <TouchableOpacity onPress={logout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

export const HomeHeaderRight = () => {
  const { navigate } = useNavigation<any>();
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => navigate('Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Chats')}>
        <Text>Chats</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
