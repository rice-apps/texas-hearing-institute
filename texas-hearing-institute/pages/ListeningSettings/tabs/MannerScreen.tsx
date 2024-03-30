import React from 'react';
import SettingsPage from '../components/SettingsPage';
import { ConsonantFlower } from '../../../utils/Segment';

export default function MannerScreen() {
	return (
		<SettingsPage
			title="Manner"
			showVowelType
			modeFlower={ConsonantFlower.Manner}
		/>
	);
}
