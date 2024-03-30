import React from 'react';
import { View, Image, Pressable, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import leftArrow from '../../icons/leftarrow';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { OnboardingStackParamList } from './OnboardingNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../components/TabNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FloatingButton from '../../components/FloatingButton';

type TabNav = BottomTabNavigationProp<TabParamList>;
type OnboardingNav = StackNavigationProp<OnboardingStackParamList>;

export default function Done() {
	const tabNavigation = useNavigation<TabNav>();
	const onboardingNavigation = useNavigation<OnboardingNav>();

	return (
		<CustomSafeAreaView>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: 40,
					marginTop: 32,
					marginBottom: 32,
					marginHorizontal: 27,
				}}
			>
				<Pressable onPress={() => onboardingNavigation.goBack()}>
					<SvgXml xml={leftArrow} width={24} height={24} />
				</Pressable>
				<View
					style={{
						width: 184,
					}}
				>
					<ProgressBar progress={100} />
				</View>
				<View
					style={{
						width: 24,
					}}
				/>
			</View>

			<View
				style={{
					marginHorizontal: 32,
					marginTop: 174,
					alignItems: 'center',
				}}
			>
				<View style={{ marginBottom: 24, marginLeft: 10 }}>
					<Image
						source={require('../../icons/fireworks.png')}
						style={{ width: 120, height: 120 }}
					/>
				</View>
				<View style={{ alignItems: 'center' }}>
					<Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>
						You're all set!
					</Text>
					<Text
						style={{
							fontSize: 18,
							textAlign: 'center',
							lineHeight: 24,
							paddingHorizontal: 20,
						}}
					>
						You can change these sound inventory settings at any time
					</Text>
				</View>
			</View>
			<FloatingButton
				label={'Continue'}
				onPress={() => {
					onboardingNavigation.popToTop();
					tabNavigation.navigate(`Practice`);
				}}
			/>
		</CustomSafeAreaView>
	);
}