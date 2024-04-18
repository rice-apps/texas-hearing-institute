import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SoundGrid from '../components/SoundGrid';
import RadioButton from '../../../components/RadioButton';
import FloatingButton from '../../../components/FloatingButton';
import { retrieveVowels } from '../../../utils/persistSelection';
import { generateCards } from '../../../utils/syllableGeneration';
import { ConsonantFlower, VowelSegment } from '../../../utils/Segment';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { PracticeParamList } from '../../PracticeNavigator';
import { modeToString } from '../../types';

type PracticeNav = StackNavigationProp<PracticeParamList>;

const Vowels = () => {
	const practiceNavigation = useNavigation<PracticeNav>();

	// Fetch vowels that child can say from async storage.
	useEffect(() => {
		// We immediately run this async function when page is loaded,
		// which will update `speakableVowelSegments` as soon as it receives the inventory.
		async function fetchSpeakableVowels() {
			try {
				const vowelSegments = await retrieveVowels();
				setSpeakableVowelSegments(vowelSegments);
			} catch (error) {
				console.error('Error retrieving vowels:', error);
				// Handle error appropriately, e.g., show an error message to the user
			}
		}

		fetchSpeakableVowels();
	}, []);

	const [speakableVowelSegments, setSpeakableVowelSegments] = useState<
		VowelSegment[]
	>([]);
	const [segment, setSegment] = useState<VowelSegment>();
	const [modeFlower, setModeFlower] = useState<ConsonantFlower>();
	const [isUniqueVowels, setIsUniqueVowels] = useState<boolean>();
	const [speed, setSpeed] = useState(1);

	const settingsReady = () => {
		return (
			segment != null &&
			modeFlower != null &&
			isUniqueVowels != null &&
			speed != 1
		);
	};

	return (
		<>
			<ScrollView style={styles.screen}>
				<Text style={styles.title}>Vowels</Text>
				<Text style={styles.subtitle}>SELECT A VOWEL</Text>
				<SoundGrid
					sounds={speakableVowelSegments}
					selected={segment}
					setSegment={(sound) => {
						// SoundGrid returns a Segment, convert to VowelSegment
						setSegment(sound as VowelSegment);
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
						<Text style={styles.subtitle}>SELECT SPEED</Text>
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
						</View>
					</View>
				)}
				<View style={{ height: 140 }} />
			</ScrollView>
			{/* TODO: button routes to active practice */}
			{settingsReady() && (
				<FloatingButton
					label={"Let's Practice"}
					onPress={async () => {
						const cards = await generateCards(
							10,
							segment!,
							modeFlower!,
							isUniqueVowels!,
							null,
							2,
						);
						practiceNavigation.navigate('ActivePractice', {
							settings: {
								type: 'speech',
								subtype: 'vowels',
								mode: modeToString(modeFlower!),
								vowels: isUniqueVowels ? 'different' : 'same',
								target: segment!.name,
								syllables: 2,
							},
							phonemes: cards,
						});
					}}
				/>
			)}
		</>
	);
};

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
});

export default Vowels;
