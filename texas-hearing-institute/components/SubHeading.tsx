import { Text } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

type SubheadingProps = {
	title: string;
};

const Subheading = ({ title }: SubheadingProps) => {
	return <Text style={tw`text-lg font-normal pb-5 px-4`}>{title}</Text>;
};

export default Subheading;
