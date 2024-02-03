import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { syllableGeneration } from './utils/syllableGeneration';
import { ConsonantSegment, ConsonantCategories, ConsonantFlower } from './utils/Segment';

export default function App() {

	// do console.log here 

	return (
		<View style={styles.container}>
			<Text style={tw`text-3xl font-bold underline`}>
				Open up App.tsx to start working on your app!
			</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const SyllableDisplay = () => {
    const [syllable, setSyllable] = useState('');

    useEffect(() => {
        const result = syllableGeneration(
            new ConsonantSegment('t', [ConsonantCategories.Initial], {
                manner: [0],
                voice: [3],
                place: [3],
            }),
            ConsonantFlower.Manner,
            true,
            ConsonantCategories.Initial,
            2
        );
        setSyllable(JSON.stringify(result));
    }, []);

    return (
        <View>
            <Text>Syllable: {syllable}</Text>
        </View>
    );
};



