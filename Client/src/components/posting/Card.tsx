import { View, Text, Image } from 'react-native';
import { Posting } from '../../repo/posting';
import { colors, styles } from '../../theme/theme';

interface Props {
  posting: Posting;
}

const PlaceholderImage = require('../../../assets/favicon.png');

export default function PostingCard({ posting }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 20,
        gap: 20,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkGrey,
      }}>
      <Image source={PlaceholderImage} style={{ width: 50, height: 50 }} />
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.headline}>{posting.poster.name}</Text>
          <Text>3m</Text>
        </View>
        <Text>{posting.content}</Text>
      </View>
    </View>
  );
}
