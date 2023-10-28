import { ScrollView , View} from 'react-native';
import Heading from '../components/Heading';
import Subheading from '../components/SubHeading';
import SelectionButton from '../components/SelectionButton';
import { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import Selection from '../components/Selection';


const Comelater: React.FC = () => {
  const handleSubmission = (buttonStates: boolean[]) => {
    console.log('Button states:', buttonStates);
  };

  const buttonLabels = ['Button 1', 'Button 2', 'Button 3'];
  return (
    <ScrollView>
    <Heading title={"Initial Consonants"}></Heading>
    <Subheading title={"Select a consonant and blahblah to blahblah practise speaking"}></Subheading>
    <Selection buttonNames={["Variegated Vowels", "Voicing", "Manner", "Place Cue"]}></Selection>
    </ScrollView>
   
  )
}

export default Comelater