import {View,Text,SafeAreaView, Pressable,ScrollView, StyleSheet} from 'react-native'
import ToggleGridButtons from '../../utilComponents/ToggleGridButtonsComponent/ToggleGridButtons'
import styles from '../Onboarding/OnboardingStyle'
import { SvgXml } from 'react-native-svg';
import pencil from '../../icons/pencil';
import {
    consonantCanHearPersistenceKey,
    consonants,
    setupPageElements,
    setupPersistenceKeys, vowelCanHearPersistenceKey, vowels
} from '../../util/soundInventoryDataAndKeys'
import {useEffect,useState} from 'react'
import { retrieveItemSelections,storeItemSelection } from '../../util/persistSelection';
import { consonantCanSayPersistenceKey, vowelCanSayPersistenceKey } from '../../util/soundInventoryDataAndKeys'

export const SoundInventory = () => {
    // hashmap/dictionary to keep track of all consonants and their toggled state, update via useState to rerender componetns
    const [disabled,changeDisabled] = useState(true)

    const [canSayConsonants, setCanSayConsonants] = useState(() => {
        retrieveItemSelections(consonantCanSayPersistenceKey, consonants).then((result) => {
            setCanSayConsonants(result);
        })

        return [] as boolean[]
    })

    const [canSayVowels, setCanSayVowels] = useState(() => {
        retrieveItemSelections(vowelCanSayPersistenceKey, vowels).then((result) => {
            setCanSayVowels(result);
        })

        return [] as boolean[]
    })

    const [canHearConsonants, setCanHearConsonants] = useState(() => {
        retrieveItemSelections(consonantCanHearPersistenceKey, consonants).then((result) => {
            setCanHearConsonants(result);
        })

        return [] as boolean[]
    })

    const [canHearVowels, setCanHearVowels] = useState(() => {
        retrieveItemSelections(vowelCanHearPersistenceKey, vowels).then((result) => {
            setCanHearVowels(result);
        })

        return [] as boolean[]
    })

    const setAndStoreSelections = ((
        newCanSayConsonants: boolean[],
        newCanSayVowels: boolean[],
        newCanHearConsonants: boolean[],
        newCanHearVowels: boolean[]
    ) => {
        setCanSayConsonants(newCanSayConsonants);
        setCanSayVowels(newCanSayVowels);
        setCanHearConsonants(newCanHearConsonants);
        setCanHearVowels(newCanHearVowels);

        storeItemSelection(consonantCanSayPersistenceKey, consonants, newCanSayConsonants);
        storeItemSelection(vowelCanSayPersistenceKey, vowels, newCanSayVowels);
        storeItemSelection(consonantCanHearPersistenceKey, consonants, newCanHearConsonants);
        storeItemSelection(vowelCanHearPersistenceKey, vowels, newCanHearVowels);
    })

    return (
        <SafeAreaView style={{
            height: '100%',
        }}>
            <ScrollView>
            <View style={styles.onboardingHeaderView}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                }}>
                    Sound Inventory
                </Text>
                <Pressable style={{
                    backgroundColor: "#D3D3D3",
                    padding: 10,
                    borderRadius: 10,
                    flexDirection:'row', 
                    flexWrap:'wrap',
                    justifyContent:'center',
                    gap:10,
                    display: disabled ? 'flex' : 'none'
                }}
                    onPress={() => changeDisabled(!disabled)}
                >
                    <SvgXml style={{marginTop:2}} xml={pencil} width={14} height={14} />
                    <Text style={{fontSize: 16,}}>Edit</Text>
                </Pressable>
            </View>

            <View style={styles.onboardingViewMargins}>
                <Text style={pagestyles.heading} >Speech Babble</Text>

                <Text style={pagestyles.subheading}>Consonants</Text>

                <ToggleGridButtons disabled={disabled} items={consonants} itemsSelected={canSayConsonants} setItemsSelected={(index: number, newValue: boolean) => {
                        const newItemsSelected = [...canSayConsonants];
                        newItemsSelected[index] = newValue;
                        setAndStoreSelections(newItemsSelected, canSayVowels, canHearConsonants, canHearVowels);
                    }} />

                <Text style={pagestyles.subheading}>Vowels</Text>

                <ToggleGridButtons disabled={disabled} items={setupPageElements[2]} itemsSelected={canSayVowels} setItemsSelected={(index: number, newValue: boolean) => {
                    const newItemsSelected = [...canSayVowels];
                    newItemsSelected[index] = newValue;
                    setAndStoreSelections(canSayConsonants, newItemsSelected, canHearConsonants, canHearVowels);
                }} />
            </View>

            <View style={styles.onboardingViewMargins}>
                <Text style={pagestyles.heading}>Listening Babble</Text>

                <Text style={pagestyles.subheading}>Consonants</Text>

                <ToggleGridButtons disabled={disabled} items={setupPageElements[0]} itemsSelected={canHearConsonants} setItemsSelected={(index: number, newValue: boolean) => {
                    const newItemsSelected = [...canHearConsonants];
                    newItemsSelected[index] = newValue;
                    setAndStoreSelections(canSayConsonants, canSayVowels, newItemsSelected, canHearVowels);
                }} />

                <Text style={pagestyles.subheading}>Vowels</Text>

                <ToggleGridButtons disabled={disabled} items={setupPageElements[2]} itemsSelected={canHearVowels} setItemsSelected={(index: number, newValue: boolean) => {
                    const newItemsSelected = [...canHearVowels];
                    newItemsSelected[index] = newValue;
                    setAndStoreSelections(canSayConsonants, canSayVowels, canHearConsonants, newItemsSelected);
                }} />
            </View>
            </ScrollView>


            <View style={{borderTopColor:'black',borderTopWidth: 1, height:100, shadowColor:"black", display: disabled ? 'none' : 'flex', justifyContent:'center',alignItems:'center'}}>
                <Pressable style={{marginTop: 25,backgroundColor: '#d3d3d3',padding: 18, width: 300,borderRadius:15}} onPress={() => changeDisabled(!disabled)}>
                    <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold'}}>Save Changes</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const pagestyles = StyleSheet.create({
    heading:{
        fontSize:20, 
        fontWeight:'bold',
        marginBottom:20
    },
    subheading:{
        fontSize:16, 
        marginTop:15,
        marginBottom:15
    },
})