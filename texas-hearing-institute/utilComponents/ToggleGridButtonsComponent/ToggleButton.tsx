import { Text, TouchableOpacity } from 'react-native';
import styles from './ToggleButtonStyle';
import * as Speech from 'expo-speech'

interface Props {
    title: string;
    isToggled: boolean;
    onToggle: (newValue: boolean) => void;
    enabled: boolean;
}

const ToggleButton: React.FC<Props> = ({ title, isToggled, onToggle, enabled }) => {

    const speak = (text:string) : void => {
        Speech.speak(text,{rate:1,pitch:1,volume:1})
    };

    return (
        <TouchableOpacity style={[styles.button, isToggled ? styles.buttonActive : styles.buttonInactive]} onPress={() => {
                onToggle(!isToggled);
                speak(title)
            }
            } disabled={!enabled}>
            <Text style={[styles.buttonText, isToggled ? styles.buttonTextActive : styles.buttonTextInactive]}>{title}</Text>
        </TouchableOpacity>
    );
}
    
export default ToggleButton;