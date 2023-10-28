import React, { useState, useEffect } from 'react'
import { View,Button, SafeAreaView,Pressable } from 'react-native'
import { SvgXml } from 'react-native-svg';
import leftArrow from '../icons/leftarrow';
import ProgressBar from '../utilComponents/ProgressBar/ProgressBar';
import MarkdownText from '../utilComponents/MarkdownText/MarkdownText';
import ToggleGridButtons from '../utilComponents/ToggleGridButtonsComponent/ToggleGridButtons';
import {storeItemSelection, retrieveItemSelections} from '../util/persistSelection'
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from './OnboardingMain';
import { setupPrompts, setupPersistenceKeys, setupPageElements } from '../util/setupData'
import { RouteProp } from '@react-navigation/native';

// type RootStackParamList = {
//     Onboarding1: OnboardingRouteParams;
//     Onboarding2: OnboardingRouteParams;
//     Onboarding3: OnboardingRouteParams;
//     Onboarding4: OnboardingRouteParams;
// };

// type Onboarding1NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding1'>;
// type Onboarding1ScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding1'>;
// type Onboarding2NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding2'>;
// type Onboarding2ScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding2'>;
// type Onboarding3NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding3'>;
// type Onboarding3ScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding3'>;
// type Onboarding4NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding4'>;
// type Onboarding4ScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding4'>;

// type OnboardingRouteParams = {
//     prompt: string;
//     pageNumber: number;
//     persistenceKey: string;
//     setupElements: string[];
// };
  

const Onboarding: React.FC< {route: any, navigation: any} > = ({ route, navigation }) => {
    let prompt: string = route.params.prompt;
    let pageNumber: number = route.params.pageNumber;
    let persistenceKey: string = route.params.persistenceKey;
    let setupElements: string[] = route.params.setupElements;

    const [itemsSelected, setItemsSelected] = useState(Array(setupElements.length).fill(false));

    // Load stored selection statuses when the component mounts
    useEffect(() => {
        const loadStoredSelections = async () => {
            const storedSelections = await retrieveItemSelections(persistenceKey, setupElements);
            setItemsSelected(storedSelections);
        };
        loadStoredSelections();
    }, []); // The empty array ensures this effect runs once on mount

    // This effect triggers every time 'itemsSelected' changes, storing the new state
    useEffect(() => {
        storeItemSelection(persistenceKey, setupElements, itemsSelected);
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
                <Pressable onPress = {() => navigation.navigate((`Onboarding${pageNumber - 1}`) as any, {
                        prompt: setupPrompts[pageNumber],
                        pageNumber: pageNumber - 1,
                        persistenceKey: setupPersistenceKeys[pageNumber],
                        setupElements: setupPageElements[pageNumber],
                    })}>
                <SvgXml xml={leftArrow} width={24} height={24} 
                />
                </Pressable>
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
                        <MarkdownText content={prompt} fontSize={24} />
                    </View>
                    <ToggleGridButtons items={setupElements} itemsSelected={itemsSelected} setItemsSelected={(index: number, newValue: boolean) => {
                        const newItemsSelected = [...itemsSelected];
                        newItemsSelected[index] = newValue;
                        setItemsSelected(newItemsSelected);
                    }} />
                </View>
                <View>
                    <Button  
                        title="Continue" 
                        onPress={() => navigation.navigate((`Onboarding${pageNumber + 1}`) as any, {
                            prompt: setupPrompts[pageNumber],
                            pageNumber: pageNumber + 1,
                            persistenceKey: setupPersistenceKeys[pageNumber],
                            setupElements: setupPageElements[pageNumber],
                        })}
                    />
                    <Button title="Not sure, let's find out" />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Onboarding;