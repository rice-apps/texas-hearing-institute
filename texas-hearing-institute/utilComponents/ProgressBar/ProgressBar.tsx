import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    progress: number;
    height: number;
}

const ProgressBar: React.FC<Props> = ({ progress, height }) => {
    return (
        <View style={[styles.backBar, {
            height: height,
            borderRadius: height / 2,
            width: '100%',
            backgroundColor:'#D9D9D9'
        }]}>
            <View style={[styles.frontBar, {
                width: `${progress}%`,
                borderRadius: height / 2,
                backgroundColor:'#AFE4F9'
            }]} />
        </View>
    );
};
    
const styles = StyleSheet.create({
    backBar: {
        backgroundColor: '#D9D9D9',
        overflow: 'hidden',
    },
    frontBar: {
        height: '100%',
        backgroundColor: '#000',
    },
});

export default ProgressBar;
    