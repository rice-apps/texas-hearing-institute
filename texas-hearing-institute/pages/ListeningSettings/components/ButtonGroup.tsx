import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SettingsButton from './SettingsButton';

interface ButtonGroupProps {
	headerText: string;
	buttonLabels: string[];
	buttonRoutes: string[];
}

export default function ButtonGroup({
	headerText,
	buttonLabels,
	buttonRoutes,
}: ButtonGroupProps) {
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>{headerText}</Text>
			</View>
			{buttonLabels.map((label: string, indx: number) => (
				<SettingsButton key={label} label={label} route={buttonRoutes[indx]} />
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
});
