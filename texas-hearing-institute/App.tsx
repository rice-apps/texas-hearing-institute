import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import React, {useState} from 'react'
import tw from 'tailwind-react-native-classnames';
import * as Speech from 'expo-speech';

export default function App() {
  const defaultText = "Hello World!";

  const [textfieldText, setTextfieldText] = useState(defaultText);

  const speak = (text: string) => {
    Speech.speak(text);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Write text in the following text box for text-to-speech</Text>
      <TextInput 
        placeholder='Type here!' 
        defaultValue={defaultText}
        onChangeText={(text) => {
          setTextfieldText(text)
        }}
        style = {{
          height: 40,
          width: 200,
          borderColor: 'gray',
          borderWidth: 1,
        }}
      />
      <Text>Current text in text field is {textfieldText}</Text>
      <Button
        onPress={() => {
          speak(textfieldText)
        }} 
        title="Speak Text"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
});
