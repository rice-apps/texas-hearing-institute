import {View,Text, Pressable,ScrollView, StyleSheet} from 'react-native'
import ToggleGridButtons from '../../utilComponents/ToggleGridButtonsComponent/ToggleGridButtons'
import styles from '../Onboarding/OnboardingStyle'
import { SvgXml } from 'react-native-svg';
import pencil from '../../icons/pencil';
import {
    consonants,
    vowels,
    consonantInventoryPersistenceKey,
    vowelInventoryPersistenceKey
} from '../../util/soundInventoryDataAndKeys'
import {useState} from 'react'
import { retrieveItemSelections,storeItemSelection } from '../../util/persistSelection';
import CustomSafeAreaView from '../../utilComponents/CustomSafeAreaView/CustomSafeAreaView';
import PrimaryActionButton from '../../uiComponents/PrimaryActionButton/PrimaryActionButton';
import SecondaryActionButton from '../../uiComponents/SecondaryActionButton/SecondaryActionButton';

export const SoundInventory = () => {
    // hashmap/dictionary to keep track of all consonants and their toggled state, update via useState to rerender componetns
    const [editModeEnabled, privateSetEditModeEnabled] = useState(false)

    const [inventoryConsonants, setInventoryConsonants] = useState(() => {
        retrieveItemSelections(consonantInventoryPersistenceKey, consonants).then((result) => {
            setInventoryConsonants(result);
        })

        return [] as boolean[]
    })

    const [inventoryVowels, setInventoryVowels] = useState(() => {
        retrieveItemSelections(vowelInventoryPersistenceKey, vowels).then((result) => {
            setInventoryVowels(result);
        })

        return [] as boolean[]
    })

    const [draftInventoryConsonants, setDraftInventoryConsonants] = useState([] as boolean[])
    const [draftInventoryVowels, setDraftInventoryVowels] = useState([] as boolean[])

    const setAndStoreSelections = ((
        newInventoryConsonants: boolean[],
        newInventoryVowels: boolean[],
        saveToDraft: boolean
    ) => {
        // `saveToDraft` is used for edit mode to be able to revert changes
        if (saveToDraft) {
            setDraftInventoryConsonants(newInventoryConsonants);
            setDraftInventoryVowels(newInventoryVowels);
        } else {
            setInventoryConsonants(newInventoryConsonants);
            setInventoryVowels(newInventoryVowels);

            storeItemSelection(consonantInventoryPersistenceKey, consonants, newInventoryConsonants);
            storeItemSelection(vowelInventoryPersistenceKey, vowels, newInventoryVowels);
        }
    })

    const setDraftToNonDraft = () => {
        setAndStoreSelections(inventoryConsonants, inventoryVowels, true);
    }

    const setNonDraftToDraft = () => {
        setAndStoreSelections(draftInventoryConsonants, draftInventoryVowels, false);
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
    };

    const getCorrespondingInventoryConsonants = () => {
        if (editModeEnabled) {
            return draftInventoryConsonants;
        } else {
            return inventoryConsonants;
        }
    };

    const getCorrespondingInventoryVowels = () => {
        if (editModeEnabled) {
            return draftInventoryVowels;
        } else {
            return inventoryVowels;
        }
    };

    return (
        <CustomSafeAreaView>
            <View style={styles.onboardingHeaderView}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                }}>
                    Sound Inventory
                </Text>
                <Pressable style={{
                    backgroundColor: "transparent",
                    borderColor:'#D3D3D3',
                    borderWidth:2,
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
            <ScrollView>
                <View style={styles.onboardingViewMargins}>
                    <Text style={pagestyles.subheading}>Consonants</Text>

                    <ToggleGridButtons disabled={!editModeEnabled} items={consonants} itemsSelected={getCorrespondingInventoryConsonants()} setItemsSelected={(index: number, newValue: boolean) => {
                            const newItemsSelected = [...getCorrespondingInventoryConsonants()];
                            newItemsSelected[index] = newValue;
                            setAndStoreSelections(newItemsSelected, inventoryVowels, editModeEnabled);
                        }} />

                    <Text style={pagestyles.subheading}>Vowels</Text>

                    <ToggleGridButtons disabled={!editModeEnabled} items={vowels} itemsSelected={getCorrespondingInventoryVowels()} setItemsSelected={(index: number, newValue: boolean) => {
                        const newItemsSelected = [...getCorrespondingInventoryVowels()];
                        newItemsSelected[index] = newValue;
                        setAndStoreSelections(inventoryConsonants, newItemsSelected, editModeEnabled);
                    }} />
                </View>
            </ScrollView>


            <View style={{display: editModeEnabled ? 'flex' : 'none', justifyContent:'center',alignItems:'center', flexDirection: 'column',gap:10}}>
                <PrimaryActionButton
                    text="Save Changes"
                    onPress={() => setEditModeEnabled(!editModeEnabled, true)}
                    disabled={false}
                />
                <SecondaryActionButton
                    text="Discard Changes"
                    onPress ={() => setEditModeEnabled(!editModeEnabled, false)}
                    disabled={false}
                />
            </View>
        </CustomSafeAreaView>
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