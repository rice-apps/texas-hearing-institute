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
   
        
      <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-2xl pt-2 pl-2`}>Speech</Text>
        </Pressable>
        
       
        <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-2xl pt-2 pl-2`}>Listening</Text>
        </Pressable>

       <Text style={tw `text-2xl pt-2 pl-2`}>Your practice summary</Text>
       <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}></Pressable>
        
        
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
    flex: 1,
    backgroundColor: '#e3dfde',
    justifyContent: 'space-between',
    marginTop: 20,
    borderRadius: 20,
  },
  pressed: {
    backgroundColor: '#a19e9d',

  }
});
