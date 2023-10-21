import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import ListeningButtonGroup from "./ListeningButtonGroup";
import SyllableCounter from "./SyllableCounter";
import PracticeButton from "./PracticeButton";

export default function ListeningSettings() {
    return (
        <View style={[styles.margins, styles.expanded]}>
            <View style={styles.expanded}>
                <Text style={styles.title}>Listening settings</Text>
                <Text style={styles.subtitle}>Let's get practicing.</Text>

                <View style={{flex: 1}}>
                    <View style={styles.form_section}>
                        <Text style={styles.label}>What are we practicing?</Text>
                        <ListeningButtonGroup />
                    </View>

                    <View style={styles.form_section}>
                        <Text style={styles.label}>How many syllables?</Text>
                        <SyllableCounter />
                    </View>
                </View>
            </View>
            <PracticeButton />
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
