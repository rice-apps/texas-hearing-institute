import { SafeAreaView, StyleSheet, View } from "react-native";
import ButtonGroup from '../components/ButtonGroup';
import ScreenView from '../components/ScreenView';
import TitleText from '../components/TitleText';
import SubTitleText from "../components/SubTitleText";

const headerText = "Listening Babble"

// The mapping may seem redundant, but this is just in case we change the route strings from the screen titles
const screenRouteMapping = new Map([
    ["Variegated Vowels", "Variegated Vowels"],
    ["Place Cue", "Place Cue"],
    ["Voicing", "Voicing"],
    ["Manner", "Manner"]
])


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
                        screenRouteMapping={screenRouteMapping}
                    />
                </ScreenView>
            </View>
        </SafeAreaView>
    );
}
