import {StyleSheet, Text, View} from "react-native";
import {IndexPath, Select, SelectItem} from "@ui-kitten/components";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SyllableCounterDropdown() {
    // Load from storage the first time the page is loading
    const [syllableCount, setSyllableCount] = useState(() => {
        AsyncStorage.getItem('listeningSettings.syllableCount').then(value => {
            if (value != null) {
                // - 2 because the syllables start at 2
                setSyllableCount(Number.parseInt(value))
                setSelectedIndex(new IndexPath(Number.parseInt(value) - 2))
            } else {
                setSyllableCount(1)
                setSelectedIndex(new IndexPath(0))
            }
        })
        return 1
    });
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));

    useEffect(() => {
        AsyncStorage.setItem('listeningSettings.syllableCount', syllableCount.toString());
    }, [syllableCount])

    return (
        <View style={styles.row}>
            <Select
                style={styles.select}
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
            </Select>
            <Text style={styles.label}>Syllables</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    select: {
        flex: 1,
    },
    label: {
        flex: 3,
        fontSize: 16
    }
});
