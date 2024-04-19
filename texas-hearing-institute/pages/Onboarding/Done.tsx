import React, { useContext } from 'react';
import { View, Image, Pressable, Text, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import leftArrow from '../../icons/leftarrow';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { AuthStackParamList } from './AuthNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FloatingButton from '../../components/FloatingButton';
import { supabase } from '../../lib/supabase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserContext, UserContextType } from '../../user/UserContext';
import { v4 as uuidv4 } from 'uuid';
import { AppStackParamList } from '../AppNavigator';

type AppNav = StackNavigationProp<AppStackParamList>;
type AuthNav = StackNavigationProp<AuthStackParamList>;
type Props = NativeStackScreenProps<AuthStackParamList, 'Done'>;

export default function Done({ route }: Props) {
	const { id, name, groupID } = route.params;
	const appNavigation = useNavigation<AppNav>();
	const authNavigation = useNavigation<AuthNav>();

	const { user } = useContext(UserContext) as UserContextType;

	const fetchClinicianID = async (groupId: string) => {
		const { data, error } = await supabase
			.from('clinicians')
			.select('id')
			.eq('groupId', groupId)
			.maybeSingle();

		if (!error && data) {
			return data.id;
		} else {
			throw new Error('Invalid Group ID');
		}
	};

	const saveChildInfo = async () => {
		const cID = await fetchClinicianID(groupID);
		const uID = uuidv4();
		user.setID(uID);
		user.setName(name);
		user.setGroupId(groupID);
		const { error } = await supabase.from('children').insert({
			id: uID,
			name: name,
			parentuser: id,
			clinician: cID,
		});
		if (error) {
			console.log(error);
			throw new Error('Failed to save data');
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
				<Pressable onPress={() => authNavigation.goBack()}>
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
					saveChildInfo()
						.then(() => {
							authNavigation.popToTop();
							appNavigation.reset({
								index: 0,
								routes: [{ name: 'Home' }],
							});
						})
						.catch((e: unknown) => {
							// TODO better error handling
							Alert.alert('Error', 'error', [
								{ text: 'OK', onPress: () => console.log(e) },
							]);
						});
				}}
			/>
		</CustomSafeAreaView>
	);
}
