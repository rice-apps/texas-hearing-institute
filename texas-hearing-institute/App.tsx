import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ToggleGridButtons from './components/ToggleGridButtonsComponent/ToggleGridButtons';
import { useState, useEffect } from 'react';

// test with the Stack Navigator for React-Native
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Persistent storage. This is just a test and not expected to be permanent
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './pages/Onboarding';

const storageKey = 'yourUniqueStorageKeyForThisData';

export default function App() {
    const testItems = ['b', 'm', 'w', 'f', 'v', 'th', 'TH', 't', 'd', 'n', 's', 'z', 'l', 'sh', 'zh', 'ch', 'dg', 'y', 'r', 'k', 'g', 'ng', 'h'];
    const [itemsSelected, setItemsSelected] = useState(Array(testItems.length).fill(false));

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
            const storedSelections = await retrieveItemSelections(storageKey, testItems);
            setItemsSelected(storedSelections);
        };

        loadStoredSelections();
    }, []); // The empty array ensures this effect runs once on mount

    // This effect triggers every time 'itemsSelected' changes, storing the new state
    useEffect(() => {
        storeItemSelection(storageKey, testItems, itemsSelected);
    }, [itemsSelected]); // Re-run this effect when 'itemsSelected' changes



    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Onboarding1" component={Onboarding}/>
          </Stack.Navigator>
        </NavigationContainer>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ToggleGridButtons items={testItems} itemsSelected={itemsSelected} setItemsSelected={(index: number, newValue: boolean) => {
                const newItemsSelected = [...itemsSelected];
                newItemsSelected[index] = newValue;
                setItemsSelected(newItemsSelected);
            }} />
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
    