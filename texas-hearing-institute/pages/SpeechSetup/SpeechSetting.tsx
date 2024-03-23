import React from 'react';
import { ScrollView, View } from 'react-native';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
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
	return (
		<ScrollView>
			<View style={tw`flex flex-col`}>
				<Heading title={'Speech Babble'}></Heading>
				<SubHeading title={'Let’s get practicing'}></SubHeading>
				<BigButton label={'Vowels'} onPress={showAlert} />
				<BigButton
					label={'Inital Consonants'}
					onPress={() => navigation.navigate('Initial Consonants' as never)}
				/>
				<BigButton label={'Final Consonants'} onPress={showAlert} />
			</View>
		</ScrollView>
	);
}
