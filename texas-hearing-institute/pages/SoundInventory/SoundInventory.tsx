import React from 'react';
import {
	View,
	Text,
	Pressable,
	ScrollView,
	StyleSheet,
	Alert,
} from 'react-native';
import ToggleGridButtons from '../../components/ToggleGridButtonsComponent/ToggleGridButtons';
import styles from '../Onboarding/OnboardingStyle';
import { SvgXml } from 'react-native-svg';
import pencil from '../../icons/pencil';
import {
	consonants,
	vowels,
	consonantInventoryPersistenceKey,
	vowelInventoryPersistenceKey,
} from '../../utils/soundInventoryDataAndKeys';
import { useState } from 'react';
import {
	retrieveItemSelections,
	storeItemSelection,
} from '../../utils/persistSelection';

// Minimum number of sounds that must be selected for consonants and vowels
const MIN_SELECTED = 4;

export const SoundInventory = () => {
	// hashmap/dictionary to keep track of all consonants and their toggled state, update via useState to rerender componetns
	const [editModeEnabled, privateSetEditModeEnabled] = useState(false);

	const [inventoryConsonants, setInventoryConsonants] = useState(() => {
		retrieveItemSelections(consonantInventoryPersistenceKey, consonants).then(
			(result) => {
				setInventoryConsonants(result);
			},
		);

		return [] as boolean[];
	});

	const [inventoryVowels, setInventoryVowels] = useState(() => {
		retrieveItemSelections(vowelInventoryPersistenceKey, vowels).then(
			(result) => {
				setInventoryVowels(result);
			},
		);

		return [] as boolean[];
	});

	const [draftInventoryConsonants, setDraftInventoryConsonants] = useState(
		[] as boolean[],
	);
	const [draftInventoryVowels, setDraftInventoryVowels] = useState(
		[] as boolean[],
	);

	const setAndStoreSelections = (
		newInventoryConsonants: boolean[],
		newInventoryVowels: boolean[],
		saveToDraft: boolean,
	) => {
		// `saveToDraft` is used for edit mode to be able to revert changes
		if (saveToDraft) {
			setDraftInventoryConsonants(newInventoryConsonants);
			setDraftInventoryVowels(newInventoryVowels);
		} else {
			setInventoryConsonants(newInventoryConsonants);
			setInventoryVowels(newInventoryVowels);

			storeItemSelection(
				consonantInventoryPersistenceKey,
				consonants,
				newInventoryConsonants,
			);
			storeItemSelection(
				vowelInventoryPersistenceKey,
				vowels,
				newInventoryVowels,
			);
		}
	};

	const setDraftToNonDraft = () => {
		setAndStoreSelections(inventoryConsonants, inventoryVowels, true);
	};

	const setNonDraftToDraft = () => {
		setAndStoreSelections(
			draftInventoryConsonants,
			draftInventoryVowels,
			false,
		);
	};

	const setEditModeEnabled = (newValue: boolean, commitChanges: boolean) => {
		if (newValue) {
			// edit mode is now enabled. Let's update the draft.
			setDraftToNonDraft();
		} else {
			// edit mode is now disabled.
			if (commitChanges) {
				setNonDraftToDraft();
			} else {
				setDraftToNonDraft();
			}
		}
		privateSetEditModeEnabled(newValue);
	};

	const getCorrespondingInventoryConsonants = () => {
		if (editModeEnabled) {
			return draftInventoryConsonants;
		} else {
			return inventoryConsonants;
		}
	};

	const getCorrespondingInventoryVowels = () => {
		if (editModeEnabled) {
			return draftInventoryVowels;
		} else {
			return inventoryVowels;
		}
	};

	return (
		<View>
			<View style={styles.onboardingHeaderView}>
				<Text
					style={{
						fontSize: 24,
						fontWeight: 'bold',
						color: '#333',
					}}
				>
					Sound Inventory
				</Text>
				<Pressable
					style={{
						backgroundColor: '#EDEDED',
						padding: 10,
						borderRadius: 10,
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'center',
						gap: 10,
						opacity: editModeEnabled ? 0 : 1,
					}}
					onPress={() => setEditModeEnabled(!editModeEnabled, true)}
				>
					<SvgXml
						style={{ marginTop: 2 }}
						xml={pencil}
						width={14}
						height={14}
					/>
					<Text style={{ fontSize: 16, color: '#333' }}>Edit</Text>
				</Pressable>
			</View>
			<ScrollView>
				<View style={styles.onboardingViewMargins}>
					<Text style={pagestyles.subheading}>Vowels</Text>
					<ToggleGridButtons
						disabled={!editModeEnabled}
						speak={true}
						items={vowels}
						itemsSelected={getCorrespondingInventoryVowels()}
						setItemsSelected={(index: number, newValue: boolean) => {
							const newItemsSelected = [...getCorrespondingInventoryVowels()];
							newItemsSelected[index] = newValue;
							setAndStoreSelections(
								inventoryConsonants,
								newItemsSelected,
								editModeEnabled,
							);
						}}
					/>
					<Text style={pagestyles.subheading}>Consonants</Text>
					<ToggleGridButtons
						disabled={!editModeEnabled}
						speak={false}
						items={consonants}
						itemsSelected={getCorrespondingInventoryConsonants()}
						setItemsSelected={(index: number, newValue: boolean) => {
							const newItemsSelected = [
								...getCorrespondingInventoryConsonants(),
							];
							newItemsSelected[index] = newValue;
							setAndStoreSelections(
								newItemsSelected,
								inventoryVowels,
								editModeEnabled,
							);
						}}
					/>
				</View>
			</ScrollView>

			<View
				style={{
					alignItems: 'center',
					opacity: editModeEnabled ? 1 : 0,
				}}
			>
				<Pressable
					style={{
						width: 326,
						height: 54,
						backgroundColor: '#AFE4F9',
						borderRadius: 32,
						paddingHorizontal: 12,
						paddingVertical: 8,
						alignItems: 'center',
						justifyContent: 'center',
						shadowOpacity: 0.12,
						shadowOffset: { height: 4, width: 0 },
					}}
					onPress={() => {
						if (
							draftInventoryConsonants.filter((x) => x).length < MIN_SELECTED
						) {
							Alert.alert('', 'Select at least 4 of each sound', [
								{ text: 'OK' },
							]);
						} else {
							setEditModeEnabled(!editModeEnabled, true);
						}
					}}
				>
					<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
						Save Changes
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

const pagestyles = StyleSheet.create({
	heading: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	subheading: {
		fontSize: 12,
		marginTop: 15,
		marginBottom: 15,
		color: '#747474',
		textTransform: 'uppercase',
	},
});
