import { StatusBar } from 'expo-status-bar';
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Button,
} from 'react-native';
import Constants from 'expo-constants';
//import { Button } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Speech from 'expo-speech';
import PracticeCard from './components/PracticeCard';
import SpeechNavigation from './pages/SpeechSetup/SpeechNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InitialConsonants from './pages/SpeechSetup/InitialConsonants';
import PlaceCueTab from './pages/listening-settings/tabs/PlaceCueTab';
import MannerScreen from './pages/listening-settings/tabs/MannerScreen';
import VarVowelsScreen from './pages/listening-settings/tabs/VarVowelsScreen';
import VoicingScreen from './pages/listening-settings/tabs/VoicingScreen';
import ReportScreen from './pages/ReportScreen';
import Home from './pages/Home/Home';
import {
	RootStackParamList,
	PhonemeListProps,
	ReportInfo,
} from './pages/Home/types';
import { Phoneme } from './pages/Home/types';

// type RootStackParamList = {
//   Home: undefined, // undefined because you aren't passing any params to the home screen
//   InitialConsonants: { name: string };
//   PlaceCueTab: undefined;
//   VariegatedVowels: undefined;
//   Manner: undefined;
//   Voicing: undefined;
// };

const Stack = createStackNavigator<RootStackParamList>();
const [phonemes, setPhonemes] = useState<PhonemeListProps>();
const [report, setReport] = useState<ReportInfo>();

const sampleReport: ReportInfo = {
	child: 'Bob',
	createdAt: 'uhhh',
	type: 'idk',
	subtype: 'idk',
	sound: 'string',
	mode: 'string',
	voweltype: 'string',
	combinations: ['a', 'x', 'b'],
	numSyllables: 5,
	correct: [false, false, false],
};

const p1: Phoneme = { name: 'lol', correct: false };
const p2: Phoneme = { name: 'lmao', correct: false };
const p3: Phoneme = { name: 'rofl', correct: false };
const p4: Phoneme = { name: 'wtf', correct: false };
const p5: Phoneme = { name: 'omw', correct: false };
const p6: Phoneme = { name: 'ngl', correct: false };
const p7: Phoneme = { name: 'tbh', correct: false };
const sampleCards: Phoneme[] = [p1, p2, p3, p4, p5, p6, p7];

export default function App() {
	const sampleCards = [p1, p2, p3, p4, p5, p6, p7];
	const sProps: PhonemeListProps = {
		phonemes: sampleCards,
		user: sampleReport.child,
	};
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="InitialConsonants" component={InitialConsonants} />
				<Stack.Screen name="PlaceCueTab" component={PlaceCueTab} />
				<Stack.Screen name="VariegatedVowels" component={VarVowelsScreen} />
				<Stack.Screen name="Manner" component={MannerScreen} />
				<Stack.Screen name="Voicing" component={VoicingScreen} />
				<Stack.Screen
					name="ReportScreen"
					component={() => (
						<ReportScreen phonemes={sampleCards} report={sampleReport} />
					)}
				/>
				{/* <Stack.Screen name="ReportScreen" component={ReportScreen} /> */}
				{/* <Stack.Screen 
          name="ReportScreen" 
          component={() => <ReportScreen phonemes={{phonemes:[]}} report={report} />} 
        /> */}
				{/* <Stack.Screen 
          name="ReportScreen" 
          component={() => <ReportScreen phonemes={[]} report={sampleReport} />} 
/> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import Swiper from 'react-native-deck-swiper';
// import ProgressBar from 'react-native-progress/Bar';
// import { RootStackParamList } from './pages/Home/types';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { Phoneme, PhonemeListProps, ReportInfo } from './pages/Home/types'

// const { height, width } = Dimensions.get('window');
// const CARD_WIDTH = width - 40;

// const p1: Phoneme = {name: 'lol', correct: false}
// const p2: Phoneme = {name: 'lmao', correct: false}
// const p3: Phoneme = {name: 'rofl', correct: false}
// const p4: Phoneme = {name: 'wtf', correct: false}
// const p5: Phoneme = {name: 'omw', correct: false}
// const p6: Phoneme = {name: 'ngl', correct: false}
// const p7: Phoneme = {name: 'tbh', correct: false}

// const sampleReport: ReportInfo = {
//   child: "Bob",
//   createdAt: "uhhh",
//   type: "idk",
//   subtype: "idk",
//   sound: "string",
//   mode: "string",
//   voweltype: "string",
//   combinations: ['a','x','b'],
//   numSyllables: 5,
//   correct: [false, false, false],
// }

// type ReportScreenNavigationProp = StackNavigationProp<RootStackParamList,
// 'ReportScreen'>;

// type Props = {
//   navigation: ReportScreenNavigationProp;
// };

// const App = ({navigation}: Props) => {
//   //const cards = ['lol', 'lmao', 'rofl', 'wtf', 'omw', 'ngl','tbh'];
//   const sampleCards = [p1, p2, p3, p4, p5, p6, p7];
//   const sProps: PhonemeListProps = { phonemes: sampleCards, user: sampleReport.child};
//   const [progress, setProgress] = useState(0);
//   const [isSwipedRight, setIsSwipedRight] = useState(false);
//   const [isSwipedLeft, setIsSwipedLeft] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleOnSwiped = (index: number) => {
//     const newProgress = ((index + 1) / sampleCards.length) * 100;
//     setProgress(newProgress);
//     setCurrentIndex(index + 1);
//     setIsSwipedRight(false); // reset swipe state
//     setIsSwipedLeft(false);

//   };

//   const handleOnSwipedRight = (index: number) => {
//     sampleCards[index].correct = true;
//     console.log(sampleCards[index]);
//     setIsSwipedRight(true);
//     setIsSwipedLeft(false); // Reset isSwipedLeft
//   };

//   const handleOnSwipedLeft = (index: number) => {
//     // sampleCards[index].correct = false;
//     console.log(sampleCards[index]);
//     setIsSwipedLeft(true);
//     setIsSwipedRight(false); // Reset isSwipedRight
//   }

//   return (
//     <View style={styles.container}>
//         <ProgressBar
//           progress={progress / 100}
//           width={Dimensions.get('window').width - 40} //same width as card
//           color="#2196F3"
//           style={{ marginRight: 10 }}
//         />
//         <Text>{`${currentIndex} / ${sampleCards.length}`}</Text>
//       <View style={styles.swiperContainer}>
//       <Swiper
//         cards={sampleCards.map(phoneme => phoneme.name)}
//         renderCard={(card) => (
//           <View style={[styles.card, isSwipedRight && styles.greenBorder, isSwipedLeft && styles.yellowBorder]}>
//             <Text style={styles.text}>{card}</Text>
//           </View>
//         )}
//         onSwiped={(index) => handleOnSwiped(index)}
//         onSwipedAll={() => {
//           //after all cards are seen, navigate to report screen
//           navigation.navigate('ReportScreen', { phonemes: {phonemes: sampleCards, user: sampleReport.child}, report: sampleReport })
//           console.log('All cards have been swiped');
//         }}
//         onSwipedRight={handleOnSwipedRight}
//         onSwipedLeft={handleOnSwipedLeft}
//         backgroundColor="#F5F5F5" // background outside card
//         stackSize={3}
//       />
//       </View>
//       <View style={styles.swipeTextContainer}>
//         <Text style={styles.swipeText}>Swipe right to mark <Text style={{ fontWeight: 'bold', color: '#34A853' }}>CORRECT</Text></Text>
//         <Text style={styles.swipeText}>Swipe left to mark <Text style={{ fontWeight: 'bold', color: '#FBBC05' }}>STILL LEARNING</Text></Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//     paddingTop: 50,
//   },
//   swiperContainer: {
//     flex: 1,
//     width: CARD_WIDTH,
//     height: height * 0.6,
//     backgroundColor: 'black',
//   },
//   card: {
//     flex: 1,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     borderWidth: 2,
//     justifyContent: 'center',
//     alignItems: 'center',

//   },
//   text: {
//     fontSize: 30,
//   },
//   swipeTextContainer: {
//     alignItems: 'center',
//   },
//   swipeText: {
//     textAlign: 'center',
//   },
//   greenBorder: {
//     borderColor: '#34A853', // Change border color to green when swipe right
//   },
//   yellowBorder: {
//     borderColor: '#FBBC05', // Change border color to yellow when swipe left
//   },
// });

// export default App;

// //SWIPE VERSION 2, this one logs swipe history
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Swiper from 'react-native-deck-swiper';
// import { useState } from 'react';

// const App = () => {
//   const cards = ['lol', 'lmao', 'rofl', 'wtf', 'omw', 'ngl','tbh'];
//   const [isSwipedRight, setIsSwipedRight] = useState(false);
//   const [isSwipedLeft, setIsSwipedLeft] = useState(false);

//   const handleOnSwipedRight = () => {
//     setIsSwipedRight(true);
//   };
//   const handleOnSwipedLeft = () => {
//     setIsSwipedLeft(true);
//   }
//   return (
//     <View style={styles.container}>
//       <Swiper
//         cards={cards}
//         renderCard={(card) => (
//           <View style={[styles.card, isSwipedRight && styles.greenBorder,
//           isSwipedLeft && styles.yellowBorder]}>
//             <Text style={styles.text}>{card}</Text>
//           </View>

//         )}
//         onSwiped={(cardIndex) => {
//           console.log(`Swiped card index: ${cardIndex}`);
//         }}
//         onSwipedAll={() => {
//           console.log('All cards have been swiped');
//         }}
//         // onSwipedRight={(cardIndex)=> {
//         //   console.log(`Swiped card index: ${cardIndex} RIGHT`)
//         // }}
//         onSwipedRight={handleOnSwipedRight}
//         onSwipedLeft={handleOnSwipedLeft}
//         //cardIndex={0}
//         backgroundColor="#F5F5F5" // background outside card
//         stackSize={3}
//       >
//       </Swiper>
//       <Text>Swipe right to mark <Text style={{ fontWeight: 'bold', color: '#34A853' }}>CORRECT</Text></Text>
//       <Text>Swipe left to mark <Text style={{ fontWeight: 'bold', color: '#FBBC05' }}>STILL LEARNING</Text></Text>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   card: {
//     flex: 0.4,
//     height: 200,
//     backgroundColor: 'white',
//     borderRadius: 10,

//     borderWidth: 2,
//     borderColor: 'lightgray',
//     // width: 200,
//     // length: 250,
//     //aspectRatio:0.9,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 30,
//   },
//   greenBorder: {
//     borderColor: '#34A853', // Change border color to green when swipe right
//   },
//   yellowBorder: {
//     borderColor: '#FBBC05', // Change border color to yellow when swipe left
//   },
// });

// export default App;
