import { useEffect, useState } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListeningButtonGroup() {
    const [selectedMode, setSelectedMode] = useState("");

    useEffect(() => {
        // get set button in storage
        AsyncStorage.getItem("listening_settings.selectedMode").then(r => {
            if (r != null) {
                setSelectedMode(r);
            }
        })
    }, [])

    const buttonSelectHandler = (name: string) => {
        if (selectedMode === name) {
            setSelectedMode("");
        } else {
            setSelectedMode(name);
        }
    }

    useEffect(() => {
        AsyncStorage.setItem("listening_settings.selectedMode", selectedMode);
    }, [selectedMode])

    return (
        <View>
            {["Variegated Vowels", "Manner", "Voicing", "Place Cue"].map((name) => (
                <Pressable
                    key={name}
                    style={[styles.button, selectedMode === name && styles.selectedButton]}
                    onPress={() => buttonSelectHandler(name)}
                >
                    <Text style={styles.buttonText}>{name}</Text>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#D9D9D9",
        borderRadius: 12,
        height: 50,
        marginTop: 6,
        marginBottom: 6
    },
    selectedButton: {
        backgroundColor: "#C0C0C0"
    },
    buttonText: {
        fontSize: 16,
        margin: 16
    }
})