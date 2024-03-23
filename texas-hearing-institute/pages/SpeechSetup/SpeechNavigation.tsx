import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SpeechSetting from './SpeechSetting';
import InitialConsonants from './InitialConsonants';

const Stack = createStackNavigator();

export default function SpeechNavigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Speech Setting Home Screen"
					component={SpeechSetting}
				/>
				<Stack.Screen name="Initial Consonants" component={InitialConsonants} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
