import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={tw`text-3xl font-bold underline`}>Open up App.tsx to start working on your app!</Text>
      
      <Text>Hello world.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f01',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
