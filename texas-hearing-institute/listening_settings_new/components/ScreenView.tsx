import { View } from 'react-native';

type ScreenViewProps = {
    children : any
}

/**
 * A component that controls the padding for each screen.
 */
export default function ScreenView({ children } : ScreenViewProps) {
    return (
        <View style={{ padding: 32}}>
            {children}
        </View>
    )
}