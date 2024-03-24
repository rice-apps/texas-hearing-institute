import React from 'react';
import { View, Button, Image } from 'react-native';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { OnboardingStackParamList } from './OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import { TabParamList } from '../../components/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

type TabNav = BottomTabNavigationProp<TabParamList>;
type OnboardingNav = StackNavigationProp<OnboardingStackParamList>;

export default function SignIn() {
	const tabNavigation = useNavigation<TabNav>();
	const onboardingNavigation = useNavigation<OnboardingNav>();

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
							onboardingNavigation.navigate('InfoInput');
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
