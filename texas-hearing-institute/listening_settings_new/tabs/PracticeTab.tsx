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

/**
 * This maps screen titles to img objects which contain img (required), styles (not required) properties
 */
const screenImgMapping = new Map([
    ["Variegated Vowels", { 
        img: require("../images/variegated-vowels.png"), 
        styles: {
            width: 90,
            height: 50,
            marginRight: 13.7,
            marginTop: 5
        }
    }],
    ["Place Cue", { 
        img: require("../images/place-cue.png") }],
    ["Voicing", { 
        img: require("../images/voicing.png"), 
        styles: {
            width: 60,
            height: 60,
            marginRight: 22
        } 
    }],
    ["Manner", { img: require("../images/manner.png") }] 
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
