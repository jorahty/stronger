import { Text, View } from 'react-native';

import { Message } from '../../repo/message';
import { useViewModel } from '../../model/ViewModel';
import { styles } from '../../theme/theme';

interface Props {
  message: Message;
}

export default function MessageCard({ message }: Props) {
  const { loginResponse } = useViewModel();
  const wasSent: boolean = message.sender === loginResponse.user.username;

  return (
    <View style={{ alignItems: wasSent ? 'flex-end' : 'flex-start' }}>
      <View style={[styles.message, wasSent && styles.messageSent]}>
        <Text style={[styles.messageText, wasSent && styles.messageTextSent]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}
