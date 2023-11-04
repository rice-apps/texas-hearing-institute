import { View, Button, Text, Pressable, Image, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type SelectionButtonProps = {
	label: string;
	onPress: () => void;
	color?: string;
	textColor?: string;
	checkedState: number;
	id: number;
};

const styles = StyleSheet.create({
	image: {
		width: 30,
		height: 30,
		marginRight: 20,
		resizeMode: 'stretch',
	},
});

const SelectionButton = ({
	label,
	onPress,
	checkedState,
	id,
}: SelectionButtonProps) => {
	if (checkedState == id) {
		return (
			<Pressable
				onPress={onPress}
				style={tw`font-bold bg-black rounded-xl m-1 flex-1 flex-row justify-between items-center`}
			>
				<Text style={tw`text-xl font-normal text-white p-5`}>{label}</Text>
				<Image
					style={styles.image}
					source={require('../assets/checked-circle.png')}
				/>
			</Pressable>
		);
	} else {
		return (
			<Pressable
				onPress={onPress}
				style={tw`font-bold bg-black rounded-xl m-1 flex-1 flex-row justify-between items-center`}
			>
				<Text style={tw`text-xl font-normal text-white p-5`}>{label}</Text>
				<Image
					style={styles.image}
					source={require('../assets/unchecked-circle.png')}
				/>
			</Pressable>
		);
	}
};

export default SelectionButton;
