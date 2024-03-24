import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
	progress: number;
}

export default function ProgressBar({ progress }: Props) {
	return (
		<View
			style={[
				styles.backBar,
				{
					height: 12,
					borderRadius: 20,
					width: '100%',
				},
			]}
		>
			<View
				style={[
					styles.frontBar,
					{
						width: `${progress}%`,
						borderRadius: 20,
					},
				]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	backBar: {
		backgroundColor: '#EBEBEB',
		overflow: 'hidden',
	},
	frontBar: {
		height: '100%',
		backgroundColor: '#AFE4F9',
	},
});
