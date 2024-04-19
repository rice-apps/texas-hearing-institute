import React from 'react';
import { View, Image } from 'react-native';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import Auth from '../../components/Auth.native';

export default function SignIn() {
	return (
		<CustomSafeAreaView>
			<View
				style={{
					marginHorizontal: 32,
					justifyContent: 'space-between',
					alignItems: 'center',
					flexGrow: 1,
				}}
			>
				<View style={{ marginTop: 260 }}>
					<Image
						source={require('../../icons/thi-logo.png')}
						style={{ width: 270, height: 121 }}
					/>
				</View>
				<View style={{ marginBottom: 80 }}>
					<Auth />
				</View>
			</View>
		</CustomSafeAreaView>
	);
}
