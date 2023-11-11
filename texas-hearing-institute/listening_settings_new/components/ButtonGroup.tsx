import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import SettingsButton from './SettingsButton';
import ColoredText from './ColoredText';

type ButtonGroupProps = {
    headerText: string;
    screenRouteMapping: Map<string, string>;
    screenImgMapping: Map<string, ImageSourcePropType>;
}

export default function ButtonGroup({headerText, screenRouteMapping, screenImgMapping}: ButtonGroupProps) {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <ColoredText style={styles.headerText}>{headerText}</ColoredText>
            </View>
            {Array.from(screenRouteMapping.entries()).map(([screenTitle, route]) => (
                <SettingsButton
                    key={screenTitle}
                    label={screenTitle}
                    route={route}
                    img={screenImgMapping.get(route)}
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