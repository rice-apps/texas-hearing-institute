import React, { useContext } from 'react';
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
import PillButtonView from '../components/PillButtonView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PracticeParamList } from './PracticeNavigator';
import { PracticeResult } from './types';
import { UserContext, UserContextType } from '../user/UserContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';

/* WARNING: PARAMETERS CAST TO ANY -- might need to fix using props instead */
/* Active Practice reroutes to Report Screen */

type Props = NativeStackScreenProps<PracticeParamList, 'ReportScreen'>;

type StackNav = StackNavigationProp<PracticeParamList>;

function ReportScreen({ route }: Props) {
	const navigation = useNavigation<StackNav>();
	const { user } = useContext(UserContext) as UserContextType;

	const { results } = route.params;

	const numCorrect = results.filter(
		(p: PracticeResult) => p.correct === true,
	).length;

	const numIncorrect = results.filter(
		(p: PracticeResult) => p.correct === false,
	).length;

	return (
		<View style={styles.container}>
			<Heading title={'Woohoo! High Five, ' + user.getName()}></Heading>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<PieChart
					widthAndHeight={100}
					series={[numCorrect, numIncorrect]}
					sliceColor={['#ff6c00', '#ff9100']}
					coverRadius={0.45}
					coverFill={'#FFF'}
				/>
				<View
					style={{ flexDirection: 'column', justifyContent: 'space-between' }}
				>
					<Text style={tw`text-lg pt-2 pl-2 mx-5 mt-1`}>
						{' '}
						Correct: {numCorrect}
					</Text>
					<Text style={tw`text-lg pt-2 pl-2 mx-5 mt-1`}>
						Incorrect: {numIncorrect}
					</Text>
					<Text style={tw`text-lg font-bold pt-2 pl-2 mx-5 mt-1`}>
						{'Score: ' +
							Math.ceil((numCorrect / (numCorrect + numIncorrect)) * 100) +
							'%'}
					</Text>
				</View>
			</View>
			<ScrollView>
				{results.map((pr: PracticeResult) => {
					const color = pr.correct ? 'green' : 'red';
					const iName = pr.correct ? 'check' : 'close';
					return (
						<View
							key={pr.phonemes.join(' ')}
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								padding: 17,
							}}
						>
							<Text style={tw`text-lg pt-2 pl-2 mx-5 mt-1`}>
								{pr.phonemes.join(' ')}
							</Text>
							<AntDesign name={iName} size={24} color={color} />
						</View>
					);
				})}
			</ScrollView>

			<TouchableOpacity onPress={() => navigation.navigate('Home')}>
				<PillButtonView title="Practice again" type="primary"></PillButtonView>
			</TouchableOpacity>
			{/* <TouchableOpacity onPress={handleReportEntry}>
				<PillButtonView title="Save Report" type="secondary"></PillButtonView>
			</TouchableOpacity> */}
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
