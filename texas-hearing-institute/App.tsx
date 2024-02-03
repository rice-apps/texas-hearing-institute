//APP STUFF===============================================================================================================
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';

// import PropTypes from 'prop-types';
// import * as Speech from 'expo-speech';
// import PracticeCard from './components/PracticeCard';
// import 

// import ProgressBar from "../Progress";
/*
TODO: custom audio button
link to consonants page
text-to-speech
track correct/incorrect answers
*/

export default function App() {
  return (
    <NavigationContainer>{
    <View style={[styles.container, 
    {
      flexDirection: 'column',
    }]}>
      <Text style={tw`text-3xl font-bold pt-10`}>Good morning Bob!</Text>
      <Text style={tw`text-base pt-6`}>Let's get practicing!</Text>
   
      <Icon style={tw `p-5`} name="circle" size={25} color="black">
      <Text style={tw`text-2xl font-bold pt-6`}>  Speech Babble</Text>
            </Icon>
      
      <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Vowels</Text>
      </Pressable>
        
      <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Initial Consonants</Text>
      </Pressable> 
        <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Final Consonants</Text>
        </Pressable>

        <Icon style={tw `p-5`} name="circle" size={25} color="black">
      <Text style={tw`text-2xl font-bold pt-6 mx-5 mt-1`}>  Listening Babble</Text>
            </Icon>
       <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Variegated Vowels</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Voicing</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Manner</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-lg pt-2 pl-2 mx-5 mt-1`}>Place Cue</Text>
        </Pressable>
        
        
      <StatusBar style="auto" />
      
    </View>

     //<View style={styles.container}><Text>Hello world</Text></View>
     ////   <Text>Speech Babble</Text>
     //<Button>button</Button>
     //

    }</NavigationContainer>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    
  },
  box: {
    flex: 0.25,
    backgroundColor: '#e3dfde',
    justifyContent: 'space-between',
    //alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
  pressed: {
    backgroundColor: '#a19e9d',

  }
}
);
    
