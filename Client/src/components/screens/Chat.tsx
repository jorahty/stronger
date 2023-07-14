import { useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, styles } from '../../theme/theme';
import { useViewModel } from '../../model/ViewModel';
import MessageCard from '../message/Card';
import MessageInput from '../message/Input';
import { imageEndpoint } from '../../repo/endpoint';

const PlaceholderImage = require('../../../assets/pfp.jpeg');

export default function Chat() {
  const { selectedUser, messages, getMessages } = useViewModel();
  const { navigate } = useNavigation<any>();

  useEffect(() => {
    const intervalId = setInterval(() => getMessages(), 2000);
    return () => clearInterval(intervalId);
  }, []);

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
            selectedUser.image
              ? { uri: imageEndpoint + selectedUser.image }
              : PlaceholderImage
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
      <MessageInput />
    </View>
  );
}
