import { useState } from 'react';
import {
  Pressable,
  View,
  Platform,
  FlatList,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { colors, styles } from '../../theme/theme';
import { useViewModel } from '../../model/ViewModel';
import PostingCard from '../posting/Card';
import Button from '../common/Button';

export default function Home() {
  const { postings, createPosting } = useViewModel();
  const [content, setContent] = useState('');

  const sendPosting = () => {
    createPosting(content);
    setContent('');
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ height: 0 }}
        data={postings}
        renderItem={({ item }) => <PostingCard posting={item} />}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 94 : 0}>
        <SafeAreaView style={{ backgroundColor: colors.white }}>
          <View
            style={{
              padding: 20,
              borderTopWidth: 1,
              borderTopColor: colors.grey,
              flexDirection: 'row',
              gap: 20,
            }}>
            <TextInput
              style={[styles.textInput, { flex: 1 }]}
              placeholder="New Posting"
              value={content}
              onChangeText={setContent}
              onSubmitEditing={content ? sendPosting : undefined}
            />
            <Button
              icon={<FontAwesome name="send" style={styles.buttonIcon} />}
              onPress={sendPosting}
              disabled={content.length < 1}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
