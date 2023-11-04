import { SafeAreaView, StyleSheet, View } from "react-native";
import ButtonGroup from '../components/ButtonGroup';
import ScreenView from '../components/ScreenView';

const headerImage = require('../images/active-listening.png');

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
            <ScreenView>
                <ButtonGroup
                    headerImage={headerImage}
                    headerText={headerText}
                    buttonLabels={buttonLabels}
                    buttonRoutes={buttonRoutes}
                />
            </ScreenView>
        </SafeAreaView>
    );
}
