import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import SoundGrid from '../components/SoundGrid';
import RadioButton from '../../../components/RadioButton';
import FloatingButton from '../../../components/FloatingButton';
import { useNavigation } from '@react-navigation/native';

export default function FinalConsonants() {
	const navigation = useNavigation();
	// TODO: pull from sound inventory (need to change sound inventory data structure)
	const sounds = [
		'p',
		'b',
		'm',
		'w',
		'h',
		'f',
		'd',
		'n',
		'y',
		'k',
		'g',
		's',
		'z',
		'sh',
		'ch',
		'v',
		'l',
		'r',
		'j',
		'th',
		'TH',
	];
	const [segment, setSegment] = useState('');
	const [mode, setMode] = useState('');
	const [vowelType, setVowelType] = useState('');
	const [speed, setSpeed] = useState(1);

	const settingsReady = () => {
		return segment != '' && mode != '' && vowelType != '' && speed != 1;
	};

	return (
		<>
			<ScrollView style={styles.screen}>
				<Text style={styles.title}>Final Consonants</Text>
				<Text style={styles.subtitle}>SELECT A CONSONANT</Text>
				<SoundGrid sounds={sounds} selected={segment} setSegment={setSegment} />
				{segment != '' && (
					<View>
						<Text style={styles.subtitle}>SELECT MODE</Text>
						<View>
							<RadioButton<string>
								label={'Voicing'}
								value={'Voicing'}
								onPress={setMode}
								selectedRadio={mode}
							/>
							<RadioButton<string>
								label={'Manner'}
								value={'Manner'}
								onPress={setMode}
								selectedRadio={mode}
							/>
							<RadioButton<string>
								label={'Place Cue'}
								value={'Place Cue'}
								onPress={setMode}
								selectedRadio={mode}
							/>
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
				<View style={styles.float}>
					<FloatingButton
						label={"Let's Practice"}
						onPress={() => navigation.navigate('Active Practice' as never)}
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
