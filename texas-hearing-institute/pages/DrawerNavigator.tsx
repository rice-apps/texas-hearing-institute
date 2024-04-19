import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import DrawerStackNavigator from './DrawerStackNavigator';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type DrawerParamList = {
	DrawerStack: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator
			initialRouteName="DrawerStack"
			screenOptions={() => ({
				headerShown: false,
				drawerPosition: 'right',
				drawerActiveBackgroundColor: '#FDFDFD',
				drawerStyle: {
					width: 200,
				},
				drawerLabelStyle: {
					marginLeft: -24,
					marginRight: -16,
					color: '#333',
				},
				swipeEdgeWidth: 60,
			})}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen name="DrawerStack" component={DrawerStackNavigator} />
		</Drawer.Navigator>
	);
}
