import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import PracticeTab from './listening_settings_new/PracticeTab';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <PracticeTab />
    </SafeAreaView>
  );
}