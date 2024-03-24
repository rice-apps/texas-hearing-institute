import React, { useState } from 'react';
import { View, Pressable, Alert, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import leftArrow from '../../icons/leftarrow';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import ToggleGridButtons from '../../components/ToggleGridButtonsComponent/ToggleGridButtons';
import {
	storeItemSelection,
	retrieveItemSelections,
} from '../../utils/persistSelection';
import {
	vowelInventoryPersistenceKey,
	vowels,
} from '../../utils/soundInventoryDataAndKeys';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from './OnboardingNavigator';
import FloatingButton from '../../components/FloatingButton';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Vowels'>;

// Minimum number of sounds that must be selected for consonants and vowels
const MIN_SELECTED = 4;

export default function VowelSelect({ navigation }: Props) {
	const [itemsSelected, setItemsSelected] = useState(() => {
		// Start load from storage and set state once load completes
		retrieveItemSelections(vowelInventoryPersistenceKey, vowels).then(
			(result) => {
				setItemsSelected(result);
			},
		);

		// set an initial value
		return Array(vowels.length).fill(false) as boolean[];
	});

	const setAndStoreItemSelection = (newItemsSelectedValue: boolean[]) => {
		setItemsSelected(newItemsSelectedValue);
		storeItemSelection(
			vowelInventoryPersistenceKey,
			vowels,
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
					<ProgressBar progress={50} />
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
							What vowels can your child say? Select at least 4
						</Text>
					</View>
					<ToggleGridButtons
						items={vowels}
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
							navigation.navigate(`Consonants`);
						}
					}}
				/>
			</View>
		</CustomSafeAreaView>
	);
}
