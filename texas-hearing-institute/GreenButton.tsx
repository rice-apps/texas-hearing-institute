import { Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import tw from 'tailwind-react-native-classnames';

export default function GreenButton({ pressHandler, text }) {
    const [pressed, setPressed] = useState(false);

    return (
        <View style={tw`m-3`}>
            <Pressable
                onPressIn={() => setPressed(true)}
                onPress={pressHandler}
                onPressOut={() => setPressed(false)}
                style={[tw`p-5 rounded-lg`, pressed ? tw`bg-green-600` : tw`bg-green-500`]}
            >
                <Text style={tw`text-white font-bold text-center`}>{text}</Text>
            </Pressable>
        </View>
    )
}
