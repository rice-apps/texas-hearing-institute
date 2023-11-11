import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PracticeTab from './tabs/PracticeTab';
import PlaceCueTab from './tabs/PlaceCueTab';
import VarVowelsScreen from './tabs/VarVowelsScreen';
import MannerScreen from './tabs/MannerScreen';
import VoicingScreen from './tabs/VoicingScreen';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();


// This is the navigator of listening settings
// Use this componenet in App.tsx as follows:
// return <ListeningNavigator /> to see listening navigator
export default function ListeningNavigator() {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            {/* May need to remove this later since it will be implemented elsewhere, just temporary for now */}<StatusBar barStyle="dark-content" />
            <NavigationContainer>
                    <Stack.Navigator 
                        initialRouteName='Practice'
                        screenOptions={{
                            headerShadowVisible: false,
                            headerStyle: {
                                backgroundColor: 'white'
                            },
                            contentStyle: {
                                backgroundColor: '#FDFDFD'
                            },
                            headerTitleStyle: {
                                color: 'transparent'
                            },
                            headerBackTitle: 'Practice'
                        }}
                    >
                        <Stack.Screen name="Practice" component={PracticeTab} options={{ headerShown: false}}/>
                        <Stack.Screen name="Place Cue" component={PlaceCueTab} />
                        <Stack.Screen name="Variegated Vowels" component={VarVowelsScreen} />
                        <Stack.Screen name="Manner" component={MannerScreen} />
                        <Stack.Screen name="Voicing" component={VoicingScreen} />
                        {/* Other screens not implemented yet */}
                    </Stack.Navigator>
            </NavigationContainer>
        </ApplicationProvider>
    )
}
