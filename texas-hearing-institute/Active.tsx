import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Active() {
    return(
    <View style={[styles.container, 
      {
        flexDirection: 'column',
      }]}>
    <View style={[styles.practiceArea, 
      {
        flexDirection: 'column',
      }]}>
        <View style = {[styles.backButton, 
          {flexDirection:'row',}]}>
        <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Icon style={tw `p-5`} name="chevron-left" size={25} color="black">
            <Text style={[tw `text-2xl`]}>Sound Settings</Text>
            </Icon>
          
        </Pressable>
        </View>
        <View style={styles.practice}>
          <Text style={tw `text-2xl pt-2 pl-2`}>PRACTICE SYLLABLES</Text>
        </View>
        
    </View>
  
    <View style={[styles.buttonArea,
      {flexDirection:'row',
      alignContent: 'space-around'}]}>
        <Pressable style={({ pressed }) => [
          styles.circleButton, {backgroundColor: "green"}, pressed? styles.pressed : styles.circleButton
        ]}>
          <Icon name="check" size={40} color="black"></Icon>
        </Pressable>
        <Pressable style={({ pressed }) => [
          styles.circleButton, {backgroundColor: "red"}, pressed? styles.pressed : styles.circleButton
        ]}>
         <Icon name="times" size={40} color="black"></Icon>
        </Pressable>
      </View>
    </View>
  
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:2.7,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      padding: 20,
      marginTop: 20,
      
    },
    buttonArea:{
      flex: 2,
      //backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'space-around',
  
    },
    practiceArea:{
      flex:3,
      //backgroundColor: 'yellow',
      justifyContent: 'center',
    },
    box: {
      flex: 1,
      backgroundColor: '#e3dfde',
      justifyContent: 'space-between',
      marginTop: 20,
      borderRadius: 20,
    },
    backButton: {
      flex: 0.2,
      width: 220,
      height: 70,
      backgroundColor: "fffff",
      justifyContent: "center",
      borderRadius: 40,
      alignItems: 'center',
  
    },
    pressed: {
    
      backgroundColor: 'black',
    },
    circleButton: {
      borderRadius: 50,
      justifyContent: 'center',
      width: 80,
      height: 80,
      marginHorizontal: 40,
      alignContent: 'space-around',
      alignItems: "center",
      
    },
    practice:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: 'red',
    }
  });
  