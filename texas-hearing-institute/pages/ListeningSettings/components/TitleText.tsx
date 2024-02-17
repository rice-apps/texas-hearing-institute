import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface TitleTextProps {
	children: string;
}

/**
 * A component that displays Title text
 */
export default function TitleText({ children }: TitleTextProps) {
	return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: '600',
		marginBottom: 6,
	},
});
