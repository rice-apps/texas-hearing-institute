import React from 'react';
import { View } from 'react-native';
import ButtonGroup from '../ListeningSettings/components/ButtonGroup';

const headerText = 'Speech Babble';

const buttons = ['Vowels', 'Initial Consonants', 'Final Consonants'];

export default function SpeechBabble() {
	return (
		<View>
			<ButtonGroup
				headerText={headerText}
				buttonLabels={buttons}
				buttonRoutes={buttons}
			/>
		</View>
	);
}
