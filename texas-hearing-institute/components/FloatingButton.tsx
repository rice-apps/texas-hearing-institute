import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FloatingButtonProps {
	label: string;
	onPress: (label: string) => void;
}

export default function FloatingButton({
	label,
	onPress,
}: FloatingButtonProps) {
	return (
		<View style={styles.float}>
			<TouchableOpacity style={styles.button} onPress={() => onPress(label)}>
				<Text style={styles.label}>{label}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 326,
		height: 54,
		backgroundColor: '#AFE4F9',
		borderRadius: 32,
		paddingHorizontal: 12,
		paddingVertical: 8,
		alignItems: 'center',
		justifyContent: 'center',
		shadowOpacity: 0.14,
		shadowOffset: { height: 0, width: 0 },
	},
	label: {
		fontSize: 18,
		fontWeight: '700',
		color: '#333',
	},
	float: {
		width: '100%',
		alignItems: 'center',
		zIndex: 1,
		position: 'absolute',
		bottom: 60,
	},
});
