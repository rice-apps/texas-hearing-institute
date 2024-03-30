import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import PracticeNavigator from '../pages/PracticeNavigator';
import { SoundInventory } from '../pages/SoundInventory/SoundInventory';
import OnboardingNavigator from '../pages/Onboarding/OnboardingNavigator';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TabParamList = {
	Onboarding: undefined;
	Practice: undefined;
	SoundInventory: undefined;
	Account: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Onboarding"
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarIconStyle: { display: 'none' },
					tabBarLabelPosition: 'beside-icon',
					tabBarLabel: ({ focused }) => {
						return focused ? (
							<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
								{route.name}
							</Text>
						) : (
							<Text style={{ fontWeight: 'normal', fontSize: 16 }}>
								{route.name}
							</Text>
						);
					},
					tabBarStyle: {
						borderTopWidth: 0,
						backgroundColor: '#FFFFFF',
						borderTopRightRadius: 30,
						borderTopLeftRadius: 30,
						height: 71,
						paddingBottom: 5,
						position: 'absolute',
						elevation: 0,
					},
				})}
			>
				{/* Handles Login + Onboarding */}
				<Tab.Screen name="Onboarding" component={OnboardingNavigator} />
				<Tab.Screen name="Practice" component={PracticeNavigator} />
				<Tab.Screen name="SoundInventory" component={SoundInventory} />
				{/* TODO: replace below with account screen component */}
				<Tab.Screen name="Account" component={SoundInventory} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
