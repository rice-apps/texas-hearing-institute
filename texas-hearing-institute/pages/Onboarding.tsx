import React, { useState } from 'react'
import { View,Text,Button, SafeAreaView } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import ToggleButton from '../components/ToggleGridButtonsComponent/ToggleButton';
import styles from './OnboardingStyle';
import { SvgXml } from 'react-native-svg';
import leftArrow from '../icons/leftarrow';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import MarkdownText from '../components/MarkdownText/MarkdownText';
import ToggleGridButtons from '../components/ToggleGridButtonsComponent/ToggleGridButtons';

// none of this might be even working, I can't access the expo share might me all trash lol



const Onboarding = () => {

    const prompts = ["What consonant phenoms can your child **say**?","What consonant phenoms can your child **hear**?","What vowels can your child say?","What vowels can your child **hear**?"]


    const consonants = ['b','m','w','f','v','th','TH','t','d','n','s','z','l','sh','zh','ch','dg','y','r','k','g','ng','h']

    // hashmap/dictionary to keep track of all consonants and their toggled state, update via useState to rerender componetns
    const [itemsSelected, setItemsSelected] = useState(Array(consonants.length).fill(false));

    // const 

    return (
        <SafeAreaView style={{
            height: '100%',
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
                marginTop: 32,
                marginBottom: 32,
                marginHorizontal: 27,
            }}>
                <SvgXml xml={leftArrow} width={24} height={24} />
                <View style={{
                    width: 181
                }}>
                    <ProgressBar progress={50} height={8} />
                </View>
                <View style={{
                    width: 24,
                }} />
            </View>

            <View style={{
                marginHorizontal: 32,
                justifyContent: 'space-between',
                flexGrow: 1,
            }}>
                <View style={{
                    flexGrow: 1,
                }}>
                    <View style={{marginBottom: 32}}>
                        <MarkdownText content={prompts[0]} fontSize={24} />
                    </View>
                    <ToggleGridButtons items={consonants} itemsSelected={itemsSelected} setItemsSelected={(index: number, newValue: boolean) => {
                        const newItemsSelected = [...itemsSelected];
                        newItemsSelected[index] = newValue;
                        setItemsSelected(newItemsSelected);
                    }} />
                </View>
                <View>
                    <Button title="Continue" />
                    <Button title="Not sure, let's find out" />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Onboarding;