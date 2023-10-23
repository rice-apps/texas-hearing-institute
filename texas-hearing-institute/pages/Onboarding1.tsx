import React, { useState, useEffect } from 'react'
import { View,Text,Button, Pressable, SafeAreaView } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import styles from './OnboardingStyle';
import { SvgXml } from 'react-native-svg';
import leftArrow from '../icons/leftarrow';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import MarkdownText from '../components/MarkdownText/MarkdownText';
import ToggleGridButtons from '../components/ToggleGridButtonsComponent/ToggleGridButtons';
import {consonants,prompt1, storageKey} from './Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding1 = ({navigation}:any) => {

    // hashmap/dictionary to keep track of all consonants and their toggled state, update via useState to rerender componetns
    const [itemsSelected, setItemsSelected] = useState(Array(consonants.length).fill(false));

    // Store selection
    const storeItemSelection = async (storageKey: string, items: string[], itemsSelected: boolean[]) => {
        let itemSelectionMap = new Map<string, boolean>();
        for (let i = 0; i < items.length; i++) {
            itemSelectionMap.set(items[i], itemsSelected[i]);
        }
        try {
            await AsyncStorage.setItem(storageKey, JSON.stringify(Array.from(itemSelectionMap.entries())));
        } catch (e) {
            console.log(e);
        }
    }

    // Retrieve selection
    const retrieveItemSelections = async (storageKey: string, items: string[]): Promise<boolean[]> => {
        try {
            const itemSelectionJson = await AsyncStorage.getItem(storageKey);
            let itemSelectionMap = new Map<string, boolean>();

            if (itemSelectionJson !== null) {
                const itemSelectionArray: [string, boolean][] = JSON.parse(itemSelectionJson);
                itemSelectionMap = new Map(itemSelectionArray);
            }

            const itemsSelected: boolean[] = items.map(item => itemSelectionMap.get(item) ?? false);
            return itemsSelected;

        } catch (e) {
            console.log(e);
            return items.map(() => false);
        }
    }

    // Load stored selection statuses when the component mounts
    useEffect(() => {
        const loadStoredSelections = async () => {
            const storedSelections = await retrieveItemSelections(storageKey, consonants);
            setItemsSelected(storedSelections);
        };
        loadStoredSelections();
    }, []); // The empty array ensures this effect runs once on mount

    // This effect triggers every time 'itemsSelected' changes, storing the new state
    useEffect(() => {
        storeItemSelection(storageKey, consonants, itemsSelected);
    }, [itemsSelected]); // Re-run this effect when 'itemsSelected' changes



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
                    <ProgressBar progress={0} height={8} />
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
                        <MarkdownText content={prompt1} fontSize={24} />
                    </View>
                    <ToggleGridButtons items={consonants} itemsSelected={itemsSelected} setItemsSelected={(index: number, newValue: boolean) => {
                        const newItemsSelected = [...itemsSelected];
                        newItemsSelected[index] = newValue;
                        setItemsSelected(newItemsSelected);
                    }} />
                </View>
                <View>
                    <Button  
                        title="Continue" 
                        onPress={() => navigation.navigate("Onboarding2")}
                    />
                    <Button  title="Not sure, let's find out" />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Onboarding1;