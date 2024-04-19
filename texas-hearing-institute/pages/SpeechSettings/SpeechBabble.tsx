import React from 'react';
import { View } from 'react-native';
import ButtonGroup from '../ListeningSettings/components/ButtonGroup';

const headerText = 'Speech Babble';

const buttons = ['Vowels', 'Initial Consonants', 'Final Consonants'];
const routes = ['Vowels', 'InitialConsonants', 'FinalConsonants'];
const imageSources = [
	'texas-hearing-institute/assets/home1.png',
	'texas-hearing-institute/assets/home2.png',
	'texas-hearing-institute/assets/home3.png',
];

export default function SpeechBabble() {
	return (
		<View>
			<ButtonGroup
				headerText={headerText}
				buttonLabels={buttons}
				buttonRoutes={routes}
				imageSources={imageSources}
			/>
		</View>
	);
}
