import { useViewModel } from '../model/ViewModel';
import Home from './Home';
import Login from './Login';

export default function Main() {
  const { loginResponse } = useViewModel();
  return loginResponse ? <Home /> : <Login />;
}
