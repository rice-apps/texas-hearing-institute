import { ScrollView, View } from 'react-native';
import Heading from '../../components/Heading';
import Subheading from '../../components/SubHeading';
import BigButton from '../../components/Button';
import tw from 'tailwind-react-native-classnames';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SpeechSetting() {
	const navigation = useNavigation();

	const showAlert = () => {
		Alert.alert('Come later', 'We are working on it, bruh!', [
			{
				text: 'Cancel',
				style: 'cancel', // This button will be the 'Cancel' button
			},
			{ text: 'OK' }, // This will be the 'OK' button
		]);
	};
	
	let localImage1 = require("../../assets/image.jpg");

	let localImage2 = require("../../assets/image1.png");

	let localImage3 = require("../../assets/image2.png");
	return (
		<ScrollView>
			<View style={tw`flex flex-col`}>
				<Heading title={'Speech Babble'}></Heading>
				<Subheading title={'Let’s get practicing'}></Subheading>
				<BigButton label={'Vowels'} onPress={() => navigation.navigate('Initial Consonants' as never)} imgUrl={localImage1}/>
				<BigButton
					label={'Inital Consonants'}
					onPress={() => navigation.navigate('Initial Consonants' as never)}
					imgUrl={localImage2}
				/>
				<BigButton label={'Final Consonants'} onPress={() => navigation.navigate('Initial Consonants' as never)} imgUrl={localImage3}/>
			</View>
		</ScrollView>
	);
}
