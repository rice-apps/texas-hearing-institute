import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Heading from '../components/Heading';
import Subheading from '../components/SubHeading';
import BigButton from '../components/Button';
import tw from 'tailwind-react-native-classnames';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';



export default function SpeechSetting() {

  const navigation = useNavigation();

  const showAlert = () => {
    Alert.alert(
      'Come later',
      'We are working on it, bruh!',
      [
        {
          text: 'Cancel',
          style: 'cancel', // This button will be the 'Cancel' button
        },
        { text: 'OK' }, // This will be the 'OK' button
      ],
    );
  };
  return (
   <ScrollView>
    <View style={tw`flex flex-col`}>
    <Heading title={"Speech Babble"}></Heading>
    <Subheading title={"Let’s get practicing"}></Subheading>
    <BigButton
        label={"Vowels"}
        onPress={() => navigation.navigate('Coming Soon')}
      /> 
    <BigButton
        label={"Consonants"}
        onPress={showAlert}
      />    
    </View>
    
    </ScrollView>
  );
}