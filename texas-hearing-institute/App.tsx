import {SafeAreaView, StyleSheet } from 'react-native';
import PracticeTab from './listening_settings_new/PracticeTab';
import ListeningNavigator from './listening_settings_new/ListeningNavigator';
import {ApplicationProvider} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';

export default function App() {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <SafeAreaView style={{flex: 1}}>
                <ListeningNavigator />
            </SafeAreaView>
        </ApplicationProvider>
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
