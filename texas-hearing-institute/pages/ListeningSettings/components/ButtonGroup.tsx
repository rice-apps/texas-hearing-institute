import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import SettingsButton from './SettingsButton';

interface ButtonGroupProps {
	headerText: string;
	buttonLabels: string[];
	buttonRoutes: string[];
	buttonStyle?: ViewStyle;
}

export default function ButtonGroup({
	headerText,
	buttonLabels,
	buttonRoutes,
	buttonStyle,
}: ButtonGroupProps) {
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>{headerText}</Text>
			</View>
			{buttonLabels.map((label: string, indx: number) => (
				<SettingsButton
					key={label}
					label={label}
					route={buttonRoutes[indx]}
					style={buttonStyle || styles.button}
					textStyle={{ color: 'black' }}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
	},
	headerContainer: {
		flexDirection: 'row',
	},
	headerText: {
		fontSize: 20,
		fontWeight: '500',
		marginBottom: 17,
	},
	button: {
		backgroundColor: 'white',
		color: 'black',
		padding: 10,
		marginVertical: 5,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: 'black',
	},
});
