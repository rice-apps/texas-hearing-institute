import { Text, Pressable, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type BigButtonProps = {
	label: string;
	onPress: () => void;
};

const PracticeButton = ({ label, onPress }: BigButtonProps) => {
	return (
		<Pressable
			onPress={onPress}
			style={tw`font-bold bg-blue-300 rounded-xl m-3 flex flex-row justify-center items-center`}
		>
			<Text style={tw`text-lg font-bold text-black p-5`}>{label}</Text>
		</Pressable>
	);
};

export default PracticeButton;
