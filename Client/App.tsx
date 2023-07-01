import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Main from './src/components/Main';
import ViewModel from './src/model/ViewModel';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ddd',
      }}>
      <View style={{ flex: 1, maxWidth: 900 }}>
        <ViewModel>
          <Main />
        </ViewModel>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}
