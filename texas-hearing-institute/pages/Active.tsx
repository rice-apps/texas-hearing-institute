import React, { useContext, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	useWindowDimensions,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Bar as ProgressBar } from 'react-native-progress';
import { StackNavigationProp } from '@react-navigation/stack';
import { PracticeResult } from './types';
import { useNavigation } from '@react-navigation/core';
import { PracticeParamList } from './PracticeNavigator';
import { SvgXml } from 'react-native-svg';
import x from '../icons/x';
import volume from '../icons/volume';
import { playSound } from '../utils/audio';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';
import { UserContext, UserContextType } from '../user/UserContext';
import PracticeTutorial from './PracticeTutorial';
import CustomSafeAreaView from '../components/CustomSafeAreaView/CustomSafeAreaView';

type StackNav = StackNavigationProp<PracticeParamList>;

type Props = NativeStackScreenProps<PracticeParamList, 'ActivePractice'>;

export default function Active({ route }: Props) {
	const { settings, phonemes, speed } = route.params;

	const navigation = useNavigation<StackNav>();

	const { user } = useContext(UserContext) as UserContextType;
	const [progress, setProgress] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showTutorial, setShowTutorial] = useState(user.getShowTutorial());
	const [report, setReport] = useState<PracticeResult[]>([]);
	let lastRes: PracticeResult;

	const { height: wHeight } = useWindowDimensions();

	const handleOnSwiped = (i: number) => {
		const newProgress = ((i + 1) / phonemes.length) * 100;
		setProgress(newProgress);
		setCurrentIndex(i + 1);
	};

	const handleOnSwipedRight = (i: number) => {
		setReport([...report, { phonemes: phonemes[i], correct: true }]);
		lastRes = { phonemes: phonemes[i], correct: true };
	};

	const handleOnSwipedLeft = (i: number) => {
		setReport([...report, { phonemes: phonemes[i], correct: false }]);
		lastRes = { phonemes: phonemes[i], correct: false };
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
		}
	};

	// if new user
	if (showTutorial) {
		return <PracticeTutorial handleClose={() => setShowTutorial(false)} />;
	}

	return (
		<CustomSafeAreaView>
			<View style={styles.container}>
				<View
					style={{
						width: 310,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginBottom: 10,
					}}
				>
					<Text
						style={{ color: '#333' }}
					>{`${currentIndex}/${phonemes.length}`}</Text>
					<Pressable
						style={{
							borderRadius: 25,
							width: 20,
							height: 20,
							backgroundColor: '#ECECEC',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						onPress={() => navigation.popToTop()}
					>
						<SvgXml xml={x} width={8} height={8} />
					</Pressable>
				</View>
				<ProgressBar
					progress={progress / 100}
					borderRadius={25}
					width={320}
					color="#AFE4F9"
					unfilledColor="#ECECEC"
					height={8}
					borderWidth={0}
				/>
				<View
					style={{
						width: 372,
						height: 500,
						alignItems: 'flex-start',
						flex: 1,
					}}
				>
					<Swiper
						cards={phonemes}
						backgroundColor="white"
						renderCard={(card) => (
							<View
								style={{
									flexDirection: 'row',
									height: wHeight * (2 / 3),
									width: 320,
									marginTop: -20,
									backgroundColor: 'white',
									borderColor: '#ECECEC',
									borderRadius: 16,
									borderWidth: 4,
									justifyContent: 'center',
									alignItems: 'center',
									shadowColor: '#000',
									shadowOpacity: 0.08,
									shadowOffset: { width: 0, height: 0 },
								}}
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
										justifyContent: 'center',
										alignItems: 'center',
									}}
									onPress={() => {
										let repeats: string[] = [];
										for (let i = 0; i < speed; i++) {
											repeats = repeats.concat(card);
										}
										playSound(repeats);
									}}
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
						stackSize={3}
						overlayLabels={{
							left: {
								title: '',
								style: {
									label: {
										borderColor: '#EAC564',
										borderWidth: 4,
										width: 320,
										height: wHeight * (2 / 3),
										// TODO this math is hella funky so probably not extensible to all screens...
										marginTop: wHeight * (-1 / 3) + 80,
										// and i couldn't figure it out for marginLeft
										marginLeft: -18,
										borderRadius: 16,
									},
									wrapper: {
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
									},
								},
							},
							right: {
								title: '',
								style: {
									label: {
										borderColor: '#73AC17',
										borderWidth: 4,
										width: 320,
										height: wHeight * (2 / 3),
										marginTop: wHeight * (-1 / 3) + 80,
										marginLeft: -18,
										borderRadius: 16,
									},
									wrapper: {
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
									},
								},
							},
						}}
					/>
				</View>
			</View>
		</CustomSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: 'white',
		marginTop: 24,
	},
	text: {
		fontSize: 30,
		color: '#333',
	},
	swipeTextContainer: {
		alignItems: 'center',
	},
	swipeText: {
		textAlign: 'center',
	},
	greenBorder: {
		// borderColor: '#34A853', // Change border color to green when swipe right
	},
	yellowBorder: {
		// borderColor: '#FBBC05', // Change border color to yellow when swipe left
	},
});
