import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, styles } from '../../theme/theme';
import { useViewModel } from '../../model/ViewModel';
import MessageCard from '../message/Card';
import MessageCreate from '../message/Create';

const PlaceholderImage = require('../../../assets/pfp.jpeg');

export default function Chat() {
  const { selectedUser, messages } = useViewModel();
  const { navigate } = useNavigation<any>();
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigate('Profile')}
        style={{
          flexDirection: 'row',
          padding: 20,
          gap: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white,
          borderBottomWidth: 1,
          borderBottomColor: colors.grey,
        }}>
        <Image
          source={
            selectedUser.image ? { uri: selectedUser.image } : PlaceholderImage
          }
          style={{ width: 60, height: 60, borderRadius: 10 }}
        />
        <Text style={styles.headline}>{selectedUser.name}</Text>
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={{ padding: 20 }}
        style={{ height: 0 }}
        data={messages}
        renderItem={({ item }) => <MessageCard key={item.id} message={item} />}
      />
      <MessageCreate />
    </View>
  );
}
