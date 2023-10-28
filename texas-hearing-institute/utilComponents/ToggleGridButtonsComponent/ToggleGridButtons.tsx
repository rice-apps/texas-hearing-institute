import { Text, View, StyleSheet } from 'react-native';
import ToggleButton from './ToggleButton';
import { useState } from 'react';

interface Props {
    items: string[];
    itemsSelected: boolean[];
    setItemsSelected: (index: number, newValue: boolean) => void;
    disabled?: boolean
}

const ToggleGridButtons: React.FC<Props> = ({ items, itemsSelected, setItemsSelected,disabled }) => {
    return (
        <View style={styles.container}>
            {items.map((item, index) => (
                <View style={{
                    marginRight: 12,
                    marginBottom: 12,
                }} key={index}>
                    <ToggleButton 
                        title={item}
                        isToggled={itemsSelected[index]} 
                        onToggle={
                            (newValue: boolean) => {
                            disabled ? () => {} : setItemsSelected(index, newValue) 
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