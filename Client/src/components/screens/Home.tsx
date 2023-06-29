import {
  Button,
  StyleSheet,
  Text,
  Pressable,
  View,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import { useViewModel } from '../../model/ViewModel';

export default function Home() {
  const { navigate } = useNavigation<any>();
  const { loginResponse } = useViewModel();
  return (
    <View style={styles.container}>
      <Text>Hello, Home!</Text>
      <Text>Hello, {loginResponse.username}!</Text>
      <Button title="Chat" onPress={() => navigate('Chat')} />
      <Button title="Profile" onPress={() => navigate('Profile')} />
    </View>
  );
}

export const HomeHeaderLeft = () => {
  const { logout } = useViewModel();
  return (
    <Pressable
      onPress={logout}
      style={Platform.OS === 'web' && { paddingLeft: 20 }}>
      <MaterialIcons name="logout" size={24} />
    </Pressable>
  );
};

export const HomeHeaderRight = () => {
  const { navigate } = useNavigation<any>();
  return (
    <View
      style={[
        { flexDirection: 'row', gap: 20 },
        Platform.OS === 'web' && { paddingRight: 20 },
      ]}>
      <Pressable onPress={() => navigate('Profile')}>
        <MaterialIcons name="chat-bubble-outline" size={24} />
      </Pressable>
      <Pressable onPress={() => navigate('Chats')}>
        <Octicons name="person" size={24} />
      </Pressable>
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
