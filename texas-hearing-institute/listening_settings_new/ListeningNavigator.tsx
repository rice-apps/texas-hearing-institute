import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PracticeTab from './PracticeTab';
import PlaceCue from './PlaceCue';

const Stack = createNativeStackNavigator();

export default function ListeningNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Practice" component={PracticeTab} />
                <Stack.Screen name="Place Cue" component={PlaceCue} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
