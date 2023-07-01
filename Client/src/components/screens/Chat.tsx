import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useViewModel } from '../../model/ViewModel';

export default function Chat() {
  const { selectedUser } = useViewModel();
  const { navigate } = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text>Messages with {selectedUser.name}</Text>
      <Button onPress={() => navigate('Profile')} title="Profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
