

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SpeechSetting from './pages/SpeechSetting';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Speech Setting Home Screen" component={SpeechSetting} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;