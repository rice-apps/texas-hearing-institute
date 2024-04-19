import React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	ViewStyle,
	TextStyle,
	Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface SettingsButtonProps {
	label: string;
	route: string;
	imageSource: string;
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
	imageSource,
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
				<Image
					source={require(imageSource)}
					style={{ width: 270, height: 121 }}
				/>
				<Text style={[styles.buttonLabel, textStyle]}>{label}</Text>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	button: {
		backgroundColor: 'white',
		borderRadius: 12,
		height: 55,
		marginTop: 6,
		marginBottom: 6,
		color: 'black',
		borderColor: 'black',
		borderWidth: 1,
	},
	selectedButton: {
		backgroundColor: '#C0C0C0',
	},
	buttonLabel: {
		fontSize: 16,
		margin: 16,
	},
	buttonImage: {
		width: 24,
		height: 24,
		marginRight: 10,
	},
});
