import React from 'react';
import { View, Button, Image } from 'react-native';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { AuthStackParamList } from './AuthNavigator';
import { useNavigation } from '@react-navigation/native';
import { TabParamList } from '../TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import Auth from '../../components/Auth.native';

type TabNav = BottomTabNavigationProp<TabParamList>;
type AuthNav = StackNavigationProp<AuthStackParamList>;

export default function SignIn() {
	const tabNavigation = useNavigation<TabNav>();
	const authNavigation = useNavigation<AuthNav>();

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
							tabNavigation.navigate('Practice');
						}}
					/>
				</View>
			</View>
		</CustomSafeAreaView>
	);
}
