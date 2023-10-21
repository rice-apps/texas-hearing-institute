import { Text, View, TouchableOpacity } from 'react-native';
import styles from './ToggleButtonStyle';

interface Props {
    title: string;
    isToggled: boolean;
    onToggle: (newValue: boolean) => void;
}

const ToggleButton: React.FC<Props> = ({ title, isToggled, onToggle }) => {
    return (
        <TouchableOpacity style={[styles.button, isToggled ? styles.buttonActive : styles.buttonInactive]} onPress={() => onToggle(!isToggled)}>
            <Text style={[styles.buttonText, isToggled ? styles.buttonTextActive : styles.buttonTextInactive]}>{title}</Text>
        </TouchableOpacity>
    );
}
    
export default ToggleButton;