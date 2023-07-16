import { Button, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground} from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { imageEndpoint } from '../../repo/endpoint';
import { useViewModel } from '../../model/ViewModel';
import { colors, styles as appStyles } from '../../theme/theme';
import { GET_DIRECT_MESSAGES, User } from '../../repo/user';


const PlaceholderImage = require('../../../assets/pfp.jpeg');
const Arrow = require('../../../assets/right_arrow.png');

export default function Chats() {
  const { navigate } = useNavigation<any>();
  const { getDirectMessages, directMessages, selectUser } = useViewModel();

  useEffect(() => {
    const intervalId = setInterval(() => getDirectMessages(), 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDirectMessagePress = (user: User) => {
    selectUser(user);
    navigate('Chat');
  };

  
  return (
    <View style={styles.container}>
      {directMessages.map((user: User) => (
        <TouchableOpacity
          key={user.username}
          onPress={() => handleDirectMessagePress(user)}
          style={styles.rectangle}>
          <View style={styles.profileImageContainer}>
          <ImageBackground
            source={
              user.image
                ? { uri: imageEndpoint + user.image }
                : PlaceholderImage
            }
            style={{ width: 60, height: 60, borderRadius: 10 }}
          />
          </View>
          <Text style={styles.username}>{user.name}</Text>
          <ImageBackground source={Arrow} style={styles.arrow} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  rectangle: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    flexDirection: 'row',
    padding: 20,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 900,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
  },
  profileImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  username: {
    ...appStyles.headline,
    flex: 1,
    marginLeft: 20,
  },
  arrow: {
    width: 16,
    height: 16,
    marginLeft: 20,
  },
});
