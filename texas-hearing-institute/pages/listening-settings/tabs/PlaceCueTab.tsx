import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import PracticeButton from "../components/PracticeButton";
import ToggleGridButtons from "../components/ToggleGridButtonsComponent/ToggleGridButtons";
import {useState} from "react";
import SyllableCounterDropdown from "../components/SyllableCounterDropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PlaceCueTab() {
    const phonemes = ['phe', 'phi', 'pho', 'phum', 'que', 'qui', 'quo', 'qua', 'quu']

    async function fetchPhonemesSelectedFromStorage() {
        const selectedJson = await AsyncStorage.getItem('listeningSettings.phonemesSelected');
        if (selectedJson != null) {
            return JSON.parse(selectedJson);
        } else {
            return []
        }
    }

    const [phonemesSelected, _setPhonemesSelected] = useState<boolean[]>(() => {
        fetchPhonemesSelectedFromStorage().then(selected => {
            _setPhonemesSelected(selected)
        });
        return []
    })

    // Our function for setPhonemesSelected, since we also want to store it 
    function setPhonemesSelected(selected: boolean[]) {
        AsyncStorage.setItem('listeningSettings.phonemesSelected', JSON.stringify(phonemesSelected));
        _setPhonemesSelected(selected)
    }

    // Bypassing this warning for now, as this variable will be used in the future.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let numberOfSyllables = 2;

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
                <SyllableCounterDropdown syllableCountChanged={syllables => {
                    numberOfSyllables = syllables
                }}/>
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
