import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
} from '@react-navigation/drawer';
import { Image } from 'react-native';
import * as React from 'react';

export default function CustomDrawerContent(
	props: DrawerContentComponentProps,
) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItem
				label="Account Settings"
				icon={() => (
					<Image
						source={require('../assets/turtle.png')}
						style={{ width: 24, height: 24 }}
					/>
				)}
				labelStyle={{ marginLeft: -24, marginRight: -16, color: '#333' }}
				onPress={() => props.navigation.navigate('Account')}
			/>
			<DrawerItem
				label="Sound Inventory"
				icon={() => (
					<Image
						source={require('../assets/sound-inventory.png')}
						style={{ width: 24, height: 24 }}
					/>
				)}
				labelStyle={{ marginLeft: -24, marginRight: -16, color: '#333' }}
				onPress={() => props.navigation.navigate('SoundInventory')}
			/>
		</DrawerContentScrollView>
	);
}
