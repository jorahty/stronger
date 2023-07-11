import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Message } from '../../repo/message';
import { useViewModel } from '../../model/ViewModel';
import MessageCard from '../message/Card';

export default function Chat() {
  const { selectedUser, messages } = useViewModel();
  const { navigate } = useNavigation<any>();
  return (
    <View>
      <TouchableOpacity onPress={() => navigate('Profile')}>
        <Text>{selectedUser.name}</Text>
      </TouchableOpacity>
      {messages.map((message: Message) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </View>
  );
}
