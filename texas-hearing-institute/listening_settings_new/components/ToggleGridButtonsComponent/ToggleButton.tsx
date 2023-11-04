import {Text, TouchableOpacity} from 'react-native';
import styles from './ToggleButtonStyle';

interface Props {
    title: string;
    isToggled: boolean;
    onToggle: (newValue: boolean) => void;
}

export default function ToggleButton({title, isToggled, onToggle}: Props) {
    return (
        <TouchableOpacity
            style={[styles.button, isToggled ? styles.buttonActive : styles.buttonInactive]}
            onPress={() => onToggle(!isToggled)}>
            <Text
                style={[styles.buttonText, isToggled ? styles.buttonTextActive : styles.buttonTextInactive]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}