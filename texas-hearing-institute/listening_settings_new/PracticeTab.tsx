import {SafeAreaView, StyleSheet, View} from "react-native";
import ButtonGroup from './components/ButtonGroup';
import {ApplicationProvider} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';

const headerImage = require('./images/active-listening.png');

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
        <ApplicationProvider {...eva} theme={eva.light}>
            <SafeAreaView style={styles.expanded}>
                <View style={[styles.margins, styles.expanded]}>
                    <ButtonGroup
                        headerImage={headerImage}
                        headerText={headerText}
                        buttonLabels={buttonLabels}
                        buttonRoutes={buttonRoutes}
                    />
                </View>
            </SafeAreaView>
        </ApplicationProvider>
    );
}

const styles = StyleSheet.create({
    margins: {
        padding: 32
    },
    expanded: {
        flex: 1
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        paddingTop: 10,
    },
    label: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 22
    },
    form_section: {
        justifyContent: 'center'
    }
});
