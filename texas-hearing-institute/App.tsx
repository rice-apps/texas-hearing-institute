import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import ToggleGridButtons from './components/ToggleGridButtonsComponent/ToggleGridButtons';
import { useState } from 'react';




export default function App() {
	return (
		<View style={styles.container}>
			<Text style={tw`text-3xl font-bold underline`}>
				Open up App.tsx to start working on your app!
			</Text>
			<StatusBar style="auto" />
		</View>
	);
}

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ToggleGridButtons items={testItems} itemSelected={itemSelected} setItemSelected={(index: number, newValue: boolean) => {
                const newItemSelected = [...itemSelected];
                newItemSelected[index] = newValue;
                setItemSelected(newItemSelected);
            }} />
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
    