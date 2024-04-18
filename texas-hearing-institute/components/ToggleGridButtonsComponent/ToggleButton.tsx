import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './ToggleButtonStyle';
import { playSound } from '../../utils/audio';

interface Props {
	title: string;
	speak: boolean;
	isToggled: boolean;
	onToggle: (newValue: boolean) => void;
	enabled: boolean;
}

const ToggleButton: React.FC<Props> = ({
	title,
	speak,
	isToggled,
	onToggle,
	enabled,
}) => {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				isToggled ? styles.buttonActive : styles.buttonInactive,
			]}
			onPress={() => {
				onToggle(!isToggled);
				speak && playSound(title);
			}}
			disabled={!enabled}
		>
			<Text style={[styles.buttonText]}>{title}</Text>
		</TouchableOpacity>
	);
};

export default ToggleButton;
