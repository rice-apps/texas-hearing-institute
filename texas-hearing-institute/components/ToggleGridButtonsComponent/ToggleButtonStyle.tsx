import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	button: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
	},
	buttonActive: {
		backgroundColor: '#AFE4F9',
		borderColor: 'white',
	},
	buttonInactive: {
		backgroundColor: '#fff',
		borderColor: '#E1E1E1',
		borderWidth: 2,
	},
	buttonText: {
		fontSize: 16,
		color: '#333',
	},
});
