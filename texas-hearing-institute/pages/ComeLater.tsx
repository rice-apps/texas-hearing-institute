import { ScrollView } from 'react-native';
import Heading from '../components/Heading';
import Subheading from '../components/SubHeading';


const Comelater: React.FC = () => {
  const handleSubmission = (buttonStates: boolean[]) => {
    console.log('Button states:', buttonStates);
  };

  const buttonLabels = ['Button 1', 'Button 2', 'Button 3'];
  return (
    <ScrollView>
    <Heading title={"Initial Consonants"}></Heading>
    <Subheading title={"Select a consonant and blahblah to blahblah practise speaking"}></Subheading>
    </ScrollView>
   
  )
}

export default Comelater