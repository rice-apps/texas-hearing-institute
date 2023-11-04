import { View } from 'react-native';

type ScreenViewProps = {
    children : any
}

/**
 * A component that controls the padding for each screen.
 */
export default function ScreenView({ children } : ScreenViewProps) {
    return (
        <View style={{ paddingLeft: 32, paddingRight: 32, paddingTop: 20}}>
            {children}
        </View>
    )
}