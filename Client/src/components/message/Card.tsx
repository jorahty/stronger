import { Text } from 'react-native';

import { Message } from '../../repo/message';

interface Props {
  message: Message;
}

export default function MessageCard({ message }: Props) {
  return <Text>{message.content}</Text>;
}
