import { Modal, Pressable, SafeAreaView, View } from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { colors, styles } from '../../theme/theme';
import { Posting } from '../../repo/posting';
import Button from '../common/Button';
import { useViewModel } from '../../model/ViewModel';

interface Props {
  selectedPosting: null | Posting;
  setSelectedPosting: (posting: null | Posting) => void;
}

export default function PostingMenu({
  selectedPosting,
  setSelectedPosting,
}: Props) {
  const { loginResponse, deletePosting } = useViewModel();

  const close = () => {
    setSelectedPosting(null);
  };

  const removePosting = () => {
    deletePosting(selectedPosting?.id);
    setSelectedPosting(null);
  };

  return (
    <Modal visible={selectedPosting !== null} transparent>
      <Pressable
        onPress={close}
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#00000077',
            flex: 1,
            justifyContent: 'flex-end',
            width: '100%',
            maxWidth: 900,
          }}>
          <SafeAreaView
            style={{
              backgroundColor: colors.white,
              borderTopWidth: 2,
              borderColor: colors.grey,
            }}>
            <View style={{ padding: 20, gap: 20 }}>
              {selectedPosting?.poster.username === loginResponse.username ? (
                <Button
                  title="Remove Posting"
                  onPress={removePosting}
                  icon={<FontAwesome name="trash" style={styles.buttonIcon} />}
                  destructive
                />
              ) : (
                <>
                  <Button
                    title={`Send Message to ${selectedPosting?.poster.name}`}
                    icon={
                      <Ionicons name="chatbubbles" style={styles.buttonIcon} />
                    }
                  />
                  <Button
                    title={`View ${selectedPosting?.poster.name}'s Profile`}
                    icon={<Ionicons name="person" style={styles.buttonIcon} />}
                  />
                </>
              )}
              <Button
                title="Close"
                onPress={close}
                outlined
                icon={
                  <FontAwesome
                    name="close"
                    style={[styles.buttonIcon, styles.buttenTextOutlined]}
                  />
                }
              />
            </View>
          </SafeAreaView>
        </View>
      </Pressable>
    </Modal>
  );
}
