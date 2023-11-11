import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import SettingsButton from './SettingsButton';
import ColoredText from './ColoredText';

type ButtonGroupProps = {
    headerText: string;
    buttonLabels: string[];
    buttonRoutes: string[];
}

export default function ButtonGroup({headerText, buttonLabels, buttonRoutes}: ButtonGroupProps) {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <ColoredText style={styles.headerText}>{headerText}</ColoredText>
            </View>
            {buttonLabels.map((label: string, indx: number) => (
                <SettingsButton
                    key={label}
                    label={label}
                    route={buttonRoutes[indx]}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    headerContainer: {
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 17,
    },
})