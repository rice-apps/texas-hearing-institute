import React from 'react';
import { View } from 'react-native';
import ButtonGroup from '../ListeningSettings/components/ButtonGroup';

const headerText = 'Speech Babble';

const buttons = ['Vowels', 'Initial Consonants', 'Final Consonants'];
const routes = ['Vowels', 'InitialConsonants', 'FinalConsonants'];

export default function SpeechBabble() {
	return (
		<View>
			<ButtonGroup
				headerText={headerText}
				buttonLabels={buttons}
				buttonRoutes={routes}
			/>
		</View>
	);
}
