import { Text, StyleSheet } from 'react-native';
import ColoredText from './ColoredText';

type TitleTextProps = {
    children: string
}

/**
 * A component that displays Title text
 */
export default function TitleText({ children } : TitleTextProps) {
    return (
        <ColoredText style={styles.title}>
            {children}
        </ColoredText>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 6
    }
})