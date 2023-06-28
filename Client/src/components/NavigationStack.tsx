import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home, { HomeHeaderRight } from './Home';
import Chats from './Chats';

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={() => ({
            headerRight: HomeHeaderRight,
          })}
        />
        <Stack.Screen name="Chats" component={Chats} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
