import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { colors, styles } from '../../theme/theme';
import { useViewModel } from '../../model/ViewModel';
import Button from '../common/Button';

export default function PostingCreate() {
  const { createPosting } = useViewModel();
  const [content, setContent] = useState('');

  const sendPosting = () => {
    createPosting(content);
    setContent('');
    Keyboard.dismiss();
  };

  return (
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
  );
}
