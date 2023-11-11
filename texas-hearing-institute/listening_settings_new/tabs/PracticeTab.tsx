import { SafeAreaView, StyleSheet, View } from "react-native";
import ButtonGroup from '../components/ButtonGroup';
import ScreenView from '../components/ScreenView';
import TitleText from '../components/TitleText';
import SubTitleText from "../components/SubTitleText";

const headerText = "Listening Babble"

/**
 * This maps screen titles to routes for input into ButtonGroup component.
 * May seem redundant, but the mapping is just in case we reach a point where screen title != route string
 */
const screenRouteMapping = new Map([
    ["Variegated Vowels", "Variegated Vowels"],
    ["Place Cue", "Place Cue"],
    ["Voicing", "Voicing"],
    ["Manner", "Manner"]
])

const screenImgMapping = new Map([
    ["Variegated Vowels", require('../images/variegated-vowels.png')],
    ["Place Cue", require("../images/place-cue.png")],
    ["Voicing", require("../images/voicing.png")],
    ["Manner", require("../images/manner.png")]
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
                        screenImgMapping={screenImgMapping}
                    />
                </ScreenView>
            </View>
        </SafeAreaView>
    );
}
