import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';


export default function Active() {
    <View style={[styles.container, 
        {
          flexDirection: 'column',
        }]}>
         <Pressable style={({ pressed }) => [
          styles.box, pressed? styles.pressed : styles.box
        ]}>
          <Text style={tw `text-2xl pt-2 pl-2`}>Back to Speech</Text>
        </Pressable>
    </View>
    
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
      flex: 1,
      backgroundColor: '#e3dfde',
      justifyContent: 'space-between',
      marginTop: 20,
      borderRadius: 20,
    },
    pressed: {
      backgroundColor: '#a19e9d',
  
    }
  });
  