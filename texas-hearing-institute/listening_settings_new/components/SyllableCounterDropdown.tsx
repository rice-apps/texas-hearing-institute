import {StyleSheet, Text, View} from "react-native";
import {IndexPath, Select, SelectItem} from "@ui-kitten/components";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
    syllableCountChanged: (syllables: number) => void,
}

const SyllableCounterDropdown: React.FC<Props> = ({ syllableCountChanged }) => {
    // Abuse useState to only run the following code the first time this page loads.
    // This function loads syllableCount from storage.
    useState(() => {
        AsyncStorage.getItem('listeningSettings.syllableCount').then(value => {
            if (value != null) {
                setSelectedIndex(new IndexPath(syllablesToRow(Number.parseInt(value))))
                syllableCountChanged(Number.parseInt(value))
            } else {
                setSelectedIndex(new IndexPath(0))
            }
        })
        return 1
    });
    
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
                    AsyncStorage.setItem('listeningSettings.syllableCount', rowToSyllables(index.row).toString());
                    // Callback to parent component
                    syllableCountChanged(rowToSyllables(index.row))
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

export default SyllableCounterDropdown

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