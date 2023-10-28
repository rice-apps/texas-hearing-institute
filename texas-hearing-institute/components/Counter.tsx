import {StyleSheet, Text, View} from "react-native";
import {IndexPath, Select, SelectItem} from "@ui-kitten/components";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function SyllableCounterDropdown() {
    const [syllableCount, setSyllableCount] = useState(1);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));

    // Load from storage the first time the page is loading
    useEffect(() => {
        AsyncStorage.getItem('speaking_settings.syllableCount').then(r => {
            if (r != null) {
                setSelectedIndex(new IndexPath(Number.parseInt(r) - 2))
                setSyllableCount(Number.parseInt(r))
            }
        });
    }, [])

    useEffect(() => {
        AsyncStorage.setItem('speaking_settings.syllableCount', syllableCount.toString());
    }, [syllableCount])

    return (
        <View style={styles.row}>
            <Select
                style={{flex: 1}}
                selectedIndex={selectedIndex}
                value={selectedIndex.row + 2}
                onSelect={index => {
                    index = index as IndexPath
                    setSelectedIndex(index as IndexPath);
                    setSyllableCount(index.row + 2);
                }}>
                <SelectItem title='2'/>
                <SelectItem title='3'/>
                <SelectItem title='4'/>
                <SelectItem title='5'/>
                <SelectItem title='6'/>
                <SelectItem title='7'/>
                <SelectItem title='8'/>
                <SelectItem title='9'/>
            </Select>
            <Text style={styles.label}>Syllables</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        // width: "100%",
        justifyContent: 'flex-start',
        // flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
    },
    label: {
        flex: 3,
        fontSize: 16
    }
});