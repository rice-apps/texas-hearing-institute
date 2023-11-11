import {Pressable, ScrollView, Text, View} from "react-native";
import styles from "../Onboarding/OnboardingStyle";
import {SvgXml} from "react-native-svg";
import pencil from "../../icons/pencil";
import ToggleGridButtons from "../../utilComponents/ToggleGridButtonsComponent/ToggleGridButtons";
import {consonants, vowels} from "../../util/soundInventoryDataAndKeys";
import CustomSafeAreaView from "../../utilComponents/CustomSafeAreaView/CustomSafeAreaView";
import {PracticeHeader} from "../../uiComponents/PracticeHeader/PracticeHeader";

export const PracticeStats = () => {
    return <CustomSafeAreaView>
        <View>
            <PracticeHeader />
        </View>
    </CustomSafeAreaView>
}