import {View, TouchableOpacity, Text} from 'react-native'
import React, { ReactNode } from 'react';

interface PrimaryActionButtonType {
    text:String,
    disabled:boolean,
    onPress: () => void
};

const PrimaryActionButton:React.FC<PrimaryActionButtonType> = ({text,disabled,onPress}) => {

    return(
        <TouchableOpacity 
        style={{
            backgroundColor:'#AFE4F9',
            borderRadius:50,
            padding: 16
        }}
        onPress={onPress}
        disabled={disabled}>
            <Text
            style={{
                textAlign: 'center',
                fontSize:18,
                fontWeight:'bold',
                color:'black'
            }}
            >{text}</Text>
        </TouchableOpacity>
    );
};

export default PrimaryActionButton;