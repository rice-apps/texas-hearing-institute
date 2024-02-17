import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'tailwind-react-native-classnames';
import PillButtonView from './PillButtonView';

export default function PracticeModal() {
	return (
		<View>
			<Modal isVisible={true}>
				<View style={styles.modal}>
					<View
						style={{
							backgroundColor: '#FFF',
							width: 300,
							height: 300,
							borderRadius: 25,
							padding: 10,
						}}
					>
						<View>
							<Text style={tw`text-lg text-center pt-4 pl-4 mx-5 mt-1`}>
								Are you sure you want to end your practice session?
							</Text>
						</View>
						<TouchableOpacity style={tw`pt-4`}>
							<PillButtonView
								title="End Session"
								type="primary"
							></PillButtonView>
						</TouchableOpacity>
						<TouchableOpacity style={tw`pt-1`}>
							<PillButtonView
								title="Keep Practicing"
								type="secondary"
							></PillButtonView>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
