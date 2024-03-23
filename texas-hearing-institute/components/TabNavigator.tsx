import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import PracticeNavigator from '../pages/PracticeNavigator';
import { SoundInventory } from '../pages/SoundInventory/SoundInventory';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator
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
				<Tab.Screen name="Sound Inventory" component={SoundInventory} />
				{/* TODO: replace below with account screen component */}
				<Tab.Screen name="Account" component={SoundInventory} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
