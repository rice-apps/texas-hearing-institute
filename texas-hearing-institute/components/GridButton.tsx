import React, { useState } from 'react';
import {
	View,
	StyleSheet,
} from 'react-native';
import ToggleableButton from './ToggleableButton';

const GridButton = () => {
	const [buttonData, setButtonData] = useState<{ [key: string]: boolean }>({});

	const handleButtonToggle = (label: string, isToggled: boolean) => {
		setButtonData((prevButtonData) => ({
			...prevButtonData,
			[label]: isToggled,
		}));
	};

	const renderButtons = () => {
		const buttonLabels = [
			'Ah',
			'a',
			'Bh',
			'bh',
			'C',
			'Wh',
			'w',
			'Xh',
			'x',
			'Yh',
			'yh',
			'Z',
			'z',
		];

		return buttonLabels.map((label, index) => (
			<ToggleableButton
				key={index}
				label={label}
				onToggle={handleButtonToggle}
			/>
		));
	};

	return (
		<View>
			<View style={buttonStyles.container}>{renderButtons()}</View>
		</View>
	);
};

const buttonStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignContent: 'center',
		padding: 15,
	},
});

export default GridButton;
