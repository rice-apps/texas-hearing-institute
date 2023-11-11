import React from 'react';
import { Text, StyleSheet } from 'react-native';

type SubTitleTextProps = {
    children: string
}

/**
 * A component that displays subtitle text.
 */
export default function SubTitleText({ children } : SubTitleTextProps) {
    return (
        <Text style={styles.title}>
            {children}
        </Text>
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