import { View, Text, Image } from 'react-native';
import { Posting } from '../../repo/posting';
import { colors, styles } from '../../theme/theme';
import formatISOString from '../../util/formatISOString';

interface Props {
  posting: Posting;
}

const PlaceholderImage = require('../../../assets/pfp.jpeg');

export default function PostingCard({ posting }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 20,
        gap: 20,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
      }}>
      <Image
        source={
          posting.poster.image
            ? { uri: posting.poster.image }
            : PlaceholderImage
        }
        style={{ width: 60, height: 60, borderRadius: 10 }}
      />
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.headline}>{posting.poster.name}</Text>
          <Text>{formatISOString(posting.date)}</Text>
        </View>
        <Text>{posting.content}</Text>
      </View>
    </View>
  );
}
