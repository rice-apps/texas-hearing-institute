import React from 'react';
import SettingsPage from '../components/SettingsPage';
import { ConsonantFlower } from '../../../utils/Segment';

export default function PlaceScreen() {
	return (
		<SettingsPage
			title="Place"
			showVowelType
			modeFlower={ConsonantFlower.Place}
		/>
	);
}
