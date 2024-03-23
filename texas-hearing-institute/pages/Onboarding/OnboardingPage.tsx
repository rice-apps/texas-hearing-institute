import React, { useState } from 'react';
import { View, Button, Pressable, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import leftArrow from '../../icons/leftarrow';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import MarkdownText from '../../components/MarkdownText/MarkdownText';
import ToggleGridButtons from '../../components/ToggleGridButtonsComponent/ToggleGridButtons';
import {
	storeItemSelection,
	retrieveItemSelections,
} from '../../utils/persistSelection';
import {
	setupPrompts,
	setupPersistenceKeys,
	setupPageElements,
} from '../../utils/soundInventoryDataAndKeys';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface RootStackParamList {
	Onboarding1: OnboardingRouteParams;
	Onboarding2: OnboardingRouteParams;
	Onboarding3: OnboardingRouteParams;
	Onboarding4: OnboardingRouteParams;
}

// type Onboarding1NavigationProp = StackNavigationProp<
// 	RootStackParamList,
// 	'Onboarding1'
// >;
// type Onboarding1ScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding1'>;
// type Onboarding2NavigationProp = StackNavigationProp<
// 	RootStackParamList,
// 	'Onboarding2'
// >;
// type Onboarding2ScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding2'>;
// type Onboarding3NavigationProp = StackNavigationProp<
// 	RootStackParamList,
// 	'Onboarding3'
// >;
// type Onboarding3ScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding3'>;
// type Onboarding4NavigationProp = StackNavigationProp<
// 	RootStackParamList,
// 	'Onboarding4'
// >;
// type Onboarding4ScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding4'>;

interface OnboardingRouteParams {
	prompt: string;
	pageNumber: number;
	persistenceKey: string;
	setupElements: string[];
}

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding1'>;

// Minimum number of sounds that must be selected for consonants and vowels
const MIN_SELECTED = 4;

function Onboarding({ route, navigation }: Props) {
	const prompt: string = route.params.prompt;
	const pageNumber: number = route.params.pageNumber;
	const persistenceKey: string = route.params.persistenceKey;
	const setupElements: string[] = route.params.setupElements;

	const [itemsSelected, setItemsSelected] = useState(() => {
		// Start load from storage and set state once load completes
		retrieveItemSelections(persistenceKey, setupElements).then((result) => {
			setItemsSelected(result);
		});

		// set an initial value
		return Array(setupElements.length).fill(false) as boolean[];
	});

	const setAndStoreItemSelection = (newItemsSelectedValue: boolean[]) => {
		setItemsSelected(newItemsSelectedValue);
		storeItemSelection(persistenceKey, setupElements, newItemsSelectedValue);
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
				{pageNumber == 0 ? (
					<View style={{ width: 24, height: 24 }} /> /* placeholder */
				) : (
					<Pressable
						onPress={() =>
							// FIX THIS @baylee
							navigation.navigate(`Onboarding1`, {
								prompt: setupPrompts[pageNumber - 1],
								pageNumber: pageNumber - 1,
								persistenceKey: setupPersistenceKeys[pageNumber - 1],
								setupElements: setupPageElements[pageNumber - 1],
							})
						}
					>
						<SvgXml xml={leftArrow} width={24} height={24} />
					</Pressable>
				)}
				<View
					style={{
						width: 181,
					}}
				>
					<ProgressBar progress={0} height={8} />
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
					<View style={{ marginBottom: 32 }}>
						<MarkdownText content={prompt} fontSize={24} />
					</View>
					<ToggleGridButtons
						items={setupElements}
						itemsSelected={itemsSelected}
						setItemsSelected={(index: number, newValue: boolean) => {
							const newItemsSelected = [...itemsSelected];
							newItemsSelected[index] = newValue;
							setAndStoreItemSelection(newItemsSelected);
						}}
						disabled={false}
					/>
				</View>
				<View>
					<Button
						title="Continue"
						onPress={() => {
							if (itemsSelected.filter((x) => x).length < MIN_SELECTED) {
								Alert.alert('', 'Select at least 4 of each sound', [
									{ text: 'OK' },
								]);
							} else {
								// FIX THIS @baylee
								navigation.navigate(`Onboarding3`, {
									prompt: setupPrompts[pageNumber + 1],
									pageNumber: pageNumber + 1,
									persistenceKey: setupPersistenceKeys[pageNumber + 1],
									setupElements: setupPageElements[pageNumber + 1],
								});
							}
						}}
					/>
					<Button title="Not sure, let's find out" />
				</View>
			</View>
		</CustomSafeAreaView>
	);
}

export default Onboarding;
