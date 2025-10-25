import React from 'react';
import {
	View,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	Alert,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import leftArrow from '../../icons/leftarrow';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from './AuthNavigator';
import FloatingButton from '../../components/FloatingButton';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

type Props = NativeStackScreenProps<AuthStackParamList, 'InfoInput'>;

export default function InfoInput({ route, navigation }: Props) {
	const { id } = route.params;
	const [groupID, setGroupID] = useState<string>('');

	async function validGroupNavigate() {
		const { data, error } = await supabase
			.from('clinicians')
			.select('id')
			.eq('groupId', groupID)
			.maybeSingle();

		if (!error && data) {
			navigation.navigate(`Vowels`, {
				groupID: groupID,
				id: id,
			});
		} else {
			Alert.alert('Error', 'Invalid group ID entered', [{ text: 'OK' }]);
		}
	}

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
					<Text style={styles.inputLabel}>Group ID</Text>
					<TextInput
						value={groupID}
						onChangeText={(id) => setGroupID(id)}
						style={styles.input}
					></TextInput>
				</View>
				<FloatingButton
					label={'Continue'}
					onPress={() => validGroupNavigate()}
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
