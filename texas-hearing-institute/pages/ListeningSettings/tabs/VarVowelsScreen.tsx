import React from 'react';
import SettingsPage from '../components/SettingsPage';
import { ConsonantFlower } from '../../../utils/Segment';

export default function VarVowelsScreen() {
	return (
		<SettingsPage
			title="Variegated Vowels"
			showVowelType={false}
			modeFlower={ConsonantFlower.All}
		/>
	);
}
