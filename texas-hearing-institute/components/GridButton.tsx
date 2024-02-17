import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface GridButtonProps {
	label: string;
	selected: boolean;
	onPress: (label: string) => void;
}

export default function GridButton({
	label,
	selected,
	onPress,
}: GridButtonProps) {
	const style = selected ? styles.buttonSelected : styles.button;
	return (
		<View>
			<TouchableOpacity style={style} onPress={() => onPress(label)}>
				<Text>{label}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#FFF',
		borderRadius: 12,
		borderWidth: 2,
		borderColor: '#E7E7E7',
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	buttonSelected: {
		backgroundColor: '#AFE4F9',
		borderRadius: 12,
		borderWidth: 2,
		borderColor: '#E7E7E7',
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
});
