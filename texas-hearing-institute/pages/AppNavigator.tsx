import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './Onboarding/AuthNavigator';
import TabNavigator from './TabNavigator';
import { NavigationContainer } from '@react-navigation/native';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AppStackParamList = {
	Auth: undefined;
	Home: undefined;
};

export default function AppNavigator() {
	const Stack = createNativeStackNavigator<AppStackParamList>();

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Auth"
				screenOptions={{
					headerShown: false, // This hides the header for all screens
					contentStyle: {
						backgroundColor: 'white',
					},
				}}
			>
				<Stack.Screen name="Auth" component={AuthNavigator} />
				<Stack.Screen name="Home" component={TabNavigator} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
