import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PracticeTab from './Home';
import VarVowelsScreen from './ListeningSettings/tabs/VarVowelsScreen';
import MannerScreen from './ListeningSettings/tabs/MannerScreen';
import VoicingScreen from './ListeningSettings/tabs/VoicingScreen';
import PlaceCueScreen from './ListeningSettings/tabs/PlaceCueScreen';
import InitialConsonants from './SpeechSettings/tabs/InitialConsonants';
import FinalConsonants from './SpeechSettings/tabs/FinalConsonants';
import Vowels from './SpeechSettings/tabs/Vowels';
import ReportScreen from './ReportScreen';
import Active from './Active';
import { PracticeResult, PracticeSettings } from './types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PracticeParamList = {
	Home: undefined;
	Vowels: undefined;
	InitialConsonants: undefined;
	FinalConsonants: undefined;
	PlaceCue: undefined;
	VariegatedVowels: undefined;
	Manner: undefined;
	Voicing: undefined;
	ActivePractice: { settings: PracticeSettings; phonemes: string[][] };
	ReportScreen: { results: PracticeResult[] };
};

const Stack = createNativeStackNavigator<PracticeParamList>();

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
			<Stack.Screen name="InitialConsonants" component={InitialConsonants} />
			<Stack.Screen name="FinalConsonants" component={FinalConsonants} />
			<Stack.Screen name="PlaceCue" component={PlaceCueScreen} />
			<Stack.Screen name="VariegatedVowels" component={VarVowelsScreen} />
			<Stack.Screen name="Manner" component={MannerScreen} />
			<Stack.Screen name="Voicing" component={VoicingScreen} />
			<Stack.Screen
				name="ActivePractice"
				component={Active}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ReportScreen"
				component={ReportScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
