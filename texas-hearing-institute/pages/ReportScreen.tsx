import React from 'react';
import Heading from '../components/Heading';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	ScrollView,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import PieChart from 'react-native-pie-chart';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import PillButtonView from '../components/PillButtonView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PracticeParamList } from './PracticeNavigator';
import { Phoneme } from './types';

/* WARNING: PARAMETERS CAST TO ANY -- might need to fix using props instead */
/* Active Practice reroutes to Report Screen */

type Props = NativeStackScreenProps<PracticeParamList, 'ReportScreen'>;

/* eslint-disable @typescript-eslint/no-explicit-any */
function ReportScreen({ route }: Props) {
	const { phonemes, report } = route.params;
	// frequency of correct/incorrect array
	const cCount: number[] = [
		phonemes.phonemes.filter((x: Phoneme) => x.correct == false).length,
		phonemes.phonemes.filter((x: Phoneme) => x.correct == true).length,
	];

	const handleReportEntry = async () => {
		const { error } = await supabase.from('reports').insert({
			child: report.child,
			created_at: new Date().toISOString(),
			type: report.type,
			subtype: report.subtype,
			sound: report.sound,
			mode: report.mode,
			voweltype: report.voweltype,
			combinations: phonemes.phonemes.map((p: Phoneme) => p.name),
			num_syllables: report.numSyllables,
			correct_incorrect: phonemes.phonemes.map((p: Phoneme) => p.correct),
		});
		if (error) {
			alert(error);
		}
	};

	return (
		<View style={styles.container}>
			<Heading title={'Woohoo! High Five, ' + phonemes.user}></Heading>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<PieChart
					widthAndHeight={100}
					series={cCount}
					sliceColor={['#ff6c00', '#ff9100']}
					coverRadius={0.45}
					coverFill={'#FFF'}
				/>
				<View
					style={{ flexDirection: 'column', justifyContent: 'space-between' }}
				>
					<Text style={tw`text-lg pt-2 pl-2 mx-5 mt-1`}>
						{' '}
						Correct: {cCount[1]}
					</Text>
					<Text style={tw`text-lg pt-2 pl-2 mx-5 mt-1`}>
						Incorrect: {cCount[0]}
					</Text>
					<Text style={tw`text-lg font-bold pt-2 pl-2 mx-5 mt-1`}>
						{'Score: ' +
							Math.ceil((cCount[1] / (cCount[0] + cCount[1])) * 100) +
							'%'}
					</Text>
				</View>
			</View>
			<ScrollView>
				{phonemes.phonemes.map((phoneme: Phoneme) => {
					const color = phoneme.correct ? 'green' : 'red';
					const iName = phoneme.correct ? 'check' : 'close';
					return (
						<View
							key={phoneme.name}
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								padding: 17,
							}}
						>
							<Text style={tw`text-lg pt-2 pl-2 mx-5 mt-1`}>
								{phoneme.name}
							</Text>
							<AntDesign name={iName} size={24} color={color} />
						</View>
					);
				})}
			</ScrollView>

			<TouchableOpacity>
				<PillButtonView
					title="Practice this set again"
					type="primary"
				></PillButtonView>
			</TouchableOpacity>
			<TouchableOpacity onPress={handleReportEntry}>
				<PillButtonView title="Save Report" type="secondary"></PillButtonView>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 2,
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		padding: 20,
	},
});

export default ReportScreen;
