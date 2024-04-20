import React, { useContext } from 'react';
import Heading from '../components/Heading';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	ScrollView,
} from 'react-native';
import PieChart from 'react-native-pie-chart';
import { AntDesign } from '@expo/vector-icons';
import PillButtonView from '../components/PillButtonView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PracticeParamList } from './PracticeNavigator';
import { PracticeResult } from './types';
import { UserContext, UserContextType } from '../user/UserContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { Badge } from 'react-native-elements';

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
			<Heading title={'Woohoo! High five, ' + user.getName()} />
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: 69,
					paddingHorizontal: 8,
				}}
			>
				<View
					style={{
						position: 'relative',
						height: 69,
						width: 69,
					}}
				>
					<PieChart
						widthAndHeight={69}
						series={[numCorrect, numIncorrect]}
						sliceColor={['#AFE4F9', '#EBEBEB']}
						coverRadius={0.74}
						coverFill={'#FFF'}
						style={{ position: 'absolute' }}
					/>
					<Text
						style={{
							position: 'absolute',
							top: 26,
							left: 17,
							fontSize: 14,
							color: '#333',
						}}
					>
						{Math.ceil((numCorrect / (numCorrect + numIncorrect)) * 100) + '%'}
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'column',
						height: 69,
						width: 180,
						justifyContent: 'space-evenly',
					}}
				>
					<Text style={{ fontSize: 18, fontWeight: '400', color: '#333' }}>
						Correct
					</Text>
					<Text style={{ fontSize: 18, fontWeight: '400', color: '#333' }}>
						Still Learning
					</Text>
				</View>
				<View
					style={{
						height: 69,
						width: 33,
						alignItems: 'flex-end',
						justifyContent: 'space-evenly',
					}}
				>
					<Badge
						value={numCorrect}
						badgeStyle={{
							backgroundColor: '#DAF9D2',
							borderWidth: 1,
							borderColor: '#73AC17',
							width: 33,
							height: 25,
							borderRadius: 16,
						}}
						textStyle={{ color: '#333' }}
					/>
					<Badge
						value={numIncorrect}
						badgeStyle={{
							backgroundColor: '#FCECC3',
							borderWidth: 1,
							borderColor: '#DDB346',
							width: 33,
							height: 25,
							borderRadius: 16,
						}}
						textStyle={{ color: '#333' }}
					/>
				</View>
			</View>
			<ScrollView style={{ paddingHorizontal: 32, paddingVertical: 32 }}>
				{results.map((pr: PracticeResult) => {
					const color = pr.correct ? '#73AC17' : '#EAC564';
					const iName = pr.correct ? 'check' : 'close';
					return (
						<View
							key={pr.phonemes.join(' ')}
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginBottom: 12,
							}}
						>
							<Text style={{ color: '#333', fontSize: 18, fontWeight: '300' }}>
								{pr.phonemes.join(' ')}
							</Text>
							<AntDesign name={iName} size={24} color={color} />
						</View>
					);
				})}
			</ScrollView>
			<View style={{ alignItems: 'center' }}>
				<TouchableOpacity onPress={() => navigation.navigate('Home')}>
					<PillButtonView
						title="Practice again"
						type="primary"
					></PillButtonView>
				</TouchableOpacity>
			</View>
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
