import React from 'react';
import Heading from '../components/Heading';
import { StyleSheet, Text, View} from 'react-native';

interface PhonemeListProps {
    users: Phoneme[];
}

interface Phoneme{
    name: string,
    correct: boolean,

}
//progress bar

//percent correct

//list of phonemes and correct vs. not correct

//buttons: practice this set again, save report

export default function ReportScreen(){
    const phonemes = ['a', 'b', 'c', 'd']
    const PList = ( { phonemes })
    return(
        <View>
            <Heading title={'Summary'}></Heading>
            

        </View>
    );

}