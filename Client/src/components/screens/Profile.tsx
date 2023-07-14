import { Image, Text, View, SafeAreaView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import { styles } from '../../theme/theme';
import { useViewModel } from '../../model/ViewModel';
import Button from '../common/Button';
import { imageEndpoint } from '../../repo/endpoint';

const PlaceholderImage = require('../../../assets/pfp.jpeg');

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
        <View style={{ gap: 20 }}>
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <Image
              source={
                selectedUserDetails.image
                  ? { uri: imageEndpoint + selectedUserDetails.image }
                  : PlaceholderImage
              }
              style={{ width: 160, height: 160, borderRadius: 10 }}
            />
            <View style={{ justifyContent: 'space-around' }}>
              <Text style={styles.title}>{selectedUserDetails.name}</Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Ionicons name="location-outline" size={24} color="black" />
                <Text>{selectedUserDetails.location}</Text>
              </View>
              {selectedUserDetails.website && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Ionicons name="link-outline" size={24} color="black" />
                  <Text
                    style={styles.link}
                    onPress={() =>
                      Linking.openURL(selectedUserDetails.website)
                    }>
                    {selectedUserDetails.website.replace(/^https?:\/\//i, '')}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <Text>{selectedUserDetails.bio}</Text>
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
