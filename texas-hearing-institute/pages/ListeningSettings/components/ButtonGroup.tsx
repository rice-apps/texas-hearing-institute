import React from 'react';
import { StyleSheet, Text, View, ViewStyle, ScrollView } from 'react-native';
import SettingsButton from './SettingsButton';

interface ButtonGroupProps {
	headerText: string;
	buttonLabels: string[];
	buttonRoutes: string[];
	imageSources: string[];
	buttonStyle?: ViewStyle;
}

export default function ButtonGroup({
	headerText,
	buttonLabels,
	buttonRoutes,
	buttonStyle,
	imageSources,
}: ButtonGroupProps) {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>{headerText}</Text>
			</View>
			{buttonLabels.map((label: string, indx: number) => (
				<SettingsButton
					key={label}
					label={label}
					route={buttonRoutes[indx]}
					imageSource={imageSources[indx]}
					style={buttonStyle}
					textStyle={styles.buttonText}
				/>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	headerContainer: {
		flexDirection: 'row',
		marginBottom: 17,
	},
	headerText: {
		fontSize: 20,
		fontWeight: '500',
	},
	button: {
		backgroundColor: 'white',
		padding: 10,
		marginVertical: 5,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: 'black',
	},
	buttonText: {
		fontSize: 16,
		color: 'black',
	},
});
