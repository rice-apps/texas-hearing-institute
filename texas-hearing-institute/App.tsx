import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import GreenButton from './GreenButton';
import tw from 'tailwind-react-native-classnames';

export default function App() {

  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  }

  const handleDecrement = () => {
    setCount(count - 1);
  }

  const handleReset = () => {
    setCount(0);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, tw`font-bold text-xl mb-3`]}>Your count:</Text>
      <Text style={[styles.text, tw`font-bold text-4xl mb-5`]}>{count}</Text>
      <View>
        <GreenButton pressHandler={handleIncrement} text={"Increment"} />
        <GreenButton pressHandler={handleDecrement} text={"Decrement"} />
        <GreenButton pressHandler={handleReset} text={"Reset"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  }
});
