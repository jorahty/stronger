import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { useViewModel } from '../model/ViewModel';
import { colors, styles } from '../theme/theme';
import Button from './common/Button';

export default function Login() {
  const { login, error } = useViewModel();
  const [username, setUsername] = useState('anika');
  const [password, setPassword] = useState('anika');

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grey,
      }}>
      <View style={{ width: '100%', maxWidth: 250, gap: 20 }}>
        <TextInput
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
