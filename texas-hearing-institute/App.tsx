

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SpeechSetting from './pages/SpeechSetting';
import Comelater from './pages/ComeLater';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Speech Setting Home Screen" component={SpeechSetting} />
      <Stack.Screen name="Coming Soon" component={Comelater} />

    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;