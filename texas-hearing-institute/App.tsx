import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames';
import ListEntry from './components/ListEntry';


export default function App() {

  const [list, setList] = useState<String[]>([]);
  const [input, setInput] = useState("");

  const updateList = (entry:String) => {
    setList(list.concat(entry))
    setInput("")

  }

  const removeItem = (index:number) => {
    setList(list.splice(index,1))
  }

  return (
    <View style={styles.container}>
      <Text style={tw`text-3xl font-bold underline`}>Enter words:</Text>

      <TextInput style={tw`m-5 text-base text-green-500`} value={input} onChangeText={setInput} placeholder='Enter new entries'/>
      <Button disabled={input===""} onPress={() => updateList(input)} title={"Enter text"}/>  

      <View style={tw``}>
      {list.map(
        (entry:String,index:number) => {
          console.log(index)
          return <ListEntry key={index} index={index} remove={removeItem} text={entry}/>
        }
      )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
