import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type SettingsButtonProps = {
    label: string;
    route: string;
}

export default function SettingsButton({label, route}: SettingsButtonProps) {
    return (
        <View>
            <TouchableOpacity
                style={styles.button}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#D9D9D9",
        borderRadius: 12,
        height: 50,
        marginTop: 6,
        marginBottom: 6
    },
    selectedButton: {
        backgroundColor: "#C0C0C0"
    },
    buttonLabel: {
        fontSize: 16,
        margin: 16
    }
});