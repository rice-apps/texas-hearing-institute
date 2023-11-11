import React from 'react';
import { Text, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type BigButtonProps = {
	label: string;
	onPress: () => void;
	color?: string;
	textColor?: string;
};

const BigButton = ({ label, onPress }: BigButtonProps) => {
	return (
		<Pressable onPress={onPress} style={tw`font-bold bg-black rounded-xl m-3`}>
			<Text style={tw`text-xl font-normal text-white p-5`}>{label}</Text>
		</Pressable>
	);
};

export default BigButton;
