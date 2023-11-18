import {StyleProp, Text, TextStyle} from 'react-native';
import {ReactNode} from "react";

interface ColoredTextProps {
    style: StyleProp<TextStyle>;
    children: ReactNode;
}

export default function ColoredText({ style = {}, children } : ColoredTextProps) {
    return (
        <Text style={[style, {color: "#333333"}]}>
            {children}
        </Text>
    )
}