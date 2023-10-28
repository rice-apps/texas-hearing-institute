//APP STUFF===============================================================================================================
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';


const syllables = ["pee paw", "pee po", "pee pie", "the", "quick", "brown", "fox"];
const text = "pee paw";
export default function App() {
  return (
    <View style={[styles.container, 
    {
      flexDirection: 'column',
    }]}>
      <Text style={tw`text-3xl font-bold underline pt-10`}>Good morning Bob!</Text>
      <Text style={tw`text-2xl pt-6`}>Let's get practicing!</Text>
   
      <Icon style={tw `p-5`} name="circle" size={25} color="black">
      <Text style={tw`text-2xl font-bold pt-6`}>Speech Babble</Text>
            </Icon>
      
      <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-2xl pt-2 pl-2`}>Vowels</Text>
      </Pressable>
        
      <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-2xl pt-2 pl-2`}>Initial Consonants</Text>
      </Pressable> 
        <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-2xl pt-2 pl-2`}>Final Consonants</Text>
        </Pressable>

        <Icon style={tw `p-5`} name="circle" size={25} color="black">
      <Text style={tw`text-2xl font-bold pt-6`}>Listening Babble</Text>
            </Icon>
       <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-2xl pt-2 pl-2`}>Variegated Vowels</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-2xl pt-2 pl-2`}>Voicing</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-2xl pt-2 pl-2`}>Manner</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-2xl pt-2 pl-2`}>Place Cue</Text>
        </Pressable>
        
        
      <StatusBar style="auto" />
      
    </View>

     //<View style={styles.container}><Text>Hello world</Text></View>
     ////   <Text>Speech Babble</Text>
     //<Button>button</Button>
     //

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    
  },
  box: {
    flex: 0.25,
    backgroundColor: '#e3dfde',
    justifyContent: 'space-between',
    //alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
  pressed: {
    backgroundColor: '#a19e9d',

  }
});
    