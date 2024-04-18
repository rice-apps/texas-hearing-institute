import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Bar as ProgressBar } from 'react-native-progress';
import { StackNavigationProp } from '@react-navigation/stack';
import { PracticeResult } from './types';
import { useNavigation } from '@react-navigation/core';
import { PracticeParamList } from './PracticeNavigator';
import { SvgXml } from 'react-native-svg';
import volume from '../icons/volume';
import { playSound } from '../utils/audio';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';
import { UserContext, UserContextType } from '../user/UserContext';

const { height, width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

type StackNav = StackNavigationProp<PracticeParamList>;

type Props = NativeStackScreenProps<PracticeParamList, 'ActivePractice'>;

// let report: Array<PracticeResult> = [];

export default function Active({ route }: Props) {
	const { settings, phonemes } = route.params;

	const navigation = useNavigation<StackNav>();

	const { user } = useContext(UserContext) as UserContextType;
	const [progress, setProgress] = useState(0);
	const [isSwipedRight, setIsSwipedRight] = useState(false);
	const [isSwipedLeft, setIsSwipedLeft] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [report, setReport] = useState<PracticeResult[]>([]);
	let lastRes: PracticeResult;

	const handleOnSwiped = (i: number) => {
		const newProgress = ((i + 1) / phonemes.length) * 100;
		setProgress(newProgress);
		setCurrentIndex(i + 1);
	};

	const handleOnSwipedRight = (i: number) => {
		setReport([...report, { phonemes: phonemes[i], correct: true }]);
		lastRes = { phonemes: phonemes[i], correct: true };
		setIsSwipedRight(true);
		setIsSwipedLeft(false);
	};

	const handleOnSwipedLeft = (i: number) => {
		setReport([...report, { phonemes: phonemes[i], correct: false }]);
		lastRes = { phonemes: phonemes[i], correct: false };
		setIsSwipedLeft(true);
		setIsSwipedRight(false);
	};

	const handleReportEntry = async (results: PracticeResult[]) => {
		const { error } = await supabase.from('reports').insert({
			child: user.getId(),
			created_at: new Date().toISOString(),
			type: settings.type,
			subtype: settings.subtype,
			mode: settings.mode,
			target: settings.target,
			voweltype: settings.vowels,
			num_syllables: settings.syllables,
			syllables: results.map((p: PracticeResult) => p.phonemes.join(' ')),
			results: results.map((p: PracticeResult) => p.correct),
		});
		if (error) {
			console.log(error);
			// alert(error);
		}
	};

	return (
		<View style={styles.container}>
			<ProgressBar
				progress={progress / 100}
				width={Dimensions.get('window').width - 40} //same width as card
				color="#2196F3"
				style={{ marginRight: 10 }}
			/>
			<Text>{`${currentIndex} / ${phonemes.length}`}</Text>
			<View style={styles.swiperContainer}>
				<Swiper
					cards={phonemes}
					renderCard={(card) => (
						<View
							style={[
								styles.card,
								isSwipedRight && styles.greenBorder,
								isSwipedLeft && styles.yellowBorder,
							]}
						>
							<Text style={styles.text}>
								{card.map((ph) => {
									return ph + ' ';
								})}
							</Text>
							<Pressable
								style={{
									backgroundColor: '#EBEBEB',
									padding: 10,
									height: 38,
									width: 38,
									borderRadius: 25,
									flexDirection: 'row',
									flexWrap: 'wrap',
									justifyContent: 'center',
									gap: 10,
								}}
								onPress={() => playSound(card)}
							>
								<SvgXml
									style={{ marginTop: 2 }}
									xml={volume}
									width={24}
									height={24}
								/>
							</Pressable>
						</View>
					)}
					onSwiped={handleOnSwiped}
					onSwipedRight={handleOnSwipedRight}
					onSwipedLeft={handleOnSwipedLeft}
					onSwipedAll={() => {
						//after all cards are seen, navigate to report screen
						handleReportEntry(report);
						navigation.navigate('ReportScreen', {
							results: [...report, lastRes],
						});
					}}
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
		flexDirection: 'row',
		columnGap: 15,
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
