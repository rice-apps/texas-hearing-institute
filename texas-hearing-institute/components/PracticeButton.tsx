import { Text, Pressable, Image,StyleSheet, View ,TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';

type BigButtonProps = {
	label: string;
	onPress: () => void;
};

const PracticeButton = ({ label, onPress }: BigButtonProps) => {
	return (
		// <Pressable
		// 	onPress={onPress}
		// 	style={tw`font-bold bg-blue-300 rounded-xl flex flex-row justify-center items-center absolute w-full `}
		// >
		// 	<Text style={tw`text-lg font-bold text-black p-5`}>{label}</Text>
		// </Pressable>
		<FloatingButton/>
	);
}
const FloatingButton = () => {
	return (
	  <View style={styles.container}>
		<TouchableOpacity style={styles.button}>
		  <Text style={styles.buttonText}>Let's Practise</Text>
		</TouchableOpacity>
	  </View>
	);
  };
  
  const styles = StyleSheet.create({
	container: {
	  position: 'absolute',
	  bottom: 70,
	  width: '100%',
	  alignItems: 'center',
	},
	button: {
	  backgroundColor: '#3498db',
	  padding: 15,
	  borderRadius: 20,
	  width: '90%',
	  alignItems: 'center',
	  
	},
	buttonText: {
	  color: 'white',
	  fontSize: 18,
	  fontWeight: 'bold',
	},
  });

export default PracticeButton;
