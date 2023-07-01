import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Posting } from '../../repo/posting';
import { colors, styles } from '../../theme/theme';
import formatISOString from '../../util/formatISOString';

interface Props {
  posting: Posting;
  setSelectedPosting: (posting: Posting) => void;
}

const PlaceholderImage = require('../../../assets/pfp.jpeg');

export default function PostingCard({ posting, setSelectedPosting }: Props) {
  return (
    <TouchableOpacity
      onPress={() => setSelectedPosting(posting)}
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
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.headline}>{posting.poster.name}</Text>
          <Text>{formatISOString(posting.date)}</Text>
        </View>
        <Text>{posting.content}</Text>
      </View>
    </TouchableOpacity>
  );
}
