import { StyleSheet, View } from 'react-native';
import { useViewModel } from '../../model/ViewModel';
import Button from '../common/Button';

export default function EditProfile() {
  const { updateUserDetails } = useViewModel();

  return (
    <View style={styles.container}>
      <Button title="Save" onPress={updateUserDetails} />
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
