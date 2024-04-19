import React from 'react';
import { SafeAreaView, View } from 'react-native';
import ScreenView from '../components/ScreenView';
import TitleText from '../components/TitleText';
import SubTitleText from '../components/SubTitleText';
import ListeningBabble from './ListeningBabble';
import SpeechBabble from '../../SpeechSettings/SpeechBabble';

export default function PracticeTab() {
	return (
		// ApplicationProvider is necessary for ui-kitten/components which is
		// needed for the Select component in SyllableCounterDropdown.tsx.
		<SafeAreaView>
			<View style={{ paddingTop: 20 }}>
				<ScreenView>
					<TitleText>Good morning, User</TitleText>
					<SubTitleText>Let's get practicing.</SubTitleText>
					<SubTitleText> </SubTitleText>
					<SpeechBabble />
					<SubTitleText> </SubTitleText>
					<ListeningBabble />
				</ScreenView>
			</View>
		</SafeAreaView>
	);
}
