import {StyleSheet, Text, View} from "react-native";
import {IndexPath, Select, SelectItem} from "@ui-kitten/components";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SyllableCounterDropdown() {
    // Load from storage the first time the page is loading
    const [syllableCount, setSyllableCount] = useState(() => {
        AsyncStorage.getItem('listeningSettings.syllableCount').then(value => {
            if (value != null) {
                setSyllableCount(Number.parseInt(value))
                setSelectedIndex(new IndexPath(syllablesToRow(Number.parseInt(value))))
            } else {
                setSyllableCount(2)
                setSelectedIndex(new IndexPath(0))
            }
        })
        return 1
    });
    // TODO: Redundant? As this is being set by the useState up above.
    // But we still need the selectedIndex and setSelectedIndex vars.
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));

    return (
        <View style={styles.row}>
            <Select
                style={styles.select}
                selectedIndex={selectedIndex}
                value={rowToSyllables(selectedIndex.row)}
                onSelect={index => {
                    index = index as IndexPath
                    setSelectedIndex(index as IndexPath);
                    setSyllableCount(rowToSyllables(index.row));
                    AsyncStorage.setItem('listeningSettings.syllableCount', rowToSyllables(index.row).toString());
                }}>
                <SelectItem title='2'/>
                <SelectItem title='3'/>
                <SelectItem title='4'/>
            </Select>
            <Text style={styles.label}>Syllables</Text>
        </View>
    );

    function rowToSyllables(row: number) {
        return row + 2;
    }

    function syllablesToRow(syllables: number) {
        return syllables - 2;
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    select: {
        flex: 2,
    },
    label: {
        flex: 5,
        fontSize: 16
    }
});
