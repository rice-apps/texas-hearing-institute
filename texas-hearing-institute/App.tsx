import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={tw`text-3xl font-extralight italic underline`}>Open up App.tsx to start working on your app!</Text>
      <Button
        // style={styles.loginScreenButton}
        title="Press me"
        color="#FFFFFF"
        onPress={() => Alert.alert('First Button pressed')}
      />
      {/* <button><img src={"./img/google.png"} /></button> */}
      <TouchableOpacity style={styles.loginScreenButton} 
      onPress={() => Alert.alert('Second Button pressed')}>
        <Text style={styles.text}>Press Here</Text>
      </TouchableOpacity>

    </View >
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
  loginScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  text:{
    color: '#ffff'
  }
});
