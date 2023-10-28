import { View, StyleSheet } from "react-native";

export default function ListeningSettings() {
    return (
        <View style={[styles.margins, styles.expanded]}>
            
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
