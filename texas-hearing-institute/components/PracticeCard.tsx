import React, { useState, Component} from 'react'
import { Card } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import Constants from 'expo-constants';
//import { Button } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import * as Speech from 'expo-speech';

// import ProgressBar from "../Progress";


const syllables = ["pee paw", "pee po", "pee pie", "the", "quick", "brown", "fox"];
const text = "pee paw";
/*
TODO: custom audio button
link to consonants page
text-to-speech
track correct/incorrect answers
*/

const PracticeCard = ({phoneme}:{phoneme:string}) => {
  const thingToSay = 'pee paw';
  // const speak = (text:string) => {
  //   Speech.speak(text, { rate: 1, pitch: 1, volume: 1 });
  // };
    const[correct, setCorrect] = useState(false);
    const toggleCorrect = (bool:boolean) => {
        setCorrect(bool);
        return true;
    }

    return(
    <View style={[styles.container, 
      {
        flexDirection: 'column',
      }]}>
        {/* PROGRESS AREA ==================================================*/}
        <View style={styles.container}>
          <View style={[styles.container, 
          {flexDirection: 'row',
            alignContent:'space-between',
            // backgroundColor: 'red',

          }]}>
        </View>
      

      
    </View>
    


    <View style={[styles.practiceArea, 
      {
        flexDirection: 'column',
      }]}>
        
        <View style={[styles.practice, {flexDirection: 'row',}]}>
            <Text style={tw `text-3xl pt-6`}>Pee Paw</Text> 
          <AudioButton someText={text}></AudioButton> 
            {/* set timer 2 seconds to change icon back */}
    
        </View>
    </View>
      {/* GREEN CHECK AND RED X BUTTONS================================================== */}
    <View style={[styles.buttonArea,
      {flexDirection:'row',
      alignContent: 'space-around'}]}>
        <Pressable style={({ pressed }) => [
          styles.circleButton, {backgroundColor: "red", width:80, height:80}, pressed? styles.pressed : styles.circleButton
        ]} onPress={() => toggleCorrect(false)}>
         <Icon name="times" size={40} color="black"></Icon>
        </Pressable>
        <Pressable style={({ pressed }) => [
          styles.circleButton, {backgroundColor: "green", width:80, height:80}, pressed? styles.pressed : styles.circleButton
        ]} onPress={() => toggleCorrect(true)}>
          <Icon name="check" size={40} color="black"></Icon>
        </Pressable>
      </View>
    </View>
  
    )
  }
  

  const AudioButton = ({someText}: {someText:string}) => {
    const [isPlaying, setIsPlaying] = useState(false);
  
    const startPlay = () => {
      //TODO fix button functionality
      setIsPlaying(!isPlaying);
      Speech.speak(someText);
      setIsPlaying(isPlaying)
      // add logic to play/pause audio here
  
    };
  
    return (
      //  TEXT TO SPEECH BUTTON==================================================
      <View>
        <Pressable style={({ pressed }) => [
          styles.circleButton, {backgroundColor: "#cfcdcc", width:40, height:40}, pressed? styles.pressed : styles.circleButton
        ]} onPress={startPlay}>
          <Icon
            name={isPlaying ? 'pause' : 'play'}
            size={20}
            color="black"
          />
        </Pressable>
      </View>
      
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex:1.5,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      padding: 20,
      marginTop: 20,
      
    },
    buttonArea:{
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'space-around',
  
    },
    practiceArea:{
      flex:3,
      justifyContent: 'center',
      
    },
    box: {
      flex: 1,
      backgroundColor: '#e3dfde',
      justifyContent: 'space-between',
      marginTop: 20,
      borderRadius: 20,
    },
    // closeButton: {
    //   display: 'flex', 
    //   flex: 0.2,
    //   width: 60,
    //   height: 70,
    //   backgroundColor: "fffff",
    //   borderRadius: 40,
    //   alignItems: 'center',
      
    // },
    pressed: {
    
      backgroundColor: 'black',
    },
    circleButton: {
      borderRadius: 50,
      justifyContent: 'center',
      marginHorizontal: 40,
      alignContent: 'space-around',
      alignItems: "center",
      
    },
    practice:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text1: {
      fontSize: 34
    },
    text2: {
      fontSize: 22,
    },
    text3: {
      fontSize: 18
    },
  });

  export default PracticeCard;
