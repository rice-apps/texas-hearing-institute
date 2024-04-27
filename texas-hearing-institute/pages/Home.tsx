import React, { useContext } from 'react';
import { ScrollView, View, Image, Pressable } from 'react-native';
import TitleText from './ListeningSettings/components/TitleText';
import SubTitleText from './ListeningSettings/components/SubTitleText';
import ListeningBabble from './ListeningSettings/tabs/ListeningBabble';
import SpeechBabble from './SpeechSettings/SpeechBabble';
import CustomSafeAreaView from '../components/CustomSafeAreaView/CustomSafeAreaView';
import { UserContext, UserContextType } from '../user/UserContext';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from './DrawerNavigator';
import { useNavigation } from '@react-navigation/native';

type DrawerNav = DrawerNavigationProp<DrawerParamList>;

export default function PracticeTab() {
	const { user } = useContext(UserContext) as UserContextType;

	const navigation = useNavigation<DrawerNav>();
	return (
		// ApplicationProvider is necessary for ui-kitten/components which is
		// needed for the Select component in SyllableCounterDropdown.tsx.
		<CustomSafeAreaView>
			<ScrollView style={{ padding: 24 }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View>
						<TitleText>Welcome back, {user.getName()}</TitleText>
						<SubTitleText>Let's get practicing today</SubTitleText>
					</View>
					<Pressable onPress={() => navigation.openDrawer()}>
						<Image
							source={require('../assets/turtle.png')}
							style={{ height: 46, width: 46, marginTop: 4, marginRight: 8 }}
						/>
					</Pressable>
				</View>
				<SpeechBabble />
				<View style={{ height: 32 }} />
				<ListeningBabble />
				<View style={{ height: 48 }} />
			</ScrollView>
		</CustomSafeAreaView>
	);
}
