import { useState } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

export default function ListeningButtonGroup() {
    const [selectedButton, setSelectedButton] = useState("");

    const buttonSelectHandler = (name: string) => {
        if (selectedButton === name) {
            setSelectedButton("");
        } else {
            setSelectedButton(name);
        }
    }

    return (
        <View>
            {["Variegated Vowels", "Manner", "Voicing", "Place Cue"].map((name) => (
                <Pressable
                    key={name}
                    style={[styles.button, selectedButton === name && styles.selectedButton]}
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