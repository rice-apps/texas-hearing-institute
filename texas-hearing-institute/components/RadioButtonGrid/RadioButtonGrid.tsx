import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import RadioCircle from "./RadioCircle";

interface Props {
    label: string;
    items: string[];
    selectedItemIndex: number;
    onSelect: (newValue: number) => void;
}

export default function RadioButtonGrid({label, items, selectedItemIndex, onSelect}: Props) {
    return (
        <View>
            <Text style={styles.gridLabel}>{label}</Text>
            {items.map((value, index) => {
                const isSelected = index == selectedItemIndex;
                return (
                    <View key={index}>
                        <TouchableOpacity
                            style={styles.button}
                            // Suppressing error because we don't need to use the event.
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            onPress={_ => {
                                onSelect(index)
                            }}>
                            <View style={styles.row}>
                                <Text style={styles.buttonLabel}>
                                    {value}
                                </Text>
                                {/* Spacer */}
                                <View style={{flex: 1}}/>
                                <RadioCircle selected={isSelected}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    gridLabel: {
        textTransform: "uppercase",
        color: '#333333',
        fontSize: 12
    },
    button: {
        borderRadius: 12,
        borderColor: 'rgba(217,217,217,0.5)',
        borderWidth: 2,
        height: 50,
        marginTop: 6,
        marginBottom: 6,
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: "#C0C0C0"
    },
    buttonLabel: {
        fontSize: 16,
        marginLeft: 16,
        color: '#333333',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
