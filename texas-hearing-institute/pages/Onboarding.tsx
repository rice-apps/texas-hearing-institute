import React,{useState} from 'react'
import {View,Text,Button} from 'react-native'
import tw from 'tailwind-react-native-classnames';
import ToggleButton from '../components/ToggleGridButtonsComponent/ToggleButton';
import styles from './OnboardingStyle';

// none of this might be even working, I can't access the expo share might me all trash lol

const Onboarding = () => {

    const prompts = ["What consonant phenoms can your child say?","What consonant phenoms can your child hear?","What vowels can your child say?","What vowels can your child hear?"]


    const consonants = ['b','m','w','f','v','th','TH','t','d','n','s','z','l','sh','zh','ch','dg','y','r','k','g','ng','h']

    // hashmap/dictionary to keep track of all consonants and their toggled state, update via useState to rerender componetns

    const consonantsMap= new Map<string,boolean>([
        ['b',false],['m',false],['w',false],['f',false],['v',false],['th',false],['TH',false],['t',false],['d',false],['n',false],['s',false],['z',false],['l',false],['sh',false],['zh',false],['ch',false],['dg',false],['y',false],['r',false],['k',false],['g',false],['ng',false],['h',false]
    ])

    const [consonantStates, setConsonantStates] = useState(consonantsMap)

    // const 

    return (
        <View>
            // for the header of the onboarding screen, should have the backwards arrow and the weird bar at the top
            <View></View>
            <Text>{prompts[0]}</Text>
            // for the grid of consonants/vowels
            <View style={tw`flex-wrap flex-row`}>{Object.keys(consonantStates).map((consonant:string) => 
            {
                return(
                    // the arrow function is meant to toggle the existing boolean that is mapped to the current consonant
                    <ToggleButton onToggle = { 
                        () => {setConsonantStates(consonantStates.set(consonant,!!consonantStates.get(consonant))) }} 
                    title={consonant} isToggled={consonantStates.get(consonant)?consonantStates.has(consonant):false}/>
                )
            }
            )}</View>

            <Button title="Continue" />
            <Button title="Not sure, let's find out" />
        </View>
    )
}

export default Onboarding;