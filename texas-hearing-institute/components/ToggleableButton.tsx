import React, { useState } from 'react';
import {
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';

type ToggleableButtonProps = {
	label: string;
	onToggle: (label: string, isToggled: boolean) => void;
};

const ToggleableButton = ({ label, onToggle }: ToggleableButtonProps) => {
	const [isToggled, setIsToggled] = useState(false);

	const handleToggle = () => {
		const toggled = !isToggled;
		setIsToggled(toggled);
		onToggle(label, toggled);
	};
	const buttonStyle = isToggled
		? [styles.clickedButton, styles.rounded]
		: [styles.button, styles.rounded];
	const buttonTextStyle = isToggled
		? styles.clickedButtonText
		: styles.buttonText;

	return (
		<TouchableOpacity style={buttonStyle} onPress={handleToggle}>
			<Text style={buttonTextStyle}>{label}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'white',
		borderColor: 'black',
		borderWidth: 1,
		padding: 10,
		margin: 5,
		borderRadius: 10,
	},
	clickedButton: {
		backgroundColor: 'black',
		borderColor: 'white',
		borderWidth: 1,
		padding: 10,
		margin: 5,
		borderRadius: 10,
	},
	buttonText: {
		color: 'black',
		fontSize: 18,
		fontWeight: 'bold',
	},
	clickedButtonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
	rounded: {
		borderRadius: 10,
	},
});

export default ToggleableButton;
