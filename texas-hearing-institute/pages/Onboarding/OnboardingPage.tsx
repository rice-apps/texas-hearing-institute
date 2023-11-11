import React, { useState, useEffect } from 'react'
import { View,Button, SafeAreaView,Pressable, Text} from 'react-native'
import { SvgXml } from 'react-native-svg';
import leftArrow from '../../icons/leftarrow';
import ProgressBar from '../../utilComponents/ProgressBar/ProgressBar';
import MarkdownText from '../../utilComponents/MarkdownText/MarkdownText';
import ToggleGridButtons from '../../utilComponents/ToggleGridButtonsComponent/ToggleGridButtons';
import {storeItemSelection, retrieveItemSelections} from '../../util/persistSelection'
import { setupPrompts, setupPersistenceKeys, setupPageElements } from '../../util/soundInventoryDataAndKeys'

import {    SafeAreaProvider,useSafeAreaInsets,} from 'react-native-safe-area-context';

// commented out typing, teporarily said to be 'any' in parameters

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
    const prompt: string = route.params.prompt;
    const pageNumber: number = route.params.pageNumber;
    const persistenceKey: string = route.params.persistenceKey;
    const setupElements: string[] = route.params.setupElements;

    const insets = useSafeAreaInsets()

    const [itemsSelected, setItemsSelected] = useState(() => {
        // Start load from storage and set state once load completes
        retrieveItemSelections(persistenceKey, setupElements).then((result) => {
            setItemsSelected(result);
        })

        // set an initial value
        return Array(setupElements.length).fill(false) as boolean[];
    })

    const setAndStoreItemSelection = ((newItemsSelectedValue: boolean[]) => {
        setItemsSelected(newItemsSelectedValue);
        storeItemSelection(persistenceKey, setupElements, newItemsSelectedValue)
    })

    return (
        // <SafeAreaView style={{
        //     height: '100%',
        // }}>
        <View
        style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
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
                {
                    pageNumber == 0 ? (
                        <View style={{width: 24, height: 24}} /> /* placeholder */
                    ) : (
                        <Pressable onPress = {() => navigation.navigate((`Onboarding${pageNumber}`) as any, {
                            prompt: setupPrompts[pageNumber - 1],
                            pageNumber: pageNumber - 1,
                            persistenceKey: setupPersistenceKeys[pageNumber - 1],
                            setupElements: setupPageElements[pageNumber - 1],
                        })}>
                            <SvgXml xml={leftArrow} width={24} height={24} />
                        </Pressable>
                    )
                }
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
                        setAndStoreItemSelection(newItemsSelected);
                    }} disabled = {false}/>
                </View>
                <View>
                    <Button  
                        title="Continue" 
                        onPress={() => navigation.navigate((`Onboarding${pageNumber + 2}`) as any, {
                            prompt: setupPrompts[pageNumber + 1],
                            pageNumber: pageNumber + 1,
                            persistenceKey: setupPersistenceKeys[pageNumber + 1],
                            setupElements: setupPageElements[pageNumber + 1],
                        })}
                    />
                    <Button title="Not sure, let's find out" />
                </View>
            </View>
        {/* </SafeAreaView> */}
        </View>
    )
}

export default Onboarding;