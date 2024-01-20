import {TouchableOpacity, View} from "react-native";
import {SvgXml} from "react-native-svg";
import xmark from "../../icons/xmark";

interface Props {
    enabled: boolean,
    onTap: () => void
}

export const PracticeExitButton: React.FC<Props> = ({enabled, onTap}) => {
    const targetSize = 44
    const displaySize = 26
    const hitSlop = (targetSize - displaySize) / 2

    return <TouchableOpacity
        hitSlop={hitSlop}
        onPress={onTap}
        disabled={!enabled}
    >
        <View
            style={{
                width: displaySize,
                height: displaySize,
                borderRadius: 50,
                backgroundColor: '#D9D9D950',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <SvgXml xml={xmark} width={9.71} height={9.95} />
        </View>
    </TouchableOpacity>
}