import { useState } from 'react';
import { Text, TextInput, View, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { useViewModel } from '../model/ViewModel';
import { colors, styles } from '../theme/theme';
import Button from './common/Button';

const Logo = require('../../assets/logo.png');

export default function Login() {
  const { login, error } = useViewModel();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightGrey,
      }}>
      <View style={{ width: '100%', maxWidth: 250, gap: 20 }}>
        <View
          style={{ width: '100%', alignItems: 'center', paddingBottom: 10 }}>
          <Image
            source={Logo}
            style={{
              width: 468 / 3,
              height: 327 / 3,
            }}
          />
        </View>
        <TextInput
          autoCapitalize="none"
          style={styles.textInput}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button
          title="Login"
          icon={<Entypo name="login" style={styles.buttonIcon} />}
          onPress={() => login(username, password)}
          disabled={username.length < 1 || password.length < 1}
        />
        <Text>{error}</Text>
      </View>
    </View>
  );
}
