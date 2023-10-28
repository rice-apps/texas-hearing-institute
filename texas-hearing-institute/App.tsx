import {SafeAreaView} from 'react-native';
import ListeningSettings from './listening_settings_new/ListeningSettings';
import {ApplicationProvider} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';

export default function App() {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <SafeAreaView style={{flex: 1}}>
                <ListeningSettings/>
            </SafeAreaView>
        </ApplicationProvider>
    );
}