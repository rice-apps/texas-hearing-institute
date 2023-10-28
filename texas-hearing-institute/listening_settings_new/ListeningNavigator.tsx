import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PracticeTab from './PracticeTab';
import PlaceCue from './PlaceCue';
import {SafeAreaView} from "react-native";

const Stack = createNativeStackNavigator();

export default function ListeningNavigator() {
    return (
        <NavigationContainer>
            <SafeAreaView style={{flex: 1}}>
                <Stack.Navigator>
                    <Stack.Screen name="Practice" component={PracticeTab}/>
                    <Stack.Screen name="Place Cue" component={PlaceCue}/>
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    )
}
