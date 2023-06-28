import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home, { HomeHeaderLeft, HomeHeaderRight } from './Home';
import Chats from './Chats';
import Profile from './Profile';

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitleAlign: 'center',
            headerLeft: HomeHeaderLeft,
            headerRight: HomeHeaderRight,
          }}
        />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
