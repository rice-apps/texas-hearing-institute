import { Text } from 'react-native'; 

type ColoredTextProps = {
    style: any;
    children: any;
}

export default function ColoredText({ style = {}, children } : ColoredTextProps) {
    return (
        <Text style={[style, {color: "#333333"}]}>
            {children}
        </Text>
    )
}