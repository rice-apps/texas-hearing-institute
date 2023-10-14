import { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native"
import tw from 'tailwind-react-native-classnames';

type NameProps = {
    name: string;
  };
  

export default function Name(props : NameProps) { 
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [bgColor, setBgColor] = useState('#ffffff');

    const getRandomColor = () => {
      const colors = ['bg-red-500', 'bg-green-500', 'bg-black-500', 'bg-pink-500', 'bg-blue-500'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(randomColor);
    };
  
    const fetchData = async () => {
      try {
        await fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json()).then(data => console.log(data))
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      fetchData();
    }, []);

    return <View style={tw`justify-center items-center ${bgColor} `}       >
        <Text style={tw`text-3xl`}>Hello, {props.name}</Text>
       <Button
        onPress={() => {
        setIsButtonPressed(!isButtonPressed);
        }}
        title={isButtonPressed ? 'Clap Here !' : 'Lets do it again'}/>
        <TextInput
        style={{height: 40}}
        placeholder="Type here!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        />
        <Button title="Change Background Color" onPress={getRandomColor} />

        {
            props.name === "PAUL" ? 
            <View>
            <Text>Data from API: {data}</Text>
            </View> : 
            <View/>
        }
    </View>
}