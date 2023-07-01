import { Pressable, View, Platform, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import { useViewModel } from '../../model/ViewModel';
import PostingCard from '../posting/Card';
import PostingCreate from '../posting/Create';

export default function Home() {
  const { postings } = useViewModel();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ height: 0 }}
        data={postings}
        renderItem={({ item }) => <PostingCard posting={item} />}
      />
      <PostingCreate />
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
      <Pressable onPress={() => navigate('Chats')}>
        <MaterialIcons name="chat-bubble-outline" size={24} />
      </Pressable>
      <Pressable onPress={() => navigate('Profile')}>
        <Octicons name="person" size={24} />
      </Pressable>
    </View>
  );
};
