import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { syllableGeneration } from '../utils/syllableGeneration';
import {
	ConsonantCategories,
	ConsonantFlower,
	ConsonantSegment,
	VowelSegment,
} from '../utils/Segment';
import OnboardingMain from './Onboarding/OnboardingMain';
import { retrieveVowels } from '../utils/persistSelection';

export default function Testing() {
	const [generatedSyllables, setGeneratedSyllables] = useState<string[]>([]);
	const handleGenerateSyllables = async () => {
		const result = await syllableGeneration(
			new ConsonantSegment(
				'z',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [1],
					voice: [0],
					place: [2],
					all: [0],
				},
			),
			ConsonantFlower.Voice,
			true,
			ConsonantCategories.Initial,
			2,
		);
		setGeneratedSyllables(result);
	};

	console.log(retrieveVowels());

	return (
		<View style={styles.container}>
			<Text style={tw`text-3xl font-bold underline`}>
				Open up App.tsx to start working on your app!
			</Text>
			<Button title="Generate Syllables" onPress={handleGenerateSyllables} />
			<Text style={tw`mt-4 text-lg font-bold`}>Generated Syllables:</Text>
			{generatedSyllables.map((syllable, index) => (
				<Text key={index} style={tw`text-lg`}>
					{syllable}
				</Text>
			))}
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
