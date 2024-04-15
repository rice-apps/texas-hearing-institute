import React from 'react';
import { View, Button, Image } from 'react-native';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { AuthStackParamList } from './AuthNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from './AppNavigator';
import { User } from '../../user/User';

type AppNav = StackNavigationProp<AppStackParamList>;
type AuthNav = StackNavigationProp<AuthStackParamList>;

export default function SignIn() {
	const appNavigation = useNavigation<AppNav>();
	const authNavigation = useNavigation<AuthNav>();

	// TODO: replace with actual user info gained from onboarding process
	const user = new User();
	user.setNameTest('Baylee');

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
					{/* TODO: add sign in buttons here, route to onboarding or home as appropriate */}
					<Button
						title="Test Onboarding"
						onPress={() => {
							authNavigation.navigate('InfoInput');
						}}
					/>
					<View style={{ marginBottom: 20 }} />
					<Button
						title="Test Signed In"
						onPress={() => {
							appNavigation.navigate('Home', { user: user });
						}}
					/>
				</View>
			</View>
		</CustomSafeAreaView>
	);
}
