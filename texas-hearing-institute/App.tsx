import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Heading from './components/Heading';
import Subheading from './components/SubHeading';
import BigButton from './components/Button';
import tw from 'tailwind-react-native-classnames';


export default function App() {
  return (
   <ScrollView>
    <View style={tw`flex flex-col`}>
    <Heading title={"Speech Babble"}></Heading>
    <Subheading title={"Let’s get practicing"}></Subheading>
    <BigButton
        label={"Vowels"}
        onPress={()=>console.log("Pressed")}
      /> 
    <BigButton
        label={"Consonants"}
        onPress={()=>console.log("Pressed")}
      />    
    </View>
    
    </ScrollView>
  );
}