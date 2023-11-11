// test with the Stack Navigator for React-Native
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SoundInventory } from '../SoundInventory/SoundInventory';
import Onboarding from './OnboardingPage';
import { setupPrompts, setupPersistenceKeys, setupPageElements } from '../../util/soundInventoryDataAndKeys';

export type OnboardingStackParamList = {
  Onboarding1: {prompt: string, pageNumber: number, persistenceKey: string, setupElements: string[]};
  Onboarding2: {prompt: string, pageNumber: number, persistenceKey: string, setupElements: string[]};
  Onboarding3: {prompt: string, pageNumber: number, persistenceKey: string, setupElements: string[]};
  Onboarding4: {prompt: string, pageNumber: number, persistenceKey: string, setupElements: string[]};
};

export default function OnboardingMain() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding1"
          screenOptions={{
            headerShown: false // This hides the header for all screens
          }}
        >
          <Stack.Screen name="SoundInventory" component={SoundInventory}/>

          <Stack.Screen name="Onboarding1" component={Onboarding as any} 
          initialParams = {{
            pageNumber: 0,
            prompt: setupPrompts[0],
            persistenceKey: setupPersistenceKeys[0],
            setupElements: setupPageElements[0]
          }}
          />
          <Stack.Screen name="Onboarding2" component={Onboarding as any}/>
          <Stack.Screen name="Onboarding3" component={Onboarding as any}/>
          <Stack.Screen name="Onboarding4" component={Onboarding as any}/>

        </Stack.Navigator>
      </NavigationContainer>
    );
}
    