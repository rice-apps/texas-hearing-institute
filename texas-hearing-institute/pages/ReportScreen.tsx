import React from 'react';
import Heading from '../components/Heading';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import PieChart from 'react-native-pie-chart';
import { AntDesign } from '@expo/vector-icons';

interface PhonemeListProps {
	phonemes: Phoneme[];
	user: string;
}

interface Phoneme {
	name: string;
	correct: boolean;
}
//TODO: integrate progress bar/practice cards

const ReportScreen = (phonemes: PhonemeListProps) => {
	// frequency of correct/incorrect array
	const cCount: number[] = [
		phonemes.phonemes.filter((x) => x.correct == false).length,
		phonemes.phonemes.filter((x) => x.correct == true).length,
	];
	return (
		<View>
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
						{'Score: ' + (cCount[1] / (cCount[0] + cCount[1])) * 100 + '%'}
					</Text>
				</View>
			</View>
			<ScrollView>
				{phonemes.phonemes.map((phoneme) => {
					const color = phoneme.correct ? 'green' : 'red';
					const iName = phoneme.correct ? 'check' : 'close';
					return (
						<View
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

			<Pressable
				style={({ pressed }) => [
					styles.box,
					pressed ? styles.pressed : styles.button,
				]}
			>
				<Text style={tw`text-lg pt-2 pl-2 mx-5 mt-1`}>
					Practice this set again
				</Text>
			</Pressable>
			<Pressable
				style={({ pressed }) => [
					styles.box,
					pressed ? styles.pressed : styles.button,
				]}
			>
				<Text style={tw`text-lg pt-2 pl-2 mx-5 mt-1`}>Save report</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 2,
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		padding: 20,
	},
	box: {
		flex: 0.25,
		backgroundColor: '#e3dfde',
		justifyContent: 'space-between',
		//alignItems: 'center',
		marginTop: 15,
		borderRadius: 20,
	},
	pressed: {
		backgroundColor: '#a19e9d',
		justifyContent: 'space-between',
		padding: 10,
		borderRadius: 10,
	},
	button: {
		backgroundColor: '#D3D3D3',
		padding: 10,
		borderRadius: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
	},
});

export default ReportScreen;
