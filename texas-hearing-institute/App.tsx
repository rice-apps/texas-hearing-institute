
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import Constants from 'expo-constants';
//import { Button } from 'react-native-elements';
// import { NativeRouter, Route, Link } from "react-router-native";
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Speech from 'expo-speech';
import PracticeCard from './components/PracticeCard';
import ProgressBar from './components/ProgressBar';   // problem bc not working on main branch 


/**
 * HANDLING ACTIVE PRACTICE USING CARD APPROACH
 * 1. create card component (PracticeCard.tsx)
 * 2. create array of phonemes in Active.tsx
 * 3. change card and phoneme any time the green or red button is clicked
 *      -update progress bar
 *      -update text-to-speech
 *      -update number correct, number incorrect
 *  Changing card
 *    - send event from card component whenever green/red button is clicked
 *    - once event received in active, update progress bar in function
 *    - update number of correct, number of incorrect
 * 
 */

interface Props {
	progress: number;
	height: number;
}
const ProgressBar: React.FC<Props> = ({ progress, height }) => {
	return (
		<View
			style={[
				styles.backBar,
				{
					height: height,
					borderRadius: height / 2,
					width: '100%',
				},
			]}
		>
			<View
				style={[
					styles.frontBar,
					{
						width: `${progress}%`,
						borderRadius: height / 2,
					},
				]}
			/>
		</View>
	);
};

export default function App() {
  <ProgressBar height={10} progress={30}>
  </ProgressBar>
  const thingToSay = 'pee paw';
  const phonemes = [ 
    "pee paw", "bay", "slaw", "lug", "loon",
  ];
  const speak = (text:string) => {
    Speech.speak(text, { rate: 1, pitch: 1, volume: 1 });
  };

    return(
    <View style={styles.container}>
    <View style={styles.progressBar}>
    </View>
    <Text style={styles.text3}>0%</Text>
      <StatusBar style="auto" />
    <View style = {[styles.closeButton, 
          {flexDirection:'column',
          display: 'flex', 
          justifyContent: 'center',alignItems:'center',}]}>
        <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Icon style={tw `p-5`} name="close" size={25} color="black">
            </Icon>  
        </Pressable>
    </View>
    <PracticeCard phoneme='hi'></PracticeCard>  

    </View>
    



  
    )
  }
  // export default ProgressBar;

  
  

  // const AudioButton = ({someText}: {someText:string}) => {
  //   const [isPlaying, setIsPlaying] = useState(false);
  
  //   const startPlay = () => {
  //     //TODO fix button functionality
  //     setIsPlaying(!isPlaying);
  //     Speech.speak(someText);
  //     setIsPlaying(isPlaying)
  //     // add logic to play/pause audio here
  
  //   };
  
  //   return (
  //     //  TEXT TO SPEECH BUTTON==================================================
  //     <View>
  //       <Pressable style={({ pressed }) => [
  //         styles.circleButton, {backgroundColor: "#cfcdcc", width:40, height:40}, pressed? styles.pressed : styles.circleButton
  //       ]} onPress={startPlay}>
  //         <Icon
  //           name={isPlaying ? 'pause' : 'play'}
  //           size={20}
  //           color="black"
  //         />
  //       </Pressable>
  //     </View>
      
  //   );
  // };

  // const newPrgressBar = 

  // const ProgressBar = ({ progress }: { progress: number }) => {
  //   const [currProgress, setProgress] = useState(0);

  //   const increaseProgress = () => {
  //     if (progress < 100) {
  //       setProgress(progress + 10);
  //     }
  //   };
  //   return (
  //     <View>
  //       <Text>React Progress Bar</Text>
  //       <ProgressBar progress={progress} />
  //       <button onClick={increaseProgress}>Increase Progress</button>
  //     </View>
  //   );
  // };
  
  const styles = StyleSheet.create({
    container: {
      flex:1.5,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      padding: 20,
      marginTop: 20,
      
    },
    backBar: {
		backgroundColor: '#D9D9D9',
		overflow: 'hidden',
	},
	frontBar: {
		height: '100%',
		backgroundColor: '#000',
	},

    // buttonArea:{
    //   flex: 2,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   alignContent: 'space-around',
  
    // },
    // practiceArea:{
    //   flex:3,
    //   justifyContent: 'center',
      
    // },
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
      color: 'white',
    },
    // circleButton: {
    //   borderRadius: 50,
    //   justifyContent: 'center',
    //   marginHorizontal: 40,
    //   alignContent: 'space-around',
    //   alignItems: "center",
      
    // },
    // practice:{
    //   flex:1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
                // progressBar: {
                //   width: '100%',
                //   height: 20,
                //   backgroundColor: '#fff',
                //   borderWidth: 3,
                //   borderRadius: 8,
                //   borderColor: '#555',
                //   flexDirection:"row"
                // },
    // text1: {
    //   fontSize: 34
    // },
    // text2: {
    //   fontSize: 22,
    // },
    text3: {
      fontSize: 18
    },
  });




// const syllables = ["pee paw", "pee po", "pee pie", "the", "quick", "brown", "fox"];
// const text = "pee paw";
// /*
// TODO: custom audio button
// link to consonants page
// text-to-speech
// track correct/incorrect answers
// */

// export default function Active() {
//   const thingToSay = 'pee paw';
//   // const speak = (text:string) => {
//   //   Speech.speak(text, { rate: 1, pitch: 1, volume: 1 });
//   // };

//     return(
      
//     <View style={[styles.container, 
//       {
//         flexDirection: 'column',
//       }]}>
//         {/* PROGRESS AREA ==================================================*/}
//         <View style={styles.container}>
//           <View style={[styles.container, 
//           {flexDirection: 'row',
//             alignContent:'space-between',
//             // backgroundColor: 'red',

//           }]}>
//       <Text style={styles.text2}>
//         1/20
//       </Text>

//       {/* X BUTTON ==================================================*/}
//       <View style = {[styles.closeButton, 
//           {flexDirection:'column',
//           display: 'flex', 
//           justifyContent: 'center',alignItems:'center',}]}>
//         <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Icon style={tw `p-5`} name="close" size={25} color="black">
//             </Icon>  
//         </Pressable>
//         </View>
//         </View>
//       <View style={styles.progressBar}>
//       </View>
      

      
//       <Text style={styles.text3}>0%</Text>
//       </View>
//       <StatusBar style="auto" />
    


//     <View style={[styles.practiceArea, 
//       {
//         flexDirection: 'column',
//       }]}>
        
//         <View style={[styles.practice, {flexDirection: 'row',}]}>
//             <Text style={tw `text-3xl pt-6`}>Pee Paw</Text> 
//           <AudioButton someText={text}></AudioButton> 
//             {/* set timer 2 seconds to change icon back */}
    
//         </View>
//     </View>
//       {/* GREEN CHECK AND RED X BUTTONS================================================== */}
//     <View style={[styles.buttonArea,
//       {flexDirection:'row',
//       alignContent: 'space-around'}]}>
//         <Pressable style={({ pressed }) => [
//           styles.circleButton, {backgroundColor: "green", width:80, height:80}, pressed? styles.pressed : styles.circleButton
//         ]}>
//           <Icon name="check" size={40} color="black"></Icon>
//         </Pressable>
//         <Pressable style={({ pressed }) => [
//           styles.circleButton, {backgroundColor: "red", width:80, height:80}, pressed? styles.pressed : styles.circleButton
//         ]}>
//          <Icon name="times" size={40} color="black"></Icon>
//         </Pressable>
//       </View>
//     </View>
  
//     )
//   }

//   // function switchCard() {
//   //   const cardRef = useRef();
//   // }
  

//   const AudioButton = ({someText}: {someText:string}) => {
//     const [isPlaying, setIsPlaying] = useState(false);
  
//     const startPlay = () => {
//       //TODO fix button functionality
//       setIsPlaying(!isPlaying);
//       Speech.speak(someText);
//       setIsPlaying(isPlaying)
//       // add logic to play/pause audio here
  
//     };
  
//     return (
//       //  TEXT TO SPEECH BUTTON==================================================
//       <View>
//         <Pressable style={({ pressed }) => [
//           styles.circleButton, {backgroundColor: "#cfcdcc", width:40, height:40}, pressed? styles.pressed : styles.circleButton
//         ]} onPress={startPlay}>
//           <Icon
//             name={isPlaying ? 'pause' : 'play'}
//             size={20}
//             color="black"
//           />
//         </Pressable>
//       </View>
      
//     );
//   };
//   const ProgressBar = ({ progress }: { progress: number }) => {
//     const [currProgress, setProgress] = useState(0);

//     const increaseProgress = () => {
//       if (progress < 100) {
//         setProgress(progress + 10);
//       }
//     };
//     return (
//       <View>
//         <Text>React Progress Bar</Text>
//         <ProgressBar progress={progress} />
//         <button onClick={increaseProgress}>Increase Progress</button>
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex:1.5,
//       backgroundColor: '#fff',
//       justifyContent: 'space-between',
//       padding: 20,
//       marginTop: 20,
      
//     },
//     buttonArea:{
//       flex: 2,
//       justifyContent: 'center',
//       alignItems: 'center',
//       alignContent: 'space-around',
  
//     },
//     practiceArea:{
//       flex:3,
//       justifyContent: 'center',
      
//     },
//     box: {
//       flex: 1,
//       backgroundColor: '#e3dfde',
//       justifyContent: 'space-between',
//       marginTop: 20,
//       borderRadius: 20,
//     },
//     closeButton: {
//       display: 'flex', 
//       flex: 0.2,
//       width: 60,
//       height: 70,
//       backgroundColor: "fffff",
//       borderRadius: 40,
//       alignItems: 'center',
      
//     },
//     pressed: {
    
//       backgroundColor: 'black',
//     },
//     circleButton: {
//       borderRadius: 50,
//       justifyContent: 'center',
//       marginHorizontal: 40,
//       alignContent: 'space-around',
//       alignItems: "center",
      
//     },
//     practice:{
//       flex:1,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     progressBar: {
//       width: '100%',
//       height: 20,
//       backgroundColor: '#fff',
//       borderWidth: 3,
//       borderRadius: 8,
//       borderColor: '#555',
//       flexDirection:"row"
//     },
//     text1: {
//       fontSize: 34
//     },
//     text2: {
//       fontSize: 22,
//     },
//     text3: {
//       fontSize: 18
//     },
//   });








// // //APP STUFF===============================================================================================================
// import { StatusBar } from 'expo-status-bar';
// import { Pressable, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
// import Constants from 'expo-constants';
// import { NavigationContainer } from '@react-navigation/native';
// //import { Button } from 'react-native-elements';
// import tw from 'tailwind-react-native-classnames';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import React, { useState } from 'react';

// import PropTypes from 'prop-types';
// import * as Speech from 'expo-speech';
// import PracticeCard from './components/PracticeCard';
// import 

// // import ProgressBar from "../Progress";
// /*
// TODO: custom audio button
// link to consonants page
// text-to-speech
// track correct/incorrect answers
// */

// export default function App() {
//   return (
//     <NavigationContainer>{
//     <View style={[styles.container, 
//     {
//       flexDirection: 'column',
//     }]}>
//       <Text style={tw`text-3xl font-bold pt-10`}>Good morning Bob!</Text>
//       <Text style={tw`text-base pt-6`}>Let's get practicing!</Text>
   
//       <Icon style={tw `p-5`} name="circle" size={25} color="black">
//       <Text style={tw`text-2xl font-bold pt-6`}>  Speech Babble</Text>
//             </Icon>
      
//       <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Vowels</Text>
//       </Pressable>
        
//       <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Initial Consonants</Text>
//       </Pressable> 
//         <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Final Consonants</Text>
//         </Pressable>

//         <Icon style={tw `p-5`} name="circle" size={25} color="black">
//       <Text style={tw`text-2xl font-bold pt-6 mx-5 mt-1`}>  Listening Babble</Text>
//             </Icon>
//        <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Variegated Vowels</Text>
//         </Pressable>
//         <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Voicing</Text>
//         </Pressable>
//         <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Manner</Text>
//         </Pressable>
//         <Pressable style={({ pressed }) => [
//           styles.box, pressed? styles.pressed : styles.box
//         ]}>
//           <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Place Cue</Text>
//         </Pressable>
        
        
//       <StatusBar style="auto" />
      
//     </View>

//      //<View style={styles.container}><Text>Hello world</Text></View>
//      ////   <Text>Speech Babble</Text>
//      //<Button>button</Button>
//      //

//     }</NavigationContainer>);
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
// }
// );
    