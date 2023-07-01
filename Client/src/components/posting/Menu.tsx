import { Modal, Pressable, SafeAreaView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, styles } from '../../theme/theme';
import { Posting } from '../../repo/posting';
import Button from '../common/Button';

interface Props {
  selectedPosting: null | Posting;
  setSelectedPosting: (posting: null | Posting) => void;
}

export default function PostingMenu({
  selectedPosting,
  setSelectedPosting,
}: Props) {
  const close = () => {
    setSelectedPosting(null);
  };

  return (
    <Modal visible={selectedPosting !== null} transparent animationType="slide">
      <Pressable
        onPress={close}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <SafeAreaView
          style={{
            width: '100%',
            maxWidth: 900,
            backgroundColor: colors.white,
            borderTopWidth: 2,
            borderColor: colors.grey,
          }}>
          <View style={{ padding: 20, gap: 20 }}>
            <Button title="close" />
            <Button title="close" />
            <Button
              title="Close"
              onPress={close}
              outlined
              icon={
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  style={[
                    styles.buttonIcon,
                    { fontSize: 24 },
                    styles.buttenTextOutlined,
                  ]}
                />
              }
            />
          </View>
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
}
