import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import SettingsButton from './SettingsButton';

type ButtonGroupProps = {
    headerImage: ImageSourcePropType;
    headerText: string;
    buttonLabels: string[];
    buttonRoutes: string[];
}

export default function ButtonGroup({headerImage, headerText, buttonLabels, buttonRoutes}: ButtonGroupProps) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Image source={headerImage} style={styles.img}/>
                <Text style={styles.headerText}>{headerText}</Text>
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
    headerContainer: {
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 17
    },
    img: {
        width: 22,
        height: 22,
        marginRight: 10
    }
})