import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import leftArrow from '../../icons/leftarrow';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import ToggleGridButtons from '../../components/ToggleGridButtonsComponent/ToggleGridButtons';
import {
	storeItemSelection,
	retrieveItemSelections,
} from '../../utils/persistSelection';
import {
	consonantInventoryPersistenceKey,
	consonants,
} from '../../utils/soundInventoryDataAndKeys';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from './OnboardingNavigator';
import FloatingButton from '../../components/FloatingButton';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Consonants'>;

// Minimum number of consonants that must be selected
const MIN_SELECTED = 4;

export default function ConsonantSelect({ navigation, route }: Props) {
	const { name, groupID, vowels } = route.params;
	const [itemsSelected, setItemsSelected] = useState(() => {
		// Start load from storage and set state once load completes
		retrieveItemSelections(consonantInventoryPersistenceKey, consonants).then(
			(result) => {
				setItemsSelected(result);
			},
		);

		// set an initial value
		return Array(consonants.length).fill(false) as boolean[];
	});

	const setAndStoreItemSelection = (newItemsSelectedValue: boolean[]) => {
		setItemsSelected(newItemsSelectedValue);
		storeItemSelection(
			consonantInventoryPersistenceKey,
			consonants,
			newItemsSelectedValue,
		);
	};

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
					<ProgressBar progress={75} />
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
					justifyContent: 'space-between',
					flexGrow: 1,
				}}
			>
				<View
					style={{
						flexGrow: 1,
					}}
				>
					<View style={{ marginBottom: 40 }}>
						<Text style={{ fontSize: 28, fontWeight: 'bold' }}>
							What consonants can your child say? Select at least 4
						</Text>
					</View>
					<ToggleGridButtons
						items={consonants}
						itemsSelected={itemsSelected}
						setItemsSelected={(index: number, newValue: boolean) => {
							const newItemsSelected = [...itemsSelected];
							newItemsSelected[index] = newValue;
							setAndStoreItemSelection(newItemsSelected);
						}}
						disabled={false}
					/>
				</View>
				<FloatingButton
					label={'Continue'}
					onPress={() => {
						if (itemsSelected.filter((x) => x).length < MIN_SELECTED) {
							Alert.alert('', 'Select at least 4 of each sound', [
								{ text: 'OK' },
							]);
						} else {
							const selectedConsonants = [];
							for (let i = 0; i < vowels.length; i++) {
								if (itemsSelected[i] == true) {
									selectedConsonants.push(vowels[i]);
								}
							}
							navigation.navigate(`Done`, {
								name: name,
								groupID: groupID,
								vowels: vowels,
								consonants: selectedConsonants,
							});
						}
					}}
				/>
			</View>
		</CustomSafeAreaView>
	);
}
