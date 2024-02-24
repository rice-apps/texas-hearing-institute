import React from 'react';
import { StyleSheet, View } from 'react-native';
import GridButton from '../../../components/GridButton';

interface SoundGridProps {
	sounds: string[];
	selected: string;
	setSegment: (sound: string) => void;
}

export default function SoundGrid({
	sounds,
	selected,
	setSegment,
}: SoundGridProps) {
	return (
		<View style={styles.grid}>
			{sounds.map((s, i) => (
				<GridButton
					key={i}
					label={s}
					selected={selected == s ? true : false}
					onPress={() => setSegment(s)}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		columnGap: 12,
		rowGap: 12,
	},
});
