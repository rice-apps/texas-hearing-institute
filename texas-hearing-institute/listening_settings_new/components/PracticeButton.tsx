import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ColoredText from './ColoredText';

export default function PracticeButton() {

    return (
        <View>
            <TouchableOpacity
                style={styles.button}
            >
                <View style={styles.container}>
                    <ColoredText style={styles.buttonText}>Let's Practice</ColoredText>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    button: {
        backgroundColor: "#D9D9D9",
        borderRadius: 20,
        height: 54,
        marginTop: 6,
        marginBottom: 6
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600'
    }
})