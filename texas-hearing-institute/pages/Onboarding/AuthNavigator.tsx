import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignIn';
import InfoInput from './InfoInput';
import VowelSelect from './VowelSelect';
import ConsonantSelect from './ConsonantSelect';
import Done from './Done';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuthStackParamList = {
	SignIn: undefined;
	InfoInput: { id: string };
	Vowels: { id: string; name: string; groupID: string };
	Consonants: { id: string; name: string; groupID: string };
	Done: { id: string; name: string; groupID: string };
};

export default function AuthNavigator() {
	const Stack = createNativeStackNavigator<AuthStackParamList>();

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
