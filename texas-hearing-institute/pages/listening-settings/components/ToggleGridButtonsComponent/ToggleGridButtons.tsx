import React from 'react';
import { StyleSheet, View } from 'react-native';
import ToggleButton from './ToggleButton';

interface Props {
	items: string[];
	itemsSelected: boolean[];
	setItemsSelected: (index: number, newValue: boolean) => void;
	disabled?: boolean;
}

export default function ToggleGridButtons({
	items,
	itemsSelected,
	setItemsSelected,
	disabled,
}: Props) {
	return (
		<View style={styles.container}>
			{items.map((item, index) => (
				<View
					style={{
						marginRight: 12,
						marginBottom: 12,
					}}
					key={index}
				>
					<ToggleButton
						title={item}
						isToggled={itemsSelected[index]}
						onToggle={(newValue: boolean) => {
							disabled ? () => {} : setItemsSelected(index, newValue);
						}}
					/>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		width: '100%',
	},
});
