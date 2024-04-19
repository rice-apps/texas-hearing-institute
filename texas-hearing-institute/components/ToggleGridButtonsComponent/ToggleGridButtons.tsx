import { View, StyleSheet } from 'react-native';
import ToggleButton from './ToggleButton';
import React from 'react';

interface Props {
	items: string[];
	speak: boolean;
	itemsSelected: boolean[];
	setItemsSelected: (index: number, newValue: boolean) => void;
	disabled: boolean;
}

const ToggleGridButtons: React.FC<Props> = ({
	items,
	speak,
	itemsSelected,
	setItemsSelected,
	disabled,
}) => {
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
						speak={speak}
						isToggled={itemsSelected[index]}
						onToggle={(newValue: boolean) => {
							disabled ? () => undefined : setItemsSelected(index, newValue);
						}}
						enabled={!disabled}
					/>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		width: '100%',
	},
});

export default ToggleGridButtons;
