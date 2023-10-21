import { Text, View, StyleSheet } from 'react-native';
import ToggleButton from './ToggleButton';
import { useState } from 'react';

interface Props {
    items: string[];
    itemSelected: boolean[];
    setItemSelected: (index: number, newValue: boolean) => void;
}

const ToggleGridButtons: React.FC<Props> = ({ items, itemSelected, setItemSelected }) => {
    return (
        <View style={styles.container}>
            {items.map((item, index) => (
                <View style={{
                    marginRight: 12,
                    marginBottom: 12,
                }} key={index}>
                    <ToggleButton 
                        title={item}
                        isToggled={itemSelected[index]} 
                        onToggle={(newValue: boolean) => {
                            setItemSelected(index, newValue);
                        }}
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        width: '100%',
    },
});
    
export default ToggleGridButtons;