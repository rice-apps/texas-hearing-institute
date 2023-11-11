import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const GridButton: React.FC = () => {
	return <SingleSelectionButtons />;
};

const buttonStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignContent: 'center',
		padding: 15,
	},
});

export default GridButton;

const SingleSelectionButtons = () => {
	const [selectedButton, setSelectedButton] = useState(null);

	const handleButtonPress = (buttonId: any) => {
		setSelectedButton(buttonId);
	};

	const renderButtons = () => {
		const buttonData = [
			{ id: 1, label: 'A' },
			{ id: 2, label: 'B' },
			{ id: 3, label: 'ah' },
			{ id: 4, label: 'bu' },
			{ id: 5, label: 'me' },
			{ id: 6, label: 'yo' },
			{ id: 7, label: 'io' },
			{ id: 8, label: 'po' },
			{ id: 9, label: 'to' },
			{ id: 10, label: 'ru' },
			{ id: 11, label: 'do' },
			{ id: 12, label: 'r' },
			{ id: 13, label: 'd' },
			{ id: 14, label: 'r' },
			{ id: 15, label: 'd' },

			// Add more buttons as needed
		];

		return buttonData.map((button) => (
			<TouchableOpacity
				key={button.id}
				style={[
					styles.button,
					selectedButton === button.id && styles.selectedButton,
				]}
				onPress={() => handleButtonPress(button.id)}
			>
				<Text style={styles.buttonText}>{button.label}</Text>
			</TouchableOpacity>
		));
	};

	return <View style={styles.container}>{renderButtons()}</View>;
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		margin: 10,
		flexWrap: 'wrap',
	},
	button: {
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 5,
		margin: 5,
	},
	selectedButton: {
		backgroundColor: 'grey',
	},
	buttonText: {
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
