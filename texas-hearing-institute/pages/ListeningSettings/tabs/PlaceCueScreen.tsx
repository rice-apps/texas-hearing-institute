import React from 'react';
import SettingsPage from '../components/SettingsPage';
import { ConsonantFlower } from '../../../utils/Segment';

export default function PlaceCueScreen() {
	return (
		<SettingsPage
			title="Place Cue"
			showVowelType
			modeFlower={ConsonantFlower.Place}
		/>
	);
}
