import React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	ViewStyle,
	TextStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface SettingsButtonProps {
	label: string;
	route: string;
	style?: ViewStyle;
	textStyle?: TextStyle;
}

// Keep getting the error that the type to be passed into navigation.navigate must be type void, not sure why
// This is a solution
interface Nav {
	navigate: (value: string) => void;
}

export default function SettingsButton({
	label,
	route,
	style,
	textStyle,
}: SettingsButtonProps) {
	const navigation = useNavigation<Nav>();

	return (
		<View>
			<TouchableOpacity
				style={[styles.button, style]}
				onPress={() => navigation.navigate(route)}
			>
				<Text style={[styles.buttonLabel, textStyle]}>{label}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#D9D9D9',
		borderRadius: 12,
		height: 55,
		marginTop: 6,
		marginBottom: 6,
		color: 'black',
	},
	selectedButton: {
		backgroundColor: '#C0C0C0',
	},
	buttonLabel: {
		fontSize: 16,
		margin: 16,
	},
});
