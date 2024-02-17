import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { syllableGeneration } from './utils/syllableGeneration';
import {
	ConsonantCategories,
	ConsonantFlower,
	VowelSegment,
} from './utils/Segment';

export default function App() {
	const [generatedSyllables, setGeneratedSyllables] = useState<string[]>([]);
	const handleGenerateSyllables = async () => {
		const result = await syllableGeneration(
			new VowelSegment('eye'), // Vowel segment 'eye'
			ConsonantFlower.Manner, // Consonant flower 'Manner'
			true, // Unique vowels
			ConsonantCategories.Initial, // Initial consonants
			4, // Generate 4 words
		);
		setGeneratedSyllables(result);
	};

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
