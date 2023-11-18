import { ScrollView, View } from 'react-native';
import Heading from '../../components/Heading';
import Subheading from '../../components/SubHeading';
import GridButton from '../../components/GridButton';
import Selection from '../../components/Selection';
import { Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import PracticeButton from '../../components/PracticeButton';

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

	return (
		<ScrollView>
			<Heading title={'Initial Consonants'}></Heading>
			<Subheading
				title={'Select a consonant'}
			></Subheading>
			<GridButton />
			<Selection
				buttonNames={['Variegated Vowels', 'Voicing', 'Manner', 'Place Cue']}
			></Selection>
			<View style={tw`p-4`}></View>
			<PracticeButton label="Let's Practice" onPress={showAlert} />
		</ScrollView>
	);
};

export default InitialConsonants;
