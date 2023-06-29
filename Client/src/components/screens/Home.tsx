import { Pressable, View, Platform, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import { useViewModel } from '../../model/ViewModel';
import PostingCard from '../posting/Card';

export default function Home() {
  const { postings } = useViewModel();
  return (
    <FlatList
      data={postings}
      renderItem={({ item }) => <PostingCard posting={item} />}
    />
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
