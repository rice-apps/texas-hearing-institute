import { StyleSheet, Text, View } from 'react-native';
import OnboardingMain from './pages/Onboarding/OnboardingMain';
import {PracticeStats} from "./pages/PracticeStats/PracticeStats";
import {SafeAreaProvider} from "react-native-safe-area-context";


export default function App() {
    return (
        <SafeAreaProvider>
            <PracticeStats />
        </SafeAreaProvider>
    );
}
    
    