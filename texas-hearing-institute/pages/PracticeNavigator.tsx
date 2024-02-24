import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PracticeTab from './ListeningSettings/tabs/PracticeTab';
import VarVowelsScreen from './ListeningSettings/tabs/VarVowelsScreen';
import MannerScreen from './ListeningSettings/tabs/MannerScreen';
import VoicingScreen from './ListeningSettings/tabs/VoicingScreen';
import PlaceCueScreen from './ListeningSettings/tabs/PlaceCueScreen';
import InitialConsonants from './SpeechSettings/tabs/InitialConsonants';
import FinalConsonants from './SpeechSettings/tabs/FinalConsonants';
import Vowels from './SpeechSettings/tabs/Vowels';

const Stack = createNativeStackNavigator();

export default function PracticeNavigator() {
	// TODO: find a new home for this file
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShadowVisible: false,
				contentStyle: {
					backgroundColor: 'white',
				},
				headerTitleStyle: {
					color: 'transparent',
				},
				headerTitle: '',
			}}
		>
			<Stack.Screen
				name="Home"
				component={PracticeTab}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Vowels" component={Vowels} />
			<Stack.Screen name="Initial Consonants" component={InitialConsonants} />
			<Stack.Screen name="Final Consonants" component={FinalConsonants} />
			<Stack.Screen name="Place Cue" component={PlaceCueScreen} />
			<Stack.Screen name="Variegated Vowels" component={VarVowelsScreen} />
			<Stack.Screen name="Manner" component={MannerScreen} />
			<Stack.Screen name="Voicing" component={VoicingScreen} />
		</Stack.Navigator>
	);
}
