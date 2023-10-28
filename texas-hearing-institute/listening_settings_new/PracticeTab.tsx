import { View, StyleSheet } from "react-native";
import ButtonGroup from './ButtonGroup';

const headerImage = require('./images/active-listening.png');

const headerText = "Listening Babble"

const buttonLabels = [
    "Variegated Vowels",
    "Manner",
    "Place Cue",
    "Voicing"
]

const buttonRoutes = [
    "variegated-vowels",
    "manner",
    "place-cue",
    "voicing"
]

export default function PracticeTab() {
    return (
        <View style={[styles.margins, styles.expanded]}>
            <ButtonGroup 
                headerImage = {headerImage}
                headerText = {headerText}
                buttonLabels = {buttonLabels}
                buttonRoutes = {buttonRoutes}
            />
        </View>
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
        // flex: 1,
        justifyContent: 'center'
    }
});
