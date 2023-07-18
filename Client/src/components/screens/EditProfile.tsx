import { useState } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { styles } from '../../theme/theme';
import { useViewModel } from '../../model/ViewModel';
import Button from '../common/Button';
import { imageEndpoint } from '../../repo/endpoint';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const PlaceholderImage = require('../../../assets/pfp.jpeg');

export default function EditProfile() {
  const { selectedUserDetails, updateUserDetails } = useViewModel();
  const { navigate } = useNavigation<any>();
  const [name, setName] = useState(selectedUserDetails.name);
  const [imageUri, setImageUri] = useState('');
  const [location, setLocation] = useState(selectedUserDetails.location);
  const [website, setWebsite] = useState(selectedUserDetails.website);
  const [bio, setBio] = useState(selectedUserDetails.bio);

  const onSave = () => {
    updateUserDetails({
      name,
      imageUri,
      location,
      website,
      bio,
    });
    navigate('Profile');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          padding: 20,
          gap: 20,
          justifyContent: 'space-between',
        }}>
        <View style={{ gap: 20 }}>
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{
                  uri: imageUri || imageEndpoint + selectedUserDetails.image,
                }}
                style={{ width: 160, height: 160, borderRadius: 10 }}
              />
            </TouchableOpacity>
            <View style={{ justifyContent: 'space-around', gap: 10 }}>
              <TextInput
                style={[styles.textInput, styles.formInput]}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Ionicons name="location-outline" size={24} color="black" />
                <TextInput
                  style={[styles.textInput, styles.formInput]}
                  placeholder="Location"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Ionicons name="link-outline" size={24} color="black" />
                <TextInput
                  style={[styles.textInput, styles.formInput]}
                  placeholder="Website"
                  value={website}
                  onChangeText={setWebsite}
                />
              </View>
            </View>
          </View>
          <TextInput
            style={[styles.textInput, styles.formInput, { minHeight: 100 }]}
            placeholder="Bio"
            value={bio}
            onChangeText={setBio}
            multiline
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <View style={{ flex: 1 }}>
            <Button
              title="Cancel"
              onPress={() => navigate('Profile')}
              outlined
              icon={
                <FontAwesome
                  name="close"
                  style={[styles.buttonIcon, styles.buttenTextOutlined]}
                />
              }
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Save Changes"
              onPress={onSave}
              icon={<FontAwesome name="check" style={styles.buttonIcon} />}
              disabled={!name || !location}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
    //   <Button title="Pick an image from camera roll" onPress={pickImage} />
    //   {imageUri && (
    //     <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
    //   )}
    //   <Button title="Save" onPress={onSave} />
  );
}
