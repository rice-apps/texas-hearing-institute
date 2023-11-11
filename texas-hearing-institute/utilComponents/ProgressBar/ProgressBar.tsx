import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    progress: number;
    height: number;
    backgroundColor?: string,
    foregroundColor?: string
}

const ProgressBar: React.FC<Props> = ({ progress, height, backgroundColor , foregroundColor }) => {
    const finalBackgroundColor = (backgroundColor == undefined ? '#D9D9D9' : backgroundColor!);
    const finalForegroundColor = (foregroundColor == undefined ? '#000' : foregroundColor!);

    return (
        <View style={[styles.backBar, {
            height: height,
            borderRadius: height / 2,
            width: '100%',
            backgroundColor: finalBackgroundColor
        }]}>
            <View style={[styles.frontBar, {
                width: `${progress}%`,
                borderRadius: height / 2,
                backgroundColor: finalForegroundColor
            }]} />
        </View>
    );
};
    
const styles = StyleSheet.create({
    backBar: {
        overflow: 'hidden',
    },
    frontBar: {
        height: '100%',
    },
});

export default ProgressBar;
    