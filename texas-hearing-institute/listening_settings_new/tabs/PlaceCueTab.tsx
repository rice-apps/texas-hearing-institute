import {StyleSheet, Text, View} from "react-native";
import SyllableCounterDropdown from "../components/SyllableCounterDropdown";
import PracticeButton from "../components/PracticeButton";
import {ApplicationProvider} from "@ui-kitten/components";
import * as eva from '@eva-design/eva'

export default function PlaceCueTab() {
    return (
            <View style={[styles.margins, styles.expanded]}>
                <View style={[styles.expanded, styles.gaps]}>
                    <View>
                        <Text style={styles.title}>Place Cue</Text>
                        <Text style={styles.subtitle}>Select a vowel to practice listening</Text>
                    </View>
                    <View style={{backgroundColor: '#a2a2a2', height: 200}}>
                        <Text>Grid goes here</Text>
                    </View>
                    <SyllableCounterDropdown/>
                </View>
                {/*Because PracticeButton is not included in the
            styles.expanded (flex: 1) View, it is thrown to the bottom. */}
                <PracticeButton/>
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
    gaps: {
        gap: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        paddingTop: 10,
        paddingBottom: 10
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
