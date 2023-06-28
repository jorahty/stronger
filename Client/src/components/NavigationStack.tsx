import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home, { HomeHeaderLeft, HomeHeaderRight } from './Home';
import Chats from './Chats';
import Profile from './Profile';
import Chat from './Chat';
import Edit from './Edit';

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
        <Stack.Screen
          name="Chats"
          component={Chats}
          options={{ headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{ headerTitleAlign: 'center' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
