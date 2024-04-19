import React from 'react';
import PracticeNavigator from './PracticeNavigator';
import { SoundInventory } from './SoundInventory/SoundInventory';
import AccountPage from './AccountPage/AccountPage';
import { createStackNavigator } from '@react-navigation/stack';
import leftArrow from '../icons/leftarrow';
import { SvgXml } from 'react-native-svg';
import { View } from 'react-native';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type DrawerStackParamList = {
	Practice: undefined;
	SoundInventory: undefined;
	Account: undefined;
};

const DrawerStack = createStackNavigator<DrawerStackParamList>();

export default function DrawerStackNavigator() {
	return (
		<DrawerStack.Navigator
			initialRouteName="Practice"
			screenOptions={() => ({
				headerShown: true,
				headerTitle: '',
				headerBackImage: () => (
					<View style={{ marginLeft: 24 }}>
						<SvgXml xml={leftArrow} width={24} height={24} />
					</View>
				),
				headerLeftContainerStyle: { marginTop: 20 },
				headerBackTitleVisible: false,
				headerBackgroundContainerStyle: { backgroundColor: '#FDFDFD' },
				cardStyle: { backgroundColor: '#FDFDFD' },
				headerShadowVisible: false,
			})}
		>
			<DrawerStack.Screen
				name="Practice"
				component={PracticeNavigator}
				options={{ headerShown: false }}
			/>
			<DrawerStack.Screen name="SoundInventory" component={SoundInventory} />
			<DrawerStack.Screen name="Account" component={AccountPage} />
		</DrawerStack.Navigator>
	);
}
