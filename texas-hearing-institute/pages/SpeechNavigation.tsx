

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SpeechSetting from './SpeechSetting';
import InitialConsonants from './InitialConsonants';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from "@eva-design/eva"

const Stack = createStackNavigator();

export default function SpeechSetup(){
    return(
    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Speech Setting Home Screen" component={SpeechSetting} />
          <Stack.Screen name="Initial Consonants" component={InitialConsonants} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>  
    )
}
