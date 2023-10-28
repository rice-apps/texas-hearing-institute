import {View,Text,Button, SafeAreaView, Pressable,ScrollView, StyleSheet} from 'react-native'
import ToggleGridButtons from '../utilComponents/ToggleGridButtonsComponent/ToggleGridButtons'
import styles from './OnboardingStyle'
import { SvgXml } from 'react-native-svg';
import pencil from '../icons/pencil';
import {setupPageElements,setupPersistenceKeys} from '../util/setupData'
import {useEffect,useState} from 'react'
import { retrieveItemSelections,storeItemSelection } from '../util/persistSelection';

export const SoundInventory = () => {

        // hashmap/dictionary to keep track of all consonants and their toggled state, update via useState to rerender componetns
        const [speechConsonants, setSpeechConsonants] = useState(Array(setupPageElements[0].length).fill(false));
        const [speechVowels, setSpeechVowels] = useState(Array(setupPageElements[2].length).fill(false));
        const [listeningConsonants, setListeningConsonants] = useState(Array(setupPageElements[0].length).fill(false));
        const [listeningVowels, setListeningVowels] = useState(Array(setupPageElements[2].length).fill(false));

        const [disabled,changeDisabled] = useState(true)

        // Load stored selection statuses when the component mounts
        useEffect(() => {
            // need seperate functions because only one await is triggered
            const loadStoredSpeechConsonants = async () => {
                const storedSpeechConsonants = await retrieveItemSelections(setupPersistenceKeys[0], setupPageElements[0]);
                setSpeechConsonants(storedSpeechConsonants)
            }
            const loadStoredSpeechVowels = async () => {
                const storedSpeechVowels = await retrieveItemSelections(setupPersistenceKeys[2], setupPageElements[2]);
                setSpeechVowels(storedSpeechVowels)
            }
            const loadStoredListeningConsonants = async () => {
                const storedListeningConsonants = await retrieveItemSelections(setupPersistenceKeys[1], setupPageElements[0]);
                setListeningConsonants(storedListeningConsonants)
            }
            const loadStoredListeningVowels = async () => {
                const storedListeningVowels = await retrieveItemSelections(setupPersistenceKeys[3],  setupPageElements[2]);
                setListeningVowels(storedListeningVowels)
            }
            loadStoredSpeechConsonants();
            loadStoredSpeechVowels();
            loadStoredListeningConsonants();
            loadStoredListeningVowels();
        }, []); // The empty array ensures this effect runs once on mount
    
        // This effect triggers every time 'speechConsonants' changes, storing the new state
        useEffect(() => {
            storeItemSelection(setupPersistenceKeys[0], setupPageElements[0], speechConsonants);
        }, [speechConsonants]); // Re-run this effect when 'speechConsonants' changes

        // This effect triggers every time 'speechVowels' changes, storing the new state
        useEffect(() => {
            storeItemSelection(setupPersistenceKeys[2], setupPageElements[2], speechVowels);
        }, [speechVowels]); // Re-run this effect when 'speechVowels' changes

        // This effect triggers every time 'listeningConsonants' changes, storing the new state
        useEffect(() => {
            storeItemSelection(setupPersistenceKeys[1], setupPageElements[0], listeningConsonants);
        }, [listeningConsonants]); // Re-run this effect when 'listeningConsonants' changes

        // This effect triggers every time 'listeningVowels' changes, storing the new state
        useEffect(() => {
            storeItemSelection(setupPersistenceKeys[3], setupPageElements[2], listeningVowels);
        }, [listeningVowels]); // Re-run this effect when 'listeningVowels' changes


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

                <ToggleGridButtons disabled={disabled} items={setupPageElements[0]} itemsSelected={speechConsonants} setItemsSelected={(index: number, newValue: boolean) => {
                        const newItemsSelected = [...speechConsonants];
                        newItemsSelected[index] = newValue;
                        setSpeechConsonants(newItemsSelected);
                    }} />

                <Text style={pagestyles.subheading}>Vowels</Text>

                <ToggleGridButtons disabled={disabled} items={setupPageElements[2]} itemsSelected={speechVowels} setItemsSelected={(index: number, newValue: boolean) => {
                        const newItemsSelected = [...speechVowels];
                        newItemsSelected[index] = newValue;
                        setSpeechVowels(newItemsSelected);
                    }} />
            </View>

            <View style={styles.onboardingViewMargins}>
                <Text style={pagestyles.heading}>Listening Babble</Text>

                <Text style={pagestyles.subheading}>Consonants</Text>

                <ToggleGridButtons disabled={disabled} items={setupPageElements[0]} itemsSelected={listeningConsonants} setItemsSelected={(index: number, newValue: boolean) => {
                        const newItemsSelected = [...listeningConsonants];
                        newItemsSelected[index] = newValue;
                        setListeningConsonants(newItemsSelected);
                    }} />

                <Text style={pagestyles.subheading}>Vowels</Text>

                <ToggleGridButtons disabled={disabled} items={setupPageElements[2]} itemsSelected={listeningVowels} setItemsSelected={(index: number, newValue: boolean) => {
                        const newItemsSelected = [...listeningVowels];
                        newItemsSelected[index] = newValue;
                        setListeningVowels(newItemsSelected);
                    }} />
            </View>
            </ScrollView>


            <View style={{borderTopColor:'black',borderTopWidth: 1, height:100, shadowColor:"black",shadowOpacity:0.2, display: disabled ? 'none' : 'flex'}}>
                <Button style={{padding: 50}} onPress={() => changeDisabled(!disabled)} title="Save Changes"/>
            </View>
        </SafeAreaView>
    )
}

const pagestyles = StyleSheet.create({
    heading:{
        fontSize:18, 
        fontWeight:'bold',
        marginBottom:20
    },
    subheading:{
        fontSize:15, 
        marginTop:15,
        marginBottom:15
    },
})