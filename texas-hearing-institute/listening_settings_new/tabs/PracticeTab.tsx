import { SafeAreaView, StyleSheet, View } from "react-native";
import ButtonGroup from '../components/ButtonGroup';
import ScreenView from '../components/ScreenView';
import TitleText from '../components/TitleText';
import SubTitleText from "../components/SubTitleText";

const headerText = "Listening Babble"

const buttonLabels = [
    "Variegated Vowels",
    "Manner",
    "Place Cue",
    "Voicing"
]

const buttonRoutes = [
    "Variegated Vowels",
    "Manner",
    "Place Cue",
    "Voicing"
]

export default function PracticeTab() {
    return (
        // ApplicationProvider is necessary for ui-kitten/components which is
        // needed for the Select component in SyllableCounterDropdown.tsx.
        <SafeAreaView>
            <View style={{paddingTop: 20}}>
                <ScreenView>
                    <TitleText>Good morning, User</TitleText>
                    <SubTitleText>Let's get practicing.</SubTitleText>
                    <ButtonGroup
                        headerText={headerText}
                        buttonLabels={buttonLabels}
                        buttonRoutes={buttonRoutes}
                    />
                </ScreenView>
            </View>
        </SafeAreaView>
    );
}
