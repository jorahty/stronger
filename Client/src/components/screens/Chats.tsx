import { Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { imageEndpoint } from '../../repo/endpoint';
import { useViewModel } from '../../model/ViewModel';
import { colors, styles } from '../../theme/theme';

const PlaceholderImage = require('../../../assets/pfp.jpeg');

export default function Chats() {
  const { navigate } = useNavigation<any>();
  const { chats, selectUser } = useViewModel();

  return (
    <FlatList
      data={chats}
      renderItem={({ item: user }) => (
        <TouchableOpacity
          key={user.username}
          onPress={() => {
            selectUser(user);
            navigate('Chat');
          }}
          style={{
            flexDirection: 'row',
            padding: 20,
            gap: 20,
            backgroundColor: colors.white,
            borderBottomWidth: 1,
            borderBottomColor: colors.grey,
            alignItems: 'center',
          }}>
          <Image
            source={
              user.image
                ? { uri: imageEndpoint + user.image }
                : PlaceholderImage
            }
            style={{ width: 60, height: 60, borderRadius: 10 }}
          />
          <Text style={[styles.headline, { flex: 1 }]}>{user.name}</Text>
          <FontAwesome name="chevron-right" size={18} />
        </TouchableOpacity>
      )}
    />
  );
}
