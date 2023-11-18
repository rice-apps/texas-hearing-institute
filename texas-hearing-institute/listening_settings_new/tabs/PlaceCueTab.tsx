import {StyleSheet, Text, View} from "react-native";
import PracticeButton from "../components/PracticeButton";
import ToggleGridButtons from "../components/ToggleGridButtonsComponent/ToggleGridButtons";
import {useState} from "react";
import {retrieveItemSelections} from '../../utils/persistSelection';
import {
    consonantInventoryPersistenceKey,
    consonants,
    vowelInventoryPersistenceKey,
    vowels
} from "../../utils/soundInventoryDataAndKeys";
import RadioButtonGrid from "../../components/RadioButtonGrid/RadioButtonGrid";

// TODO: There should be no more "selected" in storage. We should just be pulling the available 
//  phonemes from storage.
export default function PlaceCueTab() {
    const phonemes = ['phe', 'phi', 'pho', 'phum', 'que', 'qui', 'quo', 'qua', 'quu']

    async function fetchPhonemesFromStorage() {
        const [inventoryConsonants, setInventoryConsonants] = useState(() => {
            retrieveItemSelections(consonantInventoryPersistenceKey, consonants).then(
                (result) => {
                    setInventoryConsonants(result);
                },
            );

            return [] as boolean[];
        });

        const [inventoryVowels, setInventoryVowels] = useState(() => {
            retrieveItemSelections(vowelInventoryPersistenceKey, vowels).then(
                (result) => {
                    setInventoryVowels(result);
                },
            );

            return [] as boolean[];
        });

        const allInventory = [...inventoryConsonants]
        allInventory.push(...inventoryVowels)
        return allInventory
    }

    const [phonemesSelected, setPhonemesSelected] = useState<boolean[]>(() => [])
    
    // DEBUG
    console.log(fetchPhonemesFromStorage())

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
                    items={phonemes}
                    itemsSelected={phonemesSelected}
                    setItemsSelected={(index, newValue) => {
                        phonemesSelected[index] = newValue
                        // [...itemsSelected] clones the list for useState
                        // https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array
                        setPhonemesSelected([...phonemesSelected])
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
                {/*<SyllableCounterDropdown syllableCountChanged={syllables => {
                    numberOfSyllables = syllables
                }}/>*/}
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
