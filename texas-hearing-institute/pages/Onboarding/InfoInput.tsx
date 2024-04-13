import React from 'react';
import { View, Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { SvgXml } from 'react-native-svg';
import leftArrow from '../../icons/leftarrow';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from './OnboardingNavigator';
import FloatingButton from '../../components/FloatingButton';
import { useState } from 'react';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'InfoInput'>;

export default function InfoInput({ navigation }: Props) {
	const [childname, setChildname] = useState<string>('');
	const [groupid, setGroupid] = useState<string>('');
	const handleChildname = (text: string) => {
		setChildname(text);
	};
	const handleGroupid = (text: string) => {
		setGroupid(text);
	};

	// const handleClinicianID = async (text: string) => {
	// 	const { data, error } = await supabase.from('clinicians').select('clinician').eq('groupId', text)
	// 	if (data != null && data.length > 0) {
	// 		return data;
	// 	}
	// 	return null;
	// }
	// const clinID = handleClinicianID(groupid).then(res => {
	// 	if (res != null) {
	// 		return res;
	// 	}
	// 	return ""
	// })

	// const saveChildInfo = async(name: String, groupId: String) => {

	// 	const { data: { user } } = await supabase.auth.getUser()
	// 	const { error } = await supabase.from('children').insert(
	// 		{
	// 			name: name,
	// 			parentID: user,
	// 			clinician: null
	// 		}
	// 	)
	// 	if (error) {
	// 		alert("error saving child info " + error)
	// 	}

	// }
	return (
		<CustomSafeAreaView>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: 8,
					marginBottom: 38,
					marginHorizontal: 27,
				}}
			>
				<Pressable onPress={() => navigation.goBack()}>
					<SvgXml xml={leftArrow} width={24} height={24} />
				</Pressable>
				<View
					style={{
						width: 184,
					}}
				>
					<ProgressBar progress={25} />
				</View>
				<View
					style={{
						width: 38,
					}}
				/>
			</View>
			<View
				style={{
					marginHorizontal: 32,
					flexGrow: 1,
				}}
			>
				<View style={{ marginBottom: 40 }}>
					<Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 12 }}>
						Let’s get to know your child
					</Text>
					<Text style={{ fontSize: 16, lineHeight: 24 }}>
						We’ll use this information to correctly refer to them throughout
						their practice
					</Text>
				</View>
				<View>
					<Text style={styles.inputLabel}>Your child’s name</Text>
					<TextInput
						style={styles.input}
						value={childname}
						onChangeText={handleChildname}
					></TextInput>
					<Text style={styles.inputLabel}>Group ID</Text>
					<TextInput
						value={groupid}
						onChangeText={handleGroupid}
						style={styles.input}
					></TextInput>
				</View>
				<FloatingButton
					label={'Continue'}
					onPress={() =>
						navigation.navigate(`Vowels`, {
							name: childname,
							groupID: groupid,
						})
					}
				/>
			</View>
		</CustomSafeAreaView>
	);
}

const styles = StyleSheet.create({
	inputLabel: {
		marginBottom: 12,
		fontSize: 16,
	},
	input: {
		borderWidth: 2,
		borderColor: '#E1E1E1',
		height: 54,
		width: 326,
		borderRadius: 10,
		marginBottom: 16,
	},
});
