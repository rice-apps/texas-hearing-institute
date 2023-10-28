import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PracticeTab from './tabs/PracticeTab';
import PlaceCueTab from './tabs/PlaceCueTab';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const Stack = createNativeStackNavigator();

// This is the navigator of listening settings
// Use this componenet in App.tsx as follows:
// return <ListeningNavigator /> to see listening navigator
export default function ListeningNavigator() {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <NavigationContainer>
                    <Stack.Navigator initialRouteName='Practice'>
                        <Stack.Screen name="Practice" component={PracticeTab} />
                        <Stack.Screen name="Place Cue" component={PlaceCueTab} />
                        {/* Other screens not implemented yet */}
                    </Stack.Navigator>
            </NavigationContainer>
        </ApplicationProvider>
    )
}
