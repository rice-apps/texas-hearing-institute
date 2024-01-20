import {Image, Pressable, ScrollView, Text, View} from "react-native";
import styles from "../Onboarding/OnboardingStyle";
import {SvgXml} from "react-native-svg";
import pencil from "../../icons/pencil";
import ToggleGridButtons from "../../utilComponents/ToggleGridButtonsComponent/ToggleGridButtons";
import {consonants, vowels} from "../../util/soundInventoryDataAndKeys";
import CustomSafeAreaView from "../../utilComponents/CustomSafeAreaView/CustomSafeAreaView";
import {PracticeHeader} from "../../uiComponents/PracticeHeader/PracticeHeader";

interface Props {
    userName: string
}

export const PracticeStats: React.FC<Props> = ({userName}) => {
    return <CustomSafeAreaView>
        <View>
            <PracticeHeader />
            <View style={{
                marginTop: 32,
                flexDirection: 'row',
                alignItems: 'center',
                width: "100%",
                position: "relative"
            }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginLeft: 32,
                        marginRight: 24 + 43 + 16
                    }}
                >
                    Woohoo! High five, { userName }!
                </Text>
                <Image
                    source = {require("../../images/highfive.png")}
                    style = {{
                        height: 43,
                        width: 43,
                        right: 24,
                        position: "absolute",
                    }}
                />
            </View>
        </View>
    </CustomSafeAreaView>
}