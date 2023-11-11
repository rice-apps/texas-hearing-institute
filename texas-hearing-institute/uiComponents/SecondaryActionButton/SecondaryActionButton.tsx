import {TouchableOpacity, Text} from 'react-native'
import React from 'react';

interface SecondaryActionButtonType {
    text:String,
    disabled:boolean,
    onPress: () => void
};

const SecondaryActionButton:React.FC<SecondaryActionButtonType> = ({text,disabled,onPress}) => {

    return(
        <TouchableOpacity 
        style={{
            backgroundColor:'transparent',
            borderRadius:'50%',
            padding: 16,
            borderColor:'#AFE4F9',
            borderWidth:2,
            width:'80%'
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

export default SecondaryActionButton;

