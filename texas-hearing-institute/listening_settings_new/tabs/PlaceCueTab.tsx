import {StyleSheet, Text, View} from "react-native";
import PracticeButton from "../components/PracticeButton";
import ToggleGridButtons from "../components/ToggleGridButtonsComponent/ToggleGridButtons";
import {useState} from "react";
import {retrieveItemSelections} from '../../utils/persistSelection';
import {
    consonants,
    vowelInventoryPersistenceKey,
    vowels
} from "../../utils/soundInventoryDataAndKeys";
import RadioButtonGrid from "../../components/RadioButtonGrid/RadioButtonGrid";

export default function PlaceCueTab() {
    // Load enabled phonemes from phoneme storage. These will be the options on the grid 
    const [enabledInventoryVowels, setEnabledInventoryVowels] = useState(() => {
        // enabledInventoryVowels are the vowels selected in storage
        retrieveItemSelections(vowelInventoryPersistenceKey, vowels).then(
            (result) => {
                const filteredArray = consonants.filter((value, index) => result[index]);
                setEnabledInventoryVowels(filteredArray)
            },
        );
        return [] as string[]
    });

    // These will be the highlighted phonemes on the grid, and will be passed to "active practice" mode.
    const [selectedVowels, setSelectedVowels] = useState([] as boolean[])

    // The number of syllables to listen to. Will be passed to "active practice" mode.
    const speedOptions = [
        '2 Syllables',
        '3 Syllables',
        '4 Syllables',
    ]
    const [selectedSpeedOptionsIndex, setselectedSpeedOptionsIndex] = useState(0)

    return (
        <View style={[styles.margins, styles.expanded]}>
            <View style={[styles.expanded, styles.gaps]}>
                <View>
                    <Text style={styles.title}>Place Cue</Text>
                    <Text style={styles.subtitle}>Select a vowel to practice listening</Text>
                </View>
                <ToggleGridButtons
                    items={enabledInventoryVowels}
                    itemsSelected={selectedVowels}
                    setItemsSelected={(index: number, newValue: boolean) => {
                        const newItemsSelected = [...selectedVowels];
                        newItemsSelected[index] = newValue;
                        setSelectedVowels(newItemsSelected)
                    }}
                />
                <RadioButtonGrid
                    items={speedOptions}
                    label={'Select speed'}
                    onSelect={newValue => {
                        setselectedSpeedOptionsIndex(newValue)
                    }}
                    selectedItemIndex={selectedSpeedOptionsIndex}
                />
            </View>
            {/*Because PracticeButton is not included in the
            styles.expanded (flex: 1) View, it is thrown to the bottom. */}
            {/*TODO: Pass phonemesSelected, numberOfSyllables to PracticeButton*/}
            <PracticeButton/>
        </View>
    );
}

const styles = StyleSheet.create({
    margins: {
        padding: 32
    },
    expanded: {
        flex: 1
    },
    gaps: {
        gap: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        paddingTop: 10,
        paddingBottom: 10
    },
    label: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 22
    },
    form_section: {
        justifyContent: 'center'
    }
});
