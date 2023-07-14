import { Text, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import { styles } from '../../theme/theme';
import { useViewModel } from '../../model/ViewModel';
import Button from '../common/Button';

export default function Profile() {
  const { selectedUserDetails, loginResponse } = useViewModel();
  const { navigate } = useNavigation<any>();

  if (!selectedUserDetails) return <></>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          padding: 20,
          gap: 20,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text>{selectedUserDetails.name}'s Profile</Text>
        </View>
        {selectedUserDetails.username === loginResponse.user.username ? (
          <Button
            onPress={() => navigate('Edit')}
            title="Edit Profile"
            icon={<FontAwesome5 name="edit" style={styles.buttonIcon} />}
          />
        ) : (
          <Button
            onPress={() => navigate('Chat')}
            title={`Send Message to ${selectedUserDetails.name}`}
            icon={<Ionicons name="chatbubbles" style={styles.buttonIcon} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
