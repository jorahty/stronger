import { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';

import { styles } from '../../theme/theme';

interface Props {
  title?: string;
  icon?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  outlined?: boolean;
}

export default function Button({
  title,
  icon,
  onPress,
  disabled,
  outlined,
}: Props) {
  return (
    <Pressable
      style={[
        styles.button,
        outlined && styles.buttonOutlined,
        disabled && styles.disabled,
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
