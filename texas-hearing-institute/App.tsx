import {SafeAreaView} from 'react-native';
import PracticeTab from './listening_settings_new/PracticeTab';
import {ApplicationProvider} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';

export default function App() {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <SafeAreaView style={{flex: 1}}>
                <PracticeTab/>
            </SafeAreaView>
        </ApplicationProvider>
    );
}