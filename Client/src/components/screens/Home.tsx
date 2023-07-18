import { useCallback, useState } from 'react';
import { TouchableOpacity, View, Platform, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

import { useViewModel } from '../../model/ViewModel';
import PostingCard from '../posting/Card';
import PostingInput from '../posting/Input';
import { Posting } from '../../repo/posting';
import PostingMenu from '../posting/Menu';

export default function Home() {
  const { postings, getPostings } = useViewModel();
  const [selectedPosting, setSelectedPosting] = useState<null | Posting>(null);

  useFocusEffect(
    useCallback(() => {
      getPostings();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ height: 0 }}
        data={postings}
        renderItem={({ item }) => (
          <PostingCard posting={item} setSelectedPosting={setSelectedPosting} />
        )}
      />
      <PostingInput />
      <PostingMenu
        selectedPosting={selectedPosting}
        setSelectedPosting={setSelectedPosting}
      />
    </View>
  );
}

export const HomeHeaderLeft = () => {
  const { logout } = useViewModel();
  return (
    <TouchableOpacity
      onPress={logout}
      style={Platform.OS === 'web' && { paddingLeft: 20 }}>
      <MaterialIcons name="logout" size={24} />
    </TouchableOpacity>
  );
};

export const HomeHeaderTitle = () => {
  const { getPostings } = useViewModel();
  return (
    <TouchableOpacity onPress={getPostings}>
      <MaterialIcons name="refresh" size={24} />
    </TouchableOpacity>
  );
};

export const HomeHeaderRight = () => {
  const { selectUser, loginResponse, getChats } = useViewModel();
  const { navigate } = useNavigation<any>();
  return (
    <View
      style={[
        { flexDirection: 'row', gap: 20 },
        Platform.OS === 'web' && { paddingRight: 20 },
      ]}>
      <TouchableOpacity
        onPress={() => {
          getChats();
          navigate('Chats');
        }}>
        <MaterialIcons name="chat-bubble-outline" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          selectUser(loginResponse.user);
          navigate('Profile');
        }}>
        <Octicons name="person" size={24} />
      </TouchableOpacity>
    </View>
  );
};
