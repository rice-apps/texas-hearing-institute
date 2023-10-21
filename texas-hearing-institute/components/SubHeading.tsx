import { Text } from "react-native-elements"
import tw from 'tailwind-react-native-classnames';

interface SubheaderProps {
    title: string;
  }

const Subheading: React.FC<SubheaderProps> = ({ title }) => {
  return (
    <Text style={tw`text-lg font-normal pb-5 px-4`}>
        { title }
    </Text>
  )
}

export default Subheading