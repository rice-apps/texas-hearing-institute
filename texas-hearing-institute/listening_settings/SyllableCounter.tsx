import {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SyllableCounter() {
    const [syllableCount, setSyllableCount] = useState(1);

    useEffect(() => {
        AsyncStorage.getItem('listening_settings.syllableCount').then(r => {
            if (r != null) {
                setSyllableCount(Number.parseInt(r))
            }
        });
    }, [])

    function handleClick(byHowMuch: number) {
        if (syllableCount + byHowMuch < 1) {
            setSyllableCount(1)
        }
        if (syllableCount + byHowMuch > 9) {
            setSyllableCount(9)
        }
        setSyllableCount(syllableCount + byHowMuch);
    }
    
    useEffect(() => {
        AsyncStorage.setItem('listening_settings.syllableCount', syllableCount.toString());
    }, [syllableCount])

    var minusDisabled = syllableCount <= 1
    var plusDisabled = syllableCount >= 9

    return (
        <View style={styles.row}>

            <TouchableOpacity
                style={minusDisabled ? styles.circle_button_disabled : styles.circle_button}
                disabled={minusDisabled}
                onPress={() => {
                    console.log('Pressed minus')
                    handleClick(-1)
                }}>
                <Icon name={"remove"}/>
            </TouchableOpacity>
            <Text style={styles.syllable_count}>{syllableCount} syllables</Text>
            <TouchableOpacity
                style={plusDisabled ? styles.circle_button_disabled : styles.circle_button}
                disabled={plusDisabled}
                onPress={() => {
                    console.log('Pressed plus')
                    handleClick(1)
                }}>
                <Icon name={"add"}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-evenly',
        // flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
    },
    circle_button: {
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',
    },
    circle_button_disabled: {
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',
        opacity: 0.5
    },
    syllable_count: {
        fontSize: 20,
        // fontWeight: 'bold',
    }
});
