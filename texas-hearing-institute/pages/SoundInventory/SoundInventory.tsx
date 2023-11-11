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
    const [editModeEnabled, privateSetEditModeEnabled] = useState(false)

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

    const [draftInventoryConsonants, setDraftInventoryConsonants] = useState([] as boolean[])
    const [draftInventoryVowels, setDraftInventoryVowels] = useState([] as boolean[])
    const [draftCanHearConsonants, setDraftCanHearConsonants] = useState([] as boolean[])
    const [draftCanHearVowels, setDraftCanHearVowels] = useState([] as boolean[])

    const setAndStoreSelections = ((
        newCanSayConsonants: boolean[],
        newCanSayVowels: boolean[],
        newCanHearConsonants: boolean[],
        newCanHearVowels: boolean[],
        saveToDraft: boolean
    ) => {
        // `saveToDraft` is used for edit mode to be able to revert changes
        if (saveToDraft) {
            setCanSayConsonants(newCanSayConsonants);
            setCanSayVowels(newCanSayVowels);
            setCanHearConsonants(newCanHearConsonants);
            setCanHearVowels(newCanHearVowels);

            storeItemSelection(consonantCanSayPersistenceKey, consonants, newCanSayConsonants);
            storeItemSelection(vowelCanSayPersistenceKey, vowels, newCanSayVowels);
            storeItemSelection(consonantCanHearPersistenceKey, consonants, newCanHearConsonants);
            storeItemSelection(vowelCanHearPersistenceKey, vowels, newCanHearVowels);
        } else {
            setDraftInventoryConsonants(newCanSayConsonants);
            setDraftInventoryVowels(newCanSayVowels);
            setDraftCanHearConsonants(newCanHearConsonants);
            setDraftCanHearVowels(newCanHearVowels);
        }
    })

    const setDraftToNonDraft = () => {
        setAndStoreSelections(canSayConsonants, canSayVowels, canHearConsonants, canHearVowels, true);
    }

    const setNonDraftToDraft = () => {
        setAndStoreSelections(draftInventoryConsonants, draftInventoryVowels, draftCanHearConsonants, draftCanHearVowels, false);
    }

    const setEditModeEnabled = (newValue: boolean, commitChanges: boolean) => {
        if (newValue) {
            // edit mode is now enabled. Let's update the draft.
            setDraftToNonDraft();
        } else {
            // edit mode is now disabled.
            if (commitChanges) {
                setNonDraftToDraft();
            } else {
                setDraftToNonDraft();
            }
        }
        privateSetEditModeEnabled(newValue)
    }


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
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 10,
                    display: editModeEnabled ? 'none' : 'flex'
                }}
                    onPress={() => setEditModeEnabled(!editModeEnabled, true)}
                >
                    <SvgXml style={{marginTop:2}} xml={pencil} width={14} height={14} />
                    <Text style={{fontSize: 16,}}>Edit</Text>
                </Pressable>
            </View>

            <View style={styles.onboardingViewMargins}>
                <Text style={pagestyles.heading} >Speech Babble</Text>

                <Text style={pagestyles.subheading}>Consonants</Text>

                <ToggleGridButtons disabled={!editModeEnabled} items={consonants} itemsSelected={canSayConsonants} setItemsSelected={(index: number, newValue: boolean) => {
                        const newItemsSelected = [...canSayConsonants];
                        newItemsSelected[index] = newValue;
                        setAndStoreSelections(newItemsSelected, canSayVowels, canHearConsonants, canHearVowels, editModeEnabled);
                    }} />

                <Text style={pagestyles.subheading}>Vowels</Text>

                <ToggleGridButtons disabled={!editModeEnabled} items={setupPageElements[2]} itemsSelected={canSayVowels} setItemsSelected={(index: number, newValue: boolean) => {
                    const newItemsSelected = [...canSayVowels];
                    newItemsSelected[index] = newValue;
                    setAndStoreSelections(canSayConsonants, newItemsSelected, canHearConsonants, canHearVowels, editModeEnabled);
                }} />
            </View>

            <View style={styles.onboardingViewMargins}>
                <Text style={pagestyles.heading}>Listening Babble</Text>

                <Text style={pagestyles.subheading}>Consonants</Text>

                <ToggleGridButtons disabled={!editModeEnabled} items={setupPageElements[0]} itemsSelected={canHearConsonants} setItemsSelected={(index: number, newValue: boolean) => {
                    const newItemsSelected = [...canHearConsonants];
                    newItemsSelected[index] = newValue;
                    setAndStoreSelections(canSayConsonants, canSayVowels, newItemsSelected, canHearVowels, editModeEnabled);
                }} />

                <Text style={pagestyles.subheading}>Vowels</Text>

                <ToggleGridButtons disabled={!editModeEnabled} items={setupPageElements[2]} itemsSelected={canHearVowels} setItemsSelected={(index: number, newValue: boolean) => {
                    const newItemsSelected = [...canHearVowels];
                    newItemsSelected[index] = newValue;
                    setAndStoreSelections(canSayConsonants, canSayVowels, canHearConsonants, newItemsSelected, editModeEnabled);
                }} />
            </View>
            </ScrollView>


            <View style={{borderTopColor:'black',borderTopWidth: 1, shadowColor:"black", display: editModeEnabled ? 'flex' : 'none', justifyContent:'center',alignItems:'center', flexDirection: 'column'}}>
                <Pressable style={{marginTop: 25,backgroundColor: '#d3d3d3',padding: 18, width: 300,borderRadius:15}} onPress={() => setEditModeEnabled(!editModeEnabled, false)}>
                    <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold'}}>Discard Changes</Text>
                </Pressable>
                <Pressable style={{marginTop: 25,backgroundColor: '#d3d3d3',padding: 18, width: 300,borderRadius:15}} onPress={() => setEditModeEnabled(!editModeEnabled, true)}>
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