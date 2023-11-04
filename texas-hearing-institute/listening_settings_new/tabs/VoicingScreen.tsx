import { View, Text } from 'react-native';
import TitleText from '../components/TitleText';
import SubTitleText from '../components/SubTitleText';
import ScreenView from '../components/ScreenView';

export default function VoicingScreen() {
    return (
        <ScreenView>
            <TitleText>Voicing</TitleText>
            <SubTitleText>Do something with voicing</SubTitleText>
            {/*Implement rest of voicing here*/}
        </ScreenView>
    )
}