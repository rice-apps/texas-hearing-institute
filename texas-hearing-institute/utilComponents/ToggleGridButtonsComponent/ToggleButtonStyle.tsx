import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    button: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    buttonActive: {
        backgroundColor: '#AFE4F9',
        borderColor: '#D9D9D9',
    },
    buttonInactive: {
        backgroundColor: '#F5F5F5',
        borderColor: '#D9D9D9',
        color: 'black',
    },
    buttonText: {
        fontSize: 20, 
    },
    buttonTextActive: {
        color: 'black',
    },
    buttonTextInactive: {
        color: 'black',
    },
});
