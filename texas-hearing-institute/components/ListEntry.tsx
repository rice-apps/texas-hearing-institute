import {Button,Text,View} from 'react-native'
import tw from 'tailwind-react-native-classnames'; 

interface ListEntryType{
    index:number,
    text:String,
    remove:(index:number)=> void
}

const ListEntry = (props: ListEntryType) => {
    return(
        <View style={tw`flex flex-row`}>
            <Text>{props.text}</Text>
            <Button onPress={() => props.remove(props.index)}  title={"x"}/>
        </View>
    )
}

export default ListEntry