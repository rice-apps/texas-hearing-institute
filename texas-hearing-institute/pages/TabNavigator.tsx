import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import PracticeNavigator from './PracticeNavigator';
import { SoundInventory } from './SoundInventory/SoundInventory';
import AccountPage from './AccountPage/AccountPage';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TabParamList = {
	Practice: undefined;
	SoundInventory: undefined;
	Account: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
	return (
		<Tab.Navigator
			initialRouteName="Practice"
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
			<Tab.Screen name="Practice" component={PracticeNavigator} />
			<Tab.Screen name="SoundInventory" component={SoundInventory} />
			<Tab.Screen name="Account" component={AccountPage} />
		</Tab.Navigator>
	);
}
