import { Text, StyleSheet } from 'react-native';
import ColoredText from './ColoredText';

type SubTitleTextProps = {
    children: string
}

/**
 * A component that displays subtitle text.
 */
export default function SubTitleText({ children } : SubTitleTextProps) {
    return (
        <ColoredText style={styles.title}>
            {children}
        </ColoredText>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: '400',
        marginTop: 6,
        marginBottom: 6
    }
})