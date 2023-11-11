import Svg, {Circle} from "react-native-svg";
import {StyleSheet, View} from "react-native";

export default function RadioCircle({selected}: { selected: boolean }) {
    const unfilledCircle = <Svg width="23" height="23" viewBox="0 0 23 23" fill="none">
        <Circle cx="11.5" cy="11.5" r="10.5" stroke="#D9D9D9" stroke-width="2"/>
    </Svg>;
    const filledCircle = <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <Circle cx="6.5" cy="6.5" r="6.5" fill="#AFE4F9"/>
    </Svg>
    
    return <View style={styles.container}>
        {unfilledCircle}
        {selected && <View style={styles.overlay}>{filledCircle}</View>}
    </View>
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginRight: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
})