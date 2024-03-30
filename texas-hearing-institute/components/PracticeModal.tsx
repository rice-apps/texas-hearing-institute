import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
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
							width: 342,
							height: 390,
							borderRadius: 16,
							paddingHorizontal: 32,
							paddingVertical: 40,
							alignItems: 'center',
						}}
					>
						<Image
							source={require('../icons/speech-bubble.png')}
							style={{ width: 70, height: 70, marginBottom: 24 }}
						/>
						<Text style={tw`text-xl font-medium text-center mb-6`}>
							Are you sure you want to end your practice session?
						</Text>
						<TouchableOpacity style={tw`pt-4 mb-2`}>
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
