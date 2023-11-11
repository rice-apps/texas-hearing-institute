import { Text, Pressable, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type BigButtonProps = {
	label: string;
	imgUrl: any ;
	onPress: () => void;
	color?: string;
	textColor?: string;
};


const BigButton = ({ label, imgUrl, onPress }: BigButtonProps) => {
	
	
	return (
		<Pressable onPress={onPress} style={tw`font-bold bg-white rounded-xl m-3 flex flex-row justify-between items-center`}>
			<Text style={tw`text-xl font-normal text-black p-5`}>{label}</Text>
			{imgUrl && <Image source={imgUrl}  style={tw`m-4`}/>}
		</Pressable>
	);
};

export default BigButton;
