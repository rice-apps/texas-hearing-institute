import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
//import ProgressBar from 'react-native-progress/Bar';
import * as Progress from 'react-native-progress';
import { StackNavigationProp } from '@react-navigation/stack';
import { Phoneme, PhonemeListProps, ReportInfo } from './types';
import { useNavigation } from '@react-navigation/core';
import { PracticeParamList } from './PracticeNavigator';

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

type StackNav = StackNavigationProp<PracticeParamList>;

export default function Active() {
	const navigation = useNavigation<StackNav>();
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
			<Progress.Bar
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
}

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
