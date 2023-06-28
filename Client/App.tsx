import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import ViewModel from './src/model/ViewModel';

export default function App() {
  return (
    <ViewModel>
      <Main />
      <StatusBar style="dark" />
    </ViewModel>
  );
}
