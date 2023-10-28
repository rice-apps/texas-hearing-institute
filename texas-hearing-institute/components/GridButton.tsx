import React, { useEffect, useState } from 'react';
import { ScrollView,  TouchableOpacity, Text, View, StyleSheet  } from 'react-native';
import ToggleableButton from './ToggleableButton';

const GridButton: React.FC = () => {
  const [buttonData, setButtonData] = useState<{ [key: string]: boolean }>({});

  const handleButtonToggle = (label: string, isToggled: boolean) => {
    setButtonData((prevButtonData) => ({ ...prevButtonData, [label]: isToggled }));
  };

  useEffect(()=>{
    console.log(buttonData)
  },[buttonData])
  
  const renderButtons = () => {
    const buttonLabels = [
      'Ah', 'a', 'Bh', 'bh', 'C','Wh', 'w', 'Xh', 'x',
      'Yh', 'yh', 'Z', 'z'
    ]
    

    return buttonLabels.map((label, index) => (
      <ToggleableButton key={index} label={label} onToggle={handleButtonToggle}  />
    ));
  };

  return (
    <View>
      <View style={buttonStyles.container}>{renderButtons()}</View>
      {/* <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10 }}>
        Toggled Buttons: {Object.keys(buttonData).filter((label) => buttonData[label]).join(', ')}
      </Text> */}
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent:"center",
    padding: 15
  },
});

export default GridButton