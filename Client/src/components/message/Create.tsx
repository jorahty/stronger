import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, styles } from '../../theme/theme';
import { useViewModel } from '../../model/ViewModel';
import Button from '../common/Button';

export default function MessageCreate() {
  // const { createPosting } = useViewModel();
  const [content, setContent] = useState('');

  const sendMessage = () => {
    // createMessage(content);
    setContent('');
    Keyboard.dismiss();
  };

  const insets = useSafeAreaInsets();

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 94 : 0}>
        <View
          style={{
            backgroundColor: colors.white,
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: colors.grey,
            flexDirection: 'row',
            gap: 20,
          }}>
          <TextInput
            style={[styles.textInput, { flex: 1 }]}
            placeholder="Message"
            value={content}
            onChangeText={setContent}
            onSubmitEditing={content ? sendMessage : undefined}
          />
          <Button
            icon={<FontAwesome name="send" style={styles.buttonIcon} />}
            onPress={sendMessage}
            disabled={content.length < 1}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={{ height: insets.bottom, backgroundColor: colors.white }} />
    </>
  );
}
