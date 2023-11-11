import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ColoredText from './ColoredText';

type SettingsButtonProps = {
    label: string;
    route: string;
    img: any;
}

// Keep getting the error that the type to be passed into navigation.navigate must be type void, not sure why
// This is a solution
type Nav = {
    navigate: (value: string) => void;
}

export default function SettingsButton({ label, route, img }: SettingsButtonProps) {
    const navigation = useNavigation<Nav>();

    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(route)}
            >
                <View style={styles.buttonLabelContainer}>
                    <ColoredText style={styles.buttonLabel}>{label}</ColoredText>
                    <Image source={img} style={{}} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        height: 55,
        marginTop: 6,
        marginBottom: 6,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
    },
    selectedButton: {
        backgroundColor: "#C0C0C0"
    },
    buttonLabelContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonLabel: {
        fontSize: 16,
        margin: 18,
        fontWeight: '500',
        alginSelf: 'flex-start'
    },
});