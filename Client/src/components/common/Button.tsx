import { Pressable, Text } from 'react-native';

import { styles } from '../../theme/theme';

interface Props {
  title?: string;
  onPress?: () => void;
}

export default function Button({ title, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}
