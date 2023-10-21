import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';


const syllables = ["pee paw", "pee po", "pee pie", "the", "quick", "brown", "fox"];
const text = "pee paw";
export default function App() {
  return(
  <View style={[styles.container, 
    {
      flexDirection: 'column',
    }]}>
  <View style={[styles.backButton, 
    {
      flexDirection: 'column',
    }]}>
       <Pressable style={({ pressed }) => [
        styles.box, pressed? styles.pressed : styles.box
      ]}>
        <Text style={tw `text-2xl pt-2 pl-2`}>Back to Sound</Text>
      </Pressable>
      <View style={styles.practice}>
        <Text style={tw `text-2xl pt-2 pl-2`}>PRACTICE SYLLABLES</Text>
      </View>
  </View>

  <View style={[styles.buttonArea,
    {flexDirection:'row'}]}>
      <Pressable style={({ pressed }) => [
        styles.circleButton, {backgroundColor: "green"}, pressed? styles.pressed : styles.circleButton
      ]}>
        <Icon name="check" size={40} color="black"></Icon>
      </Pressable>
      <Pressable style={({ pressed }) => [
        styles.circleButton, {backgroundColor: "red"}, pressed? styles.pressed : styles.circleButton
      ]}>
       <Icon name="times" size={40} color="black"></Icon>
      </Pressable>
    </View>
  </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex:2.7,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    
  },
  buttonArea:{
    flex: 0.3,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',

  },
  box: {
    flex: 1,
    backgroundColor: '#e3dfde',
    justifyContent: 'space-between',
    marginTop: 20,
    borderRadius: 20,
  },
  backButton: {
    flex: 0.2,
    backgroundColor: "fffff",
    justifyContent: "flex-start",
    borderRadius: 20,
  },
  pressed: {
    backgroundColor: '#a19e9d',
  },
  circleButton: {
    borderRadius: 50,
    justifyContent: 'center',
    width: 70,
    height: 70,
    alignItems: "center",
    
  },
  practice:{
    flex:1,
    backgroundColor: 'red',
  }
});





//LOOK AT -TTS
// export default function App() {
//   return (
//     <View style={[styles.container, 
//     {
//       flexDirection: 'column',
//     }]}>
//       <Text style={tw`text-3xl font-bold underline pt-10`}>Good morning Bob!</Text>
//       <Text style={tw`text-2xl pt-6`}>Let's get practicing!</Text>
   
        
//       <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-2xl pt-2 pl-2`}>Speech</Text>
//         </Pressable>
        
       
//         <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-2xl pt-2 pl-2`}>Listening</Text>
//         </Pressable>

//        <Text style={tw `text-2xl pt-2 pl-2`}>Your practice summary</Text>
//        <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}></Pressable>
        
        
//       <StatusBar style="auto" />
      
//     </View>

//      //<View style={styles.container}><Text>Hello world</Text></View>
//      ////   <Text>Speech Babble</Text>
//      //<Button>button</Button>
//      //

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     //alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 20,
    
//   },
//   box: {
//     flex: 1,
//     backgroundColor: '#e3dfde',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     borderRadius: 20,
//   },
//   pressed: {
//     backgroundColor: '#a19e9d',

//   }
// });
