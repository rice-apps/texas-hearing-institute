import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
//import { Button } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Speech from 'expo-speech';

// import ProgressBar from "../Progress";


const syllables = ["pee paw", "pee po", "pee pie", "the", "quick", "brown", "fox"];
const text = "pee paw";
/*
TODO: custom audio button
link to consonants page
text-to-speech
track correct/incorrect answers
*/

export default function App() {
  const thingToSay = 'pee paw';
  const speak = (text:string) => {
    Speech.speak(text, { rate: 1, pitch: 1, volume: 1 });
  };

    return(
    <View style={[styles.container, 
      {
        flexDirection: 'column',
      }]}>
    <View style={[styles.practiceArea, 
      {
        flexDirection: 'column',
      }]}>

        <View style = {[styles.closeButton, 
          {flexDirection:'row',
          display: 'flex', justifyContent: 'flex-end',}]}>
        <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Icon style={tw `p-5`} name="close" size={25} color="black">
            </Icon>  
        </Pressable>
        </View>
        <View style={[styles.practice, {flexDirection: 'row',}]}>
            <Text style={tw `text-3xl pt-6`}>Pee Paw</Text> 
          <AudioButton someText={syllables[0]}></AudioButton> 
            {/* set timer 2 seconds to change icon back */}
    
        </View>
    </View>
  
    <View style={[styles.buttonArea,
      {flexDirection:'row',
      alignContent: 'space-around'}]}>
        <Pressable style={({ pressed }) => [
          styles.circleButton, {backgroundColor: "green", width:80, height:80}, pressed? styles.pressed : styles.circleButton
        ]}>
          <Icon name="check" size={40} color="black"></Icon>
        </Pressable>
        <Pressable style={({ pressed }) => [
          styles.circleButton, {backgroundColor: "red", width:80, height:80}, pressed? styles.pressed : styles.circleButton
        ]}>
         <Icon name="times" size={40} color="black"></Icon>
        </Pressable>
      </View>
    </View>
  
    )
  }
  

  /*
  <Pressable style={({ pressed }) => [
  styles.circleButton, {width:40, height:40, backgroundColor: "gray"}, pressed? styles.pressed : styles.circleButton
  ]}></Pressable>  
  */

  const AudioButton = ({someText}: {someText:string}) => {
    const [isPlaying, setIsPlaying] = useState(false);
  
    const startPlay = () => {
      //TODO fix button functionality
      setIsPlaying(!isPlaying);
      Speech.speak(someText);
      setIsPlaying(isPlaying)
      // add logic to play/pause audio here
      
    };
  
    return (
      <View>
        <Pressable style={({ pressed }) => [
          styles.circleButton, {backgroundColor: "#cfcdcc", width:40, height:40}, pressed? styles.pressed : styles.circleButton
        ]} onPress={startPlay}>
          <Icon
            name={isPlaying ? 'pause' : 'play'}
            size={20}
            color="black"
          />
        </Pressable>
      </View>
      
    );
  };
  const ProgressBar = ({ progress }: { progress: number }) => {
    const [currProgress, setProgress] = useState(0);

    const increaseProgress = () => {
      if (progress < 100) {
        setProgress(progress + 10);
      }
    };
    return (
      <View>
        <Text>React Progress Bar</Text>
        <ProgressBar progress={progress} />
        <button onClick={increaseProgress}>Increase Progress</button>
      </View>
    );
  };

  

  // return <ProgressBar value={value} max = {100}/>
  
  // const ProgressBar = ({value, max}) => {
  //   const [value, setValue] = useState(0);
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setValue(oldValue => {
  //         const newValue = oldValue *10;
  //         if (newValue == 100){
  //           clearInterval(interval);
  //         }
  //         return newValue;
  //       });
  //     }, 1000);
  //   },[]);
  //   return (
  //     <progress value={value} max={max} />
  //   )
  // }

  // // return (
  // //   <ProgressBar value={40} max={100} />;
  // // );
  // }
  // ProgressBar.propTypes={
  //   value: PropTypes.number.isRequired,
  //   max: PropTypes.number,
  // }
  // ProgressBar.defaultProps = {
  //   max: 100,
  // }
  
  const styles = StyleSheet.create({
    container: {
      flex:2.7,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      padding: 20,
      marginTop: 20,
      
    },
    buttonArea:{
      flex: 2,
      //backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'space-around',
  
    },
    practiceArea:{
      flex:3,
      //backgroundColor: 'yellow',
      justifyContent: 'center',
      
    },
    box: {
      flex: 1,
      backgroundColor: '#e3dfde',
      justifyContent: 'space-between',
      marginTop: 20,
      borderRadius: 20,
    },
    closeButton: {
      display: 'flex', 
      flex: 0.2,
      width: 60,
      height: 70,
      backgroundColor: "fffff",
      borderRadius: 40,
      alignItems: 'center',
  
    },
    pressed: {
    
      backgroundColor: 'black',
    },
    circleButton: {
      borderRadius: 50,
      justifyContent: 'center',
      marginHorizontal: 40,
      alignContent: 'space-around',
      alignItems: "center",
      
    },
    practice:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      
      //backgroundColor: 'red',
    },
  });
  
  
  
  //   const progress = StyleSheet.create({
  //   progressContainerStyle:{
  //     width: 300,
  //     height: 20,
  //     borderRadius: 10,
  //     backgroundColor: '#e0e0e0',
  //     overflow: "hidden",
  //   },
  //   fillerStyle: {
  //     height: '100%',
  //     width: 50,
  //     backgroundColor: '#3498db',
  //   },
  //   progressText: {
  //     position: 'absolute',
  //     textAlign: 'center',
  //     lineHeight: 20,
  //     width: '100%',
  //     color: '#ffffff',
  //   },
  // });





// //APP STUFF===============================================================================================================
// import { StatusBar } from 'expo-status-bar';
// import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Button } from 'react-native-elements';
// import tw from 'tailwind-react-native-classnames';
// import Icon from 'react-native-vector-icons/FontAwesome';


// // LOOK AT -TTS
// export default function App() {
//   return (
//     <View style={[styles.container, 
//     {
//       flexDirection: 'column',
//     }]}>
//       <Text style={tw`text-3xl font-bold underline pt-10`}>Good morning Bob!</Text>
//       <Text style={tw`text-2xl pt-6`}>Let's get practicing!</Text>
   
//       <Icon style={tw `p-5`} name="circle" size={25} color="black">
//       <Text style={tw`text-2xl font-bold pt-6`}>Speech Babble</Text>
//             </Icon>
      
//       <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-2xl pt-2 pl-2`}>Vowels</Text>
//       </Pressable>
        
//       <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-2xl pt-2 pl-2`}>Initial Consonants</Text>
//       </Pressable> 
//         <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-2xl pt-2 pl-2`}>Final Consonants</Text>
//         </Pressable>

//         <Icon style={tw `p-5`} name="circle" size={25} color="black">
//       <Text style={tw`text-2xl font-bold pt-6`}>Listening Babble</Text>
//             </Icon>
//        <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-2xl pt-2 pl-2`}>Variegated Vowels</Text>
//         </Pressable>
//         <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-2xl pt-2 pl-2`}>Voicing</Text>
//         </Pressable>
//         <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-2xl pt-2 pl-2`}>Manner</Text>
//         </Pressable>
//         <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-2xl pt-2 pl-2`}>Place Cue</Text>
//         </Pressable>
        
        
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
//     flex: 0.25,
//     backgroundColor: '#e3dfde',
//     justifyContent: 'space-between',
//     //alignItems: 'center',
//     marginTop: 20,
//     borderRadius: 20,
//   },
//   pressed: {
//     backgroundColor: '#a19e9d',

//   }
// });
    