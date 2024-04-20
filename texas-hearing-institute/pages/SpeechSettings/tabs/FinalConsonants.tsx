import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SoundGrid from '../components/SoundGrid';
import RadioButton from '../../../components/RadioButton';
import FloatingButton from '../../../components/FloatingButton';
import { retrieveConsonants } from '../../../utils/persistSelection';
import {
	ConsonantCategories,
	ConsonantFlower,
	ConsonantSegment,
} from '../../../utils/Segment';
import { generateCards } from '../../../utils/syllableGeneration';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { PracticeParamList } from '../../PracticeNavigator';
import { modeToString } from '../../types';

type PracticeNav = StackNavigationProp<PracticeParamList>;

export default function FinalConsonants() {
	const practiceNavigation = useNavigation<PracticeNav>();

	// Fetch consonants that child can say from async storage.
	useEffect(() => {
		// We immediately run this async function when page is loaded,
		// which will update `speakableConsonantSegments` as soon as it receives the inventory.
		async function fetchSpeakableConsonants() {
			try {
				let consonantSegments = await retrieveConsonants();
				// Make sure only final consonants are shown
				consonantSegments = consonantSegments.filter((value) => {
					return value.categories.includes(ConsonantCategories.Final);
				});
				setSpeakableConsonantSegments(consonantSegments);
			} catch (error) {
				console.error('Error retrieving consonants:', error);
				// Handle error appropriately, e.g., show an error message to the user
			}
		}

		fetchSpeakableConsonants();
	}, []);

	const [speakableConsonantSegments, setSpeakableConsonantSegments] = useState<
		ConsonantSegment[]
	>([]);
	const [segment, setSegment] = useState<ConsonantSegment>();
	const [modeFlower, setModeFlower] = useState<ConsonantFlower>();
	const [isUniqueVowels, setIsUniqueVowels] = useState<boolean>();
	// const [speed, setSpeed] = useState(1);

	const settingsReady = () => {
		return (
			segment != null && modeFlower != null && isUniqueVowels != null
			// && speed != 1
		);
	};

	return (
		<>
			<ScrollView style={styles.screen}>
				<Text style={styles.title}>Final Consonants</Text>
				<Text style={styles.subtitle}>SELECT A CONSONANT</Text>
				<SoundGrid
					sounds={speakableConsonantSegments}
					selected={segment}
					setSegment={(sound) => {
						// SoundGrid returns a Segment, convert to ConsonantSegment
						setSegment(sound as ConsonantSegment);
					}}
				/>
				{segment != null && (
					<View>
						<Text style={styles.subtitle}>SELECT MODE</Text>
						<View>
							<RadioButton<ConsonantFlower>
								label={'Voicing'}
								value={ConsonantFlower.Voice}
								onPress={setModeFlower}
								selectedRadio={modeFlower}
							/>
							<RadioButton<ConsonantFlower>
								label={'Manner'}
								value={ConsonantFlower.Manner}
								onPress={setModeFlower}
								selectedRadio={modeFlower}
							/>
							<RadioButton<ConsonantFlower>
								label={'Place Cue'}
								value={ConsonantFlower.Place}
								onPress={setModeFlower}
								selectedRadio={modeFlower}
							/>
						</View>
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
						{/* <Text style={styles.subtitle}>SELECT SPEED</Text>
						<View>
							<RadioButton<number>
								label={'Slow: 4 Syllables'}
								value={4}
								onPress={setSpeed}
								selectedRadio={speed}
							/>
							<RadioButton<number>
								label={'Fast: 12 Syllables'}
								value={12}
								onPress={setSpeed}
								selectedRadio={speed}
							/>
						</View> */}
					</View>
				)}
				<View style={{ height: 140 }} />
			</ScrollView>
			{/* TODO: button routes to active practice */}
			{settingsReady() && (
				<FloatingButton
					label={"Let's Practice"}
					onPress={async () => {
						// Make sure we have at least one sibling. numOfSiblings includes self.
						const numOfSiblings = segment?.fetchConsonantSiblings(
							modeFlower!,
							speakableConsonantSegments,
							ConsonantCategories.Final,
						).length;

						if (numOfSiblings == null || numOfSiblings < 1) {
							throw Error(
								'Child cannot say enough siblings to be able to practice this segment! Or this segment has no siblings for the selected mode / flower.',
							);
						}

						const cards = await generateCards(
							10,
							segment!,
							modeFlower!,
							isUniqueVowels!,
							ConsonantCategories.Final,
							2,
						);
						practiceNavigation.navigate('ActivePractice', {
							settings: {
								type: 'speech',
								subtype: 'final consonants',
								mode: modeToString(modeFlower!),
								vowels: isUniqueVowels ? 'different' : 'same',
								target: segment!.name,
								syllables: 2,
							},
							phonemes: cards,
							speed: 1,
						});
					}}
				/>
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
		color: '#333',
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
});
