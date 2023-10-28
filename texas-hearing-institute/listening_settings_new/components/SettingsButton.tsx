import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type SettingsButtonProps = {
    label: string;
    route: string;
}

// Keep getting the error that the type to be passed into navigation.navigate must be type void, not sure why
// This is a solution
type Nav = {
    navigate: (value: string) => void;
}

export default function SettingsButton({ label, route }: SettingsButtonProps) {
    const navigation = useNavigation<Nav>();

    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(route)}
            >
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