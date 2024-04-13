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
import ReportScreen from './ReportScreen';
import Active from './Active';

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
	ActivePractice: undefined;
	ReportScreen: { phonemes: PhonemeListProps; report: ReportInfo };
};
export interface Phoneme {
	name: string;
	correct: boolean;
}
export interface PhonemeListProps {
	phonemes: Phoneme[];
	user: string;
}
export interface ReportInfo {
	child: string;
	createdAt: string;
	type: string;
	subtype: string;
	sound: string;
	mode: string;
	voweltype: string;
	combinations: string[];
	numSyllables: number;
	correct: boolean[];
}

const Stack = createNativeStackNavigator<PracticeParamList>();

export default function PracticeNavigator() {
	// TODO: find a new home for this file
	return (
		<Stack.Navigator
			initialRouteName="ActivePractice"
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
			<Stack.Screen name="ActivePractice" component={Active} />
			<Stack.Screen name="ReportScreen" component={ReportScreen} />
			{/*stack screen for active practice and report*/}
		</Stack.Navigator>
	);
}
