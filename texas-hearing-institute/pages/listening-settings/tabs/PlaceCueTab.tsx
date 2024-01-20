import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PracticeButton from '../components/PracticeButton';
import RadioButton from '../components/RadioButton';

export default function PlaceCueTab() {
	const [vowelType, setVowelType] = useState('Same');
	const [numSyllables, setNumSyllables] = useState(2);

	return (
		<View style={[styles.margins, styles.expanded]}>
			<View style={[styles.expanded, styles.gaps]}>
				<View>
					<Text style={styles.title}>Place Cue</Text>
				</View>
				<Text style={styles.subtitle}>SELECT VOWEL TYPE</Text>
				<View>
					<RadioButton<string>
						label={'Same Vowels'}
						value={'Same'}
						onPress={setVowelType}
						selectedRadio={vowelType}
					/>
					<RadioButton<string>
						label={'Different Vowels'}
						value={'Different'}
						onPress={setVowelType}
						selectedRadio={vowelType}
					/>
				</View>
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
			</View>
			{/*Because PracticeButton is not included in the
            styles.expanded (flex: 1) View, it is thrown to the bottom. */}
			<PracticeButton />
		</View>
	);
}

const styles = StyleSheet.create({
	margins: {
		padding: 32,
	},
	expanded: {
		flex: 1,
	},
	gaps: {
		gap: 20,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	subtitle: {
		fontSize: 12,
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
