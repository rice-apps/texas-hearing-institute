// test with the Stack Navigator for React-Native
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignIn';
import InfoInput from './InfoInput';
import VowelSelect from './VowelSelect';
import ConsonantSelect from './ConsonantSelect';
import Done from './Done';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type OnboardingStackParamList = {
	SignIn: undefined;
	InfoInput: undefined;
	Vowels: undefined;
	Consonants: undefined;
	Done: undefined;
};

export default function OnboardingNavigator() {
	const Stack = createNativeStackNavigator<OnboardingStackParamList>();

	return (
		<Stack.Navigator
			initialRouteName="SignIn"
			screenOptions={{
				headerShown: false, // This hides the header for all screens
				contentStyle: {
					backgroundColor: 'white',
				},
			}}
		>
			<Stack.Screen name="SignIn" component={SignIn} />
			<Stack.Screen name="InfoInput" component={InfoInput} />
			<Stack.Screen name="Vowels" component={VowelSelect} />
			<Stack.Screen name="Consonants" component={ConsonantSelect} />
			<Stack.Screen name="Done" component={Done} />
		</Stack.Navigator>
	);
}
