import React from 'react';
import { StyleSheet, View } from 'react-native';
import GridButton from '../../../components/GridButton';
import { Segment } from '../../../utils/Segment';

interface SoundGridProps {
	sounds: Segment[];
	selected: Segment | undefined;
	setSegment: (sound: Segment) => void;
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
					label={s.name}
					selected={selected == s}
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
