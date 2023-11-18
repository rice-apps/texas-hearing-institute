import {View, TouchableOpacity, Image, StyleSheet, ImageSourcePropType} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ColoredText from './ColoredText';

interface SettingsButtonProps {
    label: string;
    route: string;
    img: ImageSourcePropType;
}

// Keep getting the error that the type to be passed into navigation.navigate must be type void, not sure why
// This is a solution
interface Nav {
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
                    <Image source={img} style={styles.img}/>   
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
    img: {
        width: 45,
        height: 45,
        marginRight: 30,
        marginTop: 5
    },
    buttonLabel: {
        fontSize: 16,
        margin: 18,
        fontWeight: '500',
        alignSelf: 'flex-start'
    },
});