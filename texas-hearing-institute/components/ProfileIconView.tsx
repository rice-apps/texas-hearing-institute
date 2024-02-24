import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface ProfileIconViewProps {
	iconPath: ImageSourcePropType;
}

const ProfileIconView = ({ iconPath }: ProfileIconViewProps) => {
	return (
		<View style={styles.shadow}>
			<Image source={iconPath} style={styles.image} />
		</View>
	);
};

const styles = StyleSheet.create({
	shadow: {
		width: 46,
		height: 46,
		borderRadius: 23, // half of width and height to make it circle
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.14,
		shadowRadius: 4,
		elevation: 3, // for Android shadow effect
		overflow: 'hidden', // this is important to clip the image into a circle
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 23, // same as container to ensure the image is also clipped
	},
});

export default ProfileIconView;
