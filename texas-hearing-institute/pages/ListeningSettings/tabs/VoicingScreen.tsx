import React from 'react';
import SettingsPage from '../components/SettingsPage';
import { ConsonantFlower } from '../../../utils/Segment';

export default function VoicingScreen() {
	return (
		<SettingsPage
			title="Voicing"
			showVowelType
			modeFlower={ConsonantFlower.Voice}
		/>
	);
}
