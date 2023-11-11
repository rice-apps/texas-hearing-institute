import TitleText from '../components/TitleText';
import RadioButtonGrid from "../../components/RadioButtonGrid/RadioButtonGrid";
import {useState} from "react";
import {StyleSheet, View} from "react-native";
import PracticeButton from "../components/PracticeButton";

export default function VoicingScreen() {
    const vowelTypes = [
        'Same Vowels',
        'Different Vowels',
    ]
    const [selectedVowelTypeIndex, setSelectedVowelTypeIndex] = useState(0)

    const speedOptions = [
        '2 Syllables',
        '3 Syllables',
        '4 Syllables',
    ]
    const [selectedSpeedOptionsIndex, setselectedSpeedOptionsIndex] = useState(0)

    return (
        <View style={[styles.margins, styles.expanded]}>
            <View style={styles.expanded}>
                <TitleText>Voicing</TitleText>
                {/* Spacer between title and first RadioButtonGrid*/}
                <View style={{marginTop: 40}}/>
                {/* Regular gaps between every RadioButtonGrid section*/}
                <View style={{gap: 40}}>
                    <RadioButtonGrid
                        items={vowelTypes}
                        label={'Select a vowel type'}
                        onSelect={newValue => {
                            setSelectedVowelTypeIndex(newValue)
                        }}
                        selectedItemIndex={selectedVowelTypeIndex}
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
            </View>
            {/*Because PracticeButton is not included in the
            styles.expanded (flex: 1) View, it is thrown to the bottom. */}
            {/*TODO: Pass vowel types and speed options to next view*/}
            <PracticeButton/>
        </View>
    )
}

const styles = StyleSheet.create({
    expanded: {
        flex: 1
    },
    margins: {
        padding: 32
    },
})