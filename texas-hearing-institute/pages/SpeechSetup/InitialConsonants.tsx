import { ScrollView, View } from 'react-native';
import { useState } from 'react';
import Heading from '../../components/Heading';
import Subheading from '../../components/SubHeading';
import GridButton from '../../components/GridButton';
import Selection from '../../components/Selection';
import { Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import PracticeButton from '../../components/PracticeButton';
import RadioButtonGrid from '../../components/RadioButtonGrid/RadioButtonGrid';
// import RadioButtonGrid from '../../components/RadioButtonGrid/RadioButtonGrid';

const InitialConsonants = () => {
	const showAlert = () => {
		Alert.alert('Come later', 'We are working on it, bruh!', [
			{
				text: 'Cancel',
				style: 'cancel', // This button will be the 'Cancel' button
			},
			{ text: 'OK' }, // This will be the 'OK' button
		]);
	};

	const modeOptions = ['Voicing', 'Manner', 'Place Cue'];
	const [selectedModeOptionsIndex, setselectedModeOptionsIndex] = useState(0);

	const vowelOptions = ['Same Vowels', 'Different Vowels'];
	const [selectedVowelOptionsIndex, setselectedVowelOptionsIndex] = useState(0);

	const speedOptions = ['Slow: 4 Syllables', 'Fast: 12 Syllabes'];
	const [selectedSpeedOptionsIndex, setselectedSpeedOptionsIndex] = useState(0);

	return (
		<ScrollView>
			<Heading title={'Initial Consonants'}></Heading>
			<Subheading title={'Select a consonant'}></Subheading>
			<GridButton />
			<View style={tw`p-4 flex-col`}>
				<RadioButtonGrid
					items={modeOptions}
					label={'Select mode'}
					onSelect={(newValue) => {
						setselectedModeOptionsIndex(newValue);
					}}
					selectedItemIndex={selectedModeOptionsIndex}
				/>
				<RadioButtonGrid
					items={vowelOptions}
					label={'Select vowel type'}
					onSelect={(newValue) => {
						setselectedVowelOptionsIndex(newValue);
					}}
					selectedItemIndex={selectedVowelOptionsIndex}
				/>
				<RadioButtonGrid
					items={speedOptions}
					label={'Select speed'}
					onSelect={(newValue) => {
						setselectedSpeedOptionsIndex(newValue);
					}}
					selectedItemIndex={selectedSpeedOptionsIndex}
				/>
			</View>

			<View style={tw`p-4`}></View>
			<PracticeButton label="Let's Practice" onPress={showAlert} />
		</ScrollView>
	);
};

export default InitialConsonants;
