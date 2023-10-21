import { Text } from "react-native-elements"
import tw from 'tailwind-react-native-classnames';

interface HeaderProps {
    title: string;
  }

const Heading: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Text style={tw`text-2xl font-bold pb-5 px-4`}>
        { title }
    </Text>
  )
}

export default Heading