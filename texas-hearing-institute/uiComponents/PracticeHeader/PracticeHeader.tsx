import CustomSafeAreaView from "../../utilComponents/CustomSafeAreaView/CustomSafeAreaView";
import {ScrollView, Text, View} from "react-native";
import styles from "../../pages/Onboarding/OnboardingStyle";
import ProgressBar from "../../utilComponents/ProgressBar/ProgressBar";
import {PracticeExitButton} from "./PracticeExitButton";

export const PracticeHeader = () => {
    return <View style={{
        marginTop: 16,
        marginHorizontal: 24
    }}>
        <View style={{
            marginBottom: 16,
            height: 26,
            width: "100%",
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
        }}>
            <Text style={{
                fontSize: 16
            }}>20/20</Text>
            <PracticeExitButton
                enabled={true}
                onTap={() => {
                    console.log("hi")
                }}
            />
        </View>
        <ProgressBar progress={100} height={12} foregroundColor={'#AFE4F9'} backgroundColor={'#D9D9D950'}/>
    </View>
}