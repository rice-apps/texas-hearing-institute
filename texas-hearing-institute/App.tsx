import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React, {useState, useEffect, Component} from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TestComponent text="random color changer"></TestComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: 10,
    backgroundColor: '#1f1e33',
  },
});

const TestComponent = ({ text } : { text : any }) => {
  const [color1, setColor1] = useState(randomRgb());
  const [color2, setColor2] = useState(randomRgb());
  const [color3, setColor3] = useState(randomRgb());

  const handleClick = () => {
    setColor1(randomRgb());
    setColor2(randomRgb());
    setColor3(randomRgb());
  }

  return(
    <View style={[
      styles.container,
      {
        flexDirection: 'column'
      }
    ]}>
      <Text style={{flex: 1, textAlign: 'center', marginTop: 10, fontSize: 30, color: 'white'}}>{text}</Text>
      <View style={{backgroundColor: color1, flex: 1}}></View>
      <View style={{backgroundColor: color2, flex: 2}}></View>
      <View style={{backgroundColor: color3, flex: 3}}></View>
      <Button title="change color" onPress={
        handleClick
      }></Button>
    </View>
  )
}

const randomRgb = () => {
  return `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
};

