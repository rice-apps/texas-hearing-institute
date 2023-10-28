import { ScrollView,  TouchableOpacity, Text, View, StyleSheet  } from 'react-native';
import Heading from '../components/Heading';
import Subheading from '../components/SubHeading';
import GridButton from '../components/GridButton';
import SyllableCounterDropdown from "../components/Counter"
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from "@eva-design/eva"
import tw from 'tailwind-react-native-classnames';


const Comelater: React.FC = () => {
  return (
    <ScrollView>
    <Heading title={"Initial Consonants"}></Heading>
    <Subheading title={"Select a consonant and blahblah to blahblah practise speaking"}></Subheading>
    <GridButton/>
    <View style={tw`px-4`}>
    <ApplicationProvider {...eva} theme={eva.dark}>
      <SyllableCounterDropdown/>
    </ApplicationProvider>   
    </View>
    </ScrollView>
   
  )
}



export default Comelater

