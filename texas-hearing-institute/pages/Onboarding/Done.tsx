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
import { supabase } from '../../lib/supabase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { parse, validate } from 'uuid';

type TabNav = BottomTabNavigationProp<TabParamList>;
type OnboardingNav = StackNavigationProp<OnboardingStackParamList>;
type Props = NativeStackScreenProps<OnboardingStackParamList, 'Done'>;

export default function Done({ route }: Props) {
	const { name, groupID } = route.params;
	const tabNavigation = useNavigation<TabNav>();
	const onboardingNavigation = useNavigation<OnboardingNav>();

	const handleClinicianID = async (text: string) => {
		const { data, error } = await supabase
			.from('clinicians')
			.select('id')
			.eq('groupId', text);

		if (error) {
			return parse('');
		}
		if (data != null && data.length > 0) {
			console.log('data[0] is ' + validate(data[0].id));
			return data[0].id;
		}
	};

	const saveChildInfo = async () => {
		// const { data: { user } } = await supabase.auth.getUser()
		// if (user == null) {
		// 	alert("user does not exist");
		// }
		const uuid = '4e319837-169a-4d94-869b-21eecf29d7c3';
		const cID = handleClinicianID(groupID).then((res) => {
			return res.getId;
		});
		console.log('clin ID ' + cID);
		const { error } = await supabase.from('children').insert({
			name: name,
			parentuser: uuid,
			clinician: cID,
		});
		if (error) {
			alert('error saving child info ' + error.message);
		}
	};
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
					saveChildInfo();
					onboardingNavigation.popToTop();
					tabNavigation.navigate(`Practice`);
				}}
			/>
		</CustomSafeAreaView>
	);
}
