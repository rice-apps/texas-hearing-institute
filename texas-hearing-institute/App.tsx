import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';
// import HomeScreen from './components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
type RootStackParamList = {
  Home: undefined, // undefined because you aren't passing any params to the home screen
  Profile: { name: string }; 
};

const Stack = createNativeStackNavigator();


// const Stack = createNativeStackNavigator()
function App() {
  return ( 
    <NavigationContainer> 
      <Stack.Navigator> 
        <Stack.Screen name="HomeScreen" component = {HomeScreen} /> 
      </Stack.Navigator> 
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c59ede',
    alignItems: 'center',
    justifyContent: 'center',
  },
  custombutton: {
    backgroundColor: '#c59ede',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    borderRadius: 20,
    letterSpacing: 0.25,
    color: 'black',
  },

});

// const NewScreen = ({navigation}) => {
//   return (
//     <View>
//       <Text>This is the New Screen</Text>
//       <Pressable onPress={() => {
//           // Handle button click here
//           navigation.navigate('HomeScreen')
//         }}>
//         <Text>Back to Home!</Text>
//       </Pressable> 
//     </View>
//   );
// };

function HomeScreen(){
  return (
    <View style={styles.container}>
      <Text style={tw`text-3xl font-bold underline`}>Hello world!</Text>
      <Pressable style={styles.custombutton} onPress={() => {
          // Handle button click here
          alert("Hello!")
        }}>
        <Text style={styles.text}>Click Me!</Text>
      </Pressable> 
      <StatusBar style="auto" />
    </View>
  );
}


export default App;
