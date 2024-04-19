import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import TitleText from '../components/TitleText';
import SubTitleText from '../components/SubTitleText';
import ListeningBabble from './ListeningBabble';
import SpeechBabble from '../../SpeechSettings/SpeechBabble';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { UserContext, UserContextType } from '../../../user/UserContext';

export default function PracticeTab() {
	const { user } = useContext(UserContext) as UserContextType;
	return (
		// ApplicationProvider is necessary for ui-kitten/components which is
		// needed for the Select component in SyllableCounterDropdown.tsx.
		<CustomSafeAreaView>
			<ScrollView style={{ padding: 24 }}>
				<TitleText>Welcome back, {user.getName()}</TitleText>
				<SubTitleText>Let's get practicing today</SubTitleText>
				<SpeechBabble />
				<View style={{ height: 32 }} />
				<ListeningBabble />
				<View style={{ height: 48 }} />
			</ScrollView>
		</CustomSafeAreaView>
	);
}
