import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import ProgressBar from 'react-native-progress/Bar';
import { RootStackParamList } from './pages/Home/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Phoneme, PhonemeListProps, ReportInfo } from './pages/Home/types';
import { useNavigation } from '@react-navigation/core';

const { height, width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

const p1: Phoneme = { name: 'lol', correct: false };
const p2: Phoneme = { name: 'lmao', correct: false };
const p3: Phoneme = { name: 'rofl', correct: false };
const p4: Phoneme = { name: 'wtf', correct: false };
const p5: Phoneme = { name: 'omw', correct: false };
const p6: Phoneme = { name: 'ngl', correct: false };
const p7: Phoneme = { name: 'tbh', correct: false };

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

// export type RootStackParam = {
// 	phonemes: PhonemeListProps;
// 	report: ReportInfo;
//   };

// type Props = {
// 	navigation: ReportScreenNavigationProp;
// };

const Active = () => {
	//const cards = ['lol', 'lmao', 'rofl', 'wtf', 'omw', 'ngl','tbh'];
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const sampleCards = [p1, p2, p3, p4, p5, p6, p7];
	const sProps: PhonemeListProps = {
		phonemes: sampleCards,
		user: sampleReport.child,
	};
	const [progress, setProgress] = useState(0);
	const [isSwipedRight, setIsSwipedRight] = useState(false);
	const [isSwipedLeft, setIsSwipedLeft] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleOnSwiped = (index: number) => {
		const newProgress = ((index + 1) / sampleCards.length) * 100;
		setProgress(newProgress);
		setCurrentIndex(index + 1);
		setIsSwipedRight(false); // reset swipe state
		setIsSwipedLeft(false);
	};

	const handleOnSwipedRight = (index: number) => {
		sampleCards[index].correct = true;
		console.log(sampleCards[index]);
		setIsSwipedRight(true);
		setIsSwipedLeft(false); // Reset isSwipedLeft
	};

	const handleOnSwipedLeft = (index: number) => {
		// sampleCards[index].correct = false;
		console.log(sampleCards[index]);
		setIsSwipedLeft(true);
		setIsSwipedRight(false); // Reset isSwipedRight
	};

	return (
		<View style={styles.container}>
			<ProgressBar
				progress={progress / 100}
				width={Dimensions.get('window').width - 40} //same width as card
				color="#2196F3"
				style={{ marginRight: 10 }}
			/>
			<Text>{`${currentIndex} / ${sampleCards.length}`}</Text>
			<View style={styles.swiperContainer}>
				<Swiper
					cards={sampleCards.map((phoneme) => phoneme.name)}
					renderCard={(card) => (
						<View
							style={[
								styles.card,
								isSwipedRight && styles.greenBorder,
								isSwipedLeft && styles.yellowBorder,
							]}
						>
							<Text style={styles.text}>{card}</Text>
						</View>
					)}
					onSwiped={(index) => handleOnSwiped(index)}
					onSwipedAll={() => {
						//after all cards are seen, navigate to report screen
						navigation.navigate('ReportScreen', {
							phonemes: sProps,
							report: sampleReport,
						});
						console.log('All cards have been swiped');
					}}
					onSwipedRight={handleOnSwipedRight}
					onSwipedLeft={handleOnSwipedLeft}
					backgroundColor="#F5F5F5" // background outside card
					stackSize={3}
				/>
			</View>
			<View style={styles.swipeTextContainer}>
				<Text style={styles.swipeText}>
					Swipe right to mark{' '}
					<Text style={{ fontWeight: 'bold', color: '#34A853' }}>CORRECT</Text>
				</Text>
				<Text style={styles.swipeText}>
					Swipe left to mark{' '}
					<Text style={{ fontWeight: 'bold', color: '#FBBC05' }}>
						STILL LEARNING
					</Text>
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		paddingTop: 50,
	},
	swiperContainer: {
		flex: 1,
		width: CARD_WIDTH,
		height: height * 0.6,
		backgroundColor: 'black',
	},
	card: {
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 10,
		borderWidth: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 30,
	},
	swipeTextContainer: {
		alignItems: 'center',
	},
	swipeText: {
		textAlign: 'center',
	},
	greenBorder: {
		borderColor: '#34A853', // Change border color to green when swipe right
	},
	yellowBorder: {
		borderColor: '#FBBC05', // Change border color to yellow when swipe left
	},
});

export default Active;

//old stuff from before:
// import { StatusBar } from 'expo-status-bar';
// import { Pressable, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
// import Constants from 'expo-constants';
// import tw from 'tailwind-react-native-classnames';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import React, { useState } from 'react';
// import PropTypes from 'prop-types'
// import * as Speech from 'expo-speech';
// import PracticeCard from './components/PracticeCard';
// // import Swiper from 'react-native-swiper';
// import Swiper from 'react-native-dynamic-deck-swiper';

// //REACT NATIVE DECK SWIPER NEXT STEPS
// /**
//  * HANDLING ACTIVE PRACTICE USING CARD APPROACH
//  * 1. create card component (PracticeCard.tsx)
//  * 2. create array of phonemes in Active.tsx
//  * 3. change card and phoneme any time the green or red button is clicked
//  *      -update progress bar
//  *      -update text-to-speech
//  *      -update number correct, number incorrect
//  *  Changing card
//  *    - send event from card component whenever green/red button is clicked
//  *    - once event received in active, update progress bar in function
//  *    - update number of correct, number of incorrect
//  *
//  */

// export default function Active() {

//   <ProgressBar height={10} progress={30}>
//   </ProgressBar>
//   const thingToSay = 'pee paw';
//   const speak = (text: string) => {
//     Speech.speak(text, { rate: 1, pitch: 1, volume: 1 });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.progressBar}>
//       </View>
//       <Text style={styles.text3}>0%</Text>
//       <StatusBar style="auto" />
//       <View style={[styles.closeButton,
//       {
//         flexDirection: 'column',
//         display: 'flex',
//         justifyContent: 'center', alignItems: 'center',
//       }]}>
//         <Pressable style={({ pressed }) => [
//           styles.box, pressed ? styles.pressed : styles.box
//         ]}>
//           <Icon style={tw`p-5`} name="close" size={25} color="black">
//           </Icon>
//         </Pressable>
//       </View>
//       <PracticeCard phoneme='hi'></PracticeCard>
//     </View>

//   )
// }
// interface Props {
//   progress: number;
//   height: number;
// }
// const ProgressBar: React.FC<Props> = ({ progress, height }) => {
//   return (
//     <View style={[styles.backBar, {
//       height: height,
//       borderRadius: height / 2,
//       width: '100%',
//       backgroundColor: '#D9D9D9'
//     }]}>
//       <View style={[styles.frontBar, {
//         width: `${progress}%`,
//         borderRadius: height / 2,
//         backgroundColor: '#AFE4F9'
//       }]} />
//     </View>
//   );
// };

// //OLD PROGRESS BAR
// // const ProgressBar = ({ progress }: { progress: number }) => {
// //   const [currProgress, setProgress] = useState(0);

// //   const increaseProgress = () => {
// //     if (progress < 100) {
// //       setProgress(progress + 10);
// //     }
// //   };
// //   return (
// //     <View>
// //       <Text>React Progress Bar</Text>
// //       <ProgressBar progress={progress} />
// //       <button onClick={increaseProgress}>Increase Progress</button>
// //     </View>
// //   );
// // };

// const MySwiperComponent = () => {
//   return (
//     <Swiper style={styles.wrapper} showsButtons={true}>
//       {/* card 1*/}
//       <View style={styles.slide}>
//         <Text style={styles.text}>Slide 1</Text>
//       </View>

//       {/* Slide 2 */}
//       <View style={styles.slide}>
//         <Text style={styles.text}>Slide 2</Text>
//       </View>

//       {/* Slide 3 */}
//       <View style={styles.slide}>
//         <Text style={styles.text}>Slide 3</Text>
//       </View>

//       {/* EMPTY SLIDE */}
//       <View>
//         <Text>Summary of results</Text>
//         {/* link this to the library of */}
//       </View>

//     </Swiper>
//   );
// };
// export {MySwiperComponent};

// /// SWIPER EXAMPLE CODE, DOESN'T WORK THO LOL
// //   render () {
// //     <View style={styles.container}>
// //         <Swiper
// //             cards={['pee', 'paw', 'lol']}
// //             renderCard={(card) => {
// //                 return (
// //                     <View style={styles.card}>
// //                         <Text style={styles.text}>{card}</Text>
// //                     </View>
// //                 )
// //             }}
// //             onSwiped={(cardIndex) => {console.log(cardIndex)}}
// //             onSwipedAll={() => {console.log('onSwipedAll')}}
// //             cardIndex={0}
// //             backgroundColor={'#4FD0E9'}
// //             stackSize= {3}>
// //             <Button
// //                 onPress={() => {console.log('oulala')}}
// //                 title="Press me">
// //                 You can press me
// //             </Button>
// //         </Swiper>
// //     </View>
// // }

// const styles = StyleSheet.create({
//   backBar: {
//     overflow: 'hidden',
//   },
//   frontBar: {
//     height: '100%',
//   },
//   container: {
//     flex: 1.5,
//     backgroundColor: '#fff',
//     justifyContent: 'space-between',
//     padding: 20,
//     marginTop: 20,

//   },

//   box: {
//     flex: 1,
//     backgroundColor: '#e3dfde',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     borderRadius: 20,
//   },
//   closeButton: {
//     display: 'flex',
//     flex: 0.2,
//     width: 60,
//     height: 70,
//     backgroundColor: "fffff",
//     borderRadius: 40,
//     alignItems: 'center',

//   },
//   pressed: {

//     backgroundColor: 'black',
//     color: 'white',
//   },

//   progressBar: {
//     width: '100%',
//     height: 20,
//     backgroundColor: '#fff',
//     borderWidth: 3,
//     borderRadius: 8,
//     borderColor: '#555',
//     flexDirection: "row"
//   },

//   text3: {
//     fontSize: 18
//   },

//   // SWIPER STUFF  ===
//   wrapper: {
//     //style for swiper container
//     flex: 1,
//   },
//   slide: {
//     // style for each slide
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#9DD6EB',
//   },
//   text: {
//     //style for text within each slide
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: 'bold',
//   },
//   //END OF SWIPER STUFF ===

// });

//import { StatusBar } from 'expo-status-bar';
// import { Pressable, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
// import Constants from 'expo-constants';
// import tw from 'tailwind-react-native-classnames';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import React, { useState } from 'react';
// import PropTypes from 'prop-types'
// import * as Speech from 'expo-speech';
// import PracticeCard from './components/PracticeCard';
// // import Swiper from 'react-native-swiper';
// import Swiper from 'react-native-dynamic-deck-swiper';

// //REACT NATIVE DECK SWIPER NEXT STEPS
// /**
//  * HANDLING ACTIVE PRACTICE USING CARD APPROACH
//  * 1. create card component (PracticeCard.tsx)
//  * 2. create array of phonemes in Active.tsx
//  * 3. change card and phoneme any time the green or red button is clicked
//  *      -update progress bar
//  *      -update text-to-speech
//  *      -update number correct, number incorrect
//  *  Changing card
//  *    - send event from card component whenever green/red button is clicked
//  *    - once event received in active, update progress bar in function
//  *    - update number of correct, number of incorrect
//  *
//  */

// export default function Active() {

//   <ProgressBar height={10} progress={30}>
//   </ProgressBar>
//   const thingToSay = 'pee paw';
//   const speak = (text: string) => {
//     Speech.speak(text, { rate: 1, pitch: 1, volume: 1 });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.progressBar}>
//       </View>
//       <Text style={styles.text3}>0%</Text>
//       <StatusBar style="auto" />
//       <View style={[styles.closeButton,
//       {
//         flexDirection: 'column',
//         display: 'flex',
//         justifyContent: 'center', alignItems: 'center',
//       }]}>
//         <Pressable style={({ pressed }) => [
//           styles.box, pressed ? styles.pressed : styles.box
//         ]}>
//           <Icon style={tw`p-5`} name="close" size={25} color="black">
//           </Icon>
//         </Pressable>
//       </View>
//       <PracticeCard phoneme='hi'></PracticeCard>
//     </View>

//   )
// }
// interface Props {
//   progress: number;
//   height: number;
// }
// const ProgressBar: React.FC<Props> = ({ progress, height }) => {
//   return (
//     <View style={[styles.backBar, {
//       height: height,
//       borderRadius: height / 2,
//       width: '100%',
//       backgroundColor: '#D9D9D9'
//     }]}>
//       <View style={[styles.frontBar, {
//         width: `${progress}%`,
//         borderRadius: height / 2,
//         backgroundColor: '#AFE4F9'
//       }]} />
//     </View>
//   );
// };

// //OLD PROGRESS BAR
// // const ProgressBar = ({ progress }: { progress: number }) => {
// //   const [currProgress, setProgress] = useState(0);

// //   const increaseProgress = () => {
// //     if (progress < 100) {
// //       setProgress(progress + 10);
// //     }
// //   };
// //   return (
// //     <View>
// //       <Text>React Progress Bar</Text>
// //       <ProgressBar progress={progress} />
// //       <button onClick={increaseProgress}>Increase Progress</button>
// //     </View>
// //   );
// // };

// const MySwiperComponent = () => {
//   return (
//     <Swiper style={styles.wrapper} showsButtons={true}>
//       {/* card 1*/}
//       <View style={styles.slide}>
//         <Text style={styles.text}>Slide 1</Text>
//       </View>

//       {/* Slide 2 */}
//       <View style={styles.slide}>
//         <Text style={styles.text}>Slide 2</Text>
//       </View>

//       {/* Slide 3 */}
//       <View style={styles.slide}>
//         <Text style={styles.text}>Slide 3</Text>
//       </View>

//       {/* EMPTY SLIDE */}
//       <View>
//         <Text>Summary of results</Text>
//         {/* link this to the library of */}
//       </View>

//     </Swiper>
//   );
// };
// export {MySwiperComponent};

// /// SWIPER EXAMPLE CODE, DOESN'T WORK THO LOL
// //   render () {
// //     <View style={styles.container}>
// //         <Swiper
// //             cards={['pee', 'paw', 'lol']}
// //             renderCard={(card) => {
// //                 return (
// //                     <View style={styles.card}>
// //                         <Text style={styles.text}>{card}</Text>
// //                     </View>
// //                 )
// //             }}
// //             onSwiped={(cardIndex) => {console.log(cardIndex)}}
// //             onSwipedAll={() => {console.log('onSwipedAll')}}
// //             cardIndex={0}
// //             backgroundColor={'#4FD0E9'}
// //             stackSize= {3}>
// //             <Button
// //                 onPress={() => {console.log('oulala')}}
// //                 title="Press me">
// //                 You can press me
// //             </Button>
// //         </Swiper>
// //     </View>
// // }

// const styles = StyleSheet.create({
//   backBar: {
//     overflow: 'hidden',
//   },
//   frontBar: {
//     height: '100%',
//   },
//   container: {
//     flex: 1.5,
//     backgroundColor: '#fff',
//     justifyContent: 'space-between',
//     padding: 20,
//     marginTop: 20,

//   },

//   box: {
//     flex: 1,
//     backgroundColor: '#e3dfde',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     borderRadius: 20,
//   },
//   closeButton: {
//     display: 'flex',
//     flex: 0.2,
//     width: 60,
//     height: 70,
//     backgroundColor: "fffff",
//     borderRadius: 40,
//     alignItems: 'center',

//   },
//   pressed: {

//     backgroundColor: 'black',
//     color: 'white',
//   },

//   progressBar: {
//     width: '100%',
//     height: 20,
//     backgroundColor: '#fff',
//     borderWidth: 3,
//     borderRadius: 8,
//     borderColor: '#555',
//     flexDirection: "row"
//   },

//   text3: {
//     fontSize: 18
//   },

//   // SWIPER STUFF  ===
//   wrapper: {
//     //style for swiper container
//     flex: 1,
//   },
//   slide: {
//     // style for each slide
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#9DD6EB',
//   },
//   text: {
//     //style for text within each slide
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: 'bold',
//   },
//   //END OF SWIPER STUFF ===

// });
