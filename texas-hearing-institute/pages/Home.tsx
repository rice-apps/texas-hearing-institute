import React from 'react';
import { View } from 'react-native';
import ScreenView from './ListeningSettings/components/ScreenView';
import TitleText from './ListeningSettings/components/TitleText';
import SubTitleText from './ListeningSettings/components/SubTitleText';
import ListeningBabble from './ListeningSettings/tabs/ListeningBabble';
import SpeechBabble from './SpeechSettings/SpeechBabble';
import CustomSafeAreaView from '../components/CustomSafeAreaView/CustomSafeAreaView';

export default function PracticeTab() {
	return (
		// ApplicationProvider is necessary for ui-kitten/components which is
		// needed for the Select component in SyllableCounterDropdown.tsx.
		<CustomSafeAreaView>
			<View style={{ paddingTop: 20 }}>
				<ScreenView>
					<TitleText>Good morning, User</TitleText>
					<SubTitleText>Let's get practicing.</SubTitleText>
					<SpeechBabble />
					<ListeningBabble />
				</ScreenView>
			</View>
		</CustomSafeAreaView>
	);
}
