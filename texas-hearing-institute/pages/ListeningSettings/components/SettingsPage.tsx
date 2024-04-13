import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import RadioButton from '../../../components/RadioButton';
import FloatingButton from '../../../components/FloatingButton';
import { ConsonantCategories, ConsonantFlower } from '../../../utils/Segment';
import { syllableGeneration } from '../../../utils/syllableGeneration';

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { PracticeParamList } from '../../PracticeNavigator';

interface SettingsPageProps {
	title: string;
	showVowelType: boolean;
	modeFlower: ConsonantFlower;
}
type StackNav = StackNavigationProp<PracticeParamList>;

export default function SettingsPage({
	title,
	showVowelType,
	modeFlower,
}: SettingsPageProps) {
	// Default isUniqueVowels to `true` if showVowelType is false.
	// Otherwise, have user choose (by setting isUniqueVowels to undefined)
	const [isUniqueVowels, setIsUniqueVowels] = useState<boolean | undefined>(
		showVowelType ? undefined : true,
	);
	const [numSyllables, setNumSyllables] = useState(-1);
	const navigation = useNavigation<StackNav>();
	const settingsReady = () => {
		return (
			// Only check isUniqueVowels if showVowelType is true.
			(showVowelType ? isUniqueVowels != null : true) && numSyllables != -1
		);
	};

	return (
		<>
			<ScrollView style={styles.screen}>
				<View>
					<Text style={styles.title}>{title}</Text>
				</View>
				{showVowelType ? (
					<>
						<Text style={styles.subtitle}>SELECT VOWEL TYPE</Text>
						<View>
							<RadioButton<boolean>
								label={'Same Vowels'}
								value={false}
								onPress={setIsUniqueVowels}
								selectedRadio={isUniqueVowels}
							/>
							<RadioButton<boolean>
								label={'Different Vowels'}
								value={true}
								onPress={setIsUniqueVowels}
								selectedRadio={isUniqueVowels}
							/>
						</View>
					</>
				) : null}
				<Text style={styles.subtitle}>SELECT NUMBER OF SYLLABLES</Text>
				<View>
					<RadioButton<number>
						label={'2 Syllables'}
						value={2}
						onPress={setNumSyllables}
						selectedRadio={numSyllables}
					/>
					<RadioButton<number>
						label={'3 Syllables'}
						value={3}
						onPress={setNumSyllables}
						selectedRadio={numSyllables}
					/>
					<RadioButton<number>
						label={'4 Syllables'}
						value={4}
						onPress={setNumSyllables}
						selectedRadio={numSyllables}
					/>
				</View>
			</ScrollView>
			{settingsReady() && (
				<View style={styles.float}>
					<FloatingButton
						label={"Let's Practice"}
						onPress={async () => {
							// Generate 10 "pages" of practice word lists
							// EG: [["peye, pow"], ["noo", "pam"], ... ] with 10 sublists
							const pages = [];

							for (let i = 0; i < 10; i++) {
								// Call syllable generation. We can use ! on vars because we validated
								// that they were all selected with settingsReady() before this button appeared.
								const words = await syllableGeneration(
									null,
									modeFlower,
									isUniqueVowels!,
									ConsonantCategories.Initial,
									numSyllables,
								);
								pages.push(words);
							}
							// TODO: Route to active practice
							navigation.navigate('ActivePractice'); // Navigate to Active screen
							console.log(pages);
						}}
					/>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	screen: {
		paddingHorizontal: 24,
		flex: 1,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 12,
		marginBottom: 16,
		marginTop: 40,
		color: '#747474',
	},
	label: {
		textAlign: 'center',
		marginTop: 40,
		marginBottom: 15,
		fontWeight: 'bold',
		fontSize: 22,
	},
	float: {
		width: '100%',
		alignItems: 'center',
		zIndex: 1,
		position: 'absolute',
		bottom: 52,
	},
});
