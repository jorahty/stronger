import { useViewModel } from '../model/ViewModel';
import NavigationStack from './NavigationStack';
import Login from './Login';

export default function Main() {
  const { loginResponse } = useViewModel();
  return loginResponse ? <NavigationStack /> : <Login />;
}
