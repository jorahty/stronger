import { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';

import { styles } from '../../theme/theme';

interface Props {
  title?: string;
  icon?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  outlined?: boolean;
  destructive?: boolean;
}

export default function Button({
  title,
  icon,
  onPress,
  disabled,
  outlined,
  destructive,
}: Props) {
  return (
    <Pressable
      style={[
        styles.button,
        outlined && styles.buttonOutlined,
        disabled && styles.disabled,
        destructive && styles.destructive,
      ]}
      onPress={onPress}
      disabled={disabled}>
      {icon}
      {title && (
        <Text
          style={[styles.buttonText, outlined && styles.buttenTextOutlined]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
