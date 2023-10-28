import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import ListeningSettings from './listening_settings/ListeningSettings';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ListeningSettings />
    </SafeAreaView>
  );
}