import { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';

import { styles } from '../../theme/theme';

interface Props {
  title?: string;
  icon?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

export default function Button({ title, icon, onPress, disabled }: Props) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}>
      {icon}
      {title && <Text style={styles.buttonText}>{title}</Text>}
    </Pressable>
  );
}
