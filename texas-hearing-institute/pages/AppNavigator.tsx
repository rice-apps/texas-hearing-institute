import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './Onboarding/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';

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
				<Stack.Screen name="Home" component={DrawerNavigator} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
