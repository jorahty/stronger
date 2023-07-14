import { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useViewModel } from '../../model/ViewModel';
import Button from '../common/Button';

export default function EditProfile() {
  const { updateUserDetails } = useViewModel();
  const [imageUri, setImageUri] = useState<null | string>(null);

  const onSave = () => {
    updateUserDetails(imageUri);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Save" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
