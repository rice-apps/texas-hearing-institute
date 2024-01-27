import React from 'react';
import { View } from 'react-native';
import ButtonGroup from '../components/ButtonGroup';

const headerText = 'Listening Babble';

const buttons = ['Variegated Vowels', 'Manner', 'Place Cue', 'Voicing'];

export default function ListeningBabble() {
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
