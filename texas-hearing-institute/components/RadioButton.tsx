import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RadioButtonProps<Value> {
	label: string;
	value: Value;
	onPress: (value: Value) => void;
	selectedRadio: Value | undefined;
}

export default function RadioButton<Value>({
	label,
	value,
	onPress,
	selectedRadio,
}: RadioButtonProps<Value>) {
	return (
		<View>
			<TouchableOpacity style={styles.button} onPress={() => onPress(value)}>
				<Text style={styles.buttonLabel}>{label}</Text>
				<View style={styles.radio}>
					{selectedRadio == value ? (
						<View style={styles.radioSelected}></View>
					) : null}
				</View>
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
		height: 55,
		// marginTop: 6,
		marginBottom: 12,
		padding: 16,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	buttonLabel: {
		fontSize: 16,
	},
	radio: {
		borderRadius: 20,
		borderColor: '#D9D9D9',
		borderWidth: 2,
		width: 23,
		height: 23,
		alignItems: 'center',
		justifyContent: 'center',
	},
	radioSelected: {
		borderRadius: 20,
		backgroundColor: '#AFE4F9',
		width: 13,
		height: 13,
	},
});
