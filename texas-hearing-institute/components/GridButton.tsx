import React, { useEffect, useState } from 'react';
import { ScrollView,  TouchableOpacity, Text, View, StyleSheet  } from 'react-native';
import ToggleableButton from './ToggleableButton';

const GridButton: React.FC = () => {
  
  return (
    <SingleSelectionButtons/>
    // <View>
    //   <View style={buttonStyles.container}>{renderButtons()}</View>
    //   {/* <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10 }}>
    //     Toggled Buttons: {Object.keys(buttonData).filter((label) => buttonData[label]).join(', ')}
    //   </Text> */}
    // </View>
  );
};

const buttonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent:"center",
    padding: 15
  },
}
);

export default GridButton


const SingleSelectionButtons = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonId: any) => {
    setSelectedButton(buttonId);
  };

  const renderButtons = () => {
    const buttonData = [
      { id: 1, label: 'p' },
      { id: 2, label: 'b' },
      { id: 3, label: 'm'},
      { id: 4, label: 'w'},
      { id: 5, label: 'h'},
      { id: 6, label: 'f'},
      { id: 7, label: 'd'},
      { id: 8, label: 'n'},
      { id: 9, label: 'y'},
      { id: 10, label: 'k'},
      { id: 11, label: "g"},
      { id: 12, label: 's'},
      { id: 13, label: "z"},
      { id: 14, label: 'Sh'},
      // Add more buttons as needed
    ];

    return buttonData.map((button) => (
      <TouchableOpacity
        key={button.id}
        style={[styles.button, selectedButton === button.id && styles.selectedButton]}
        onPress={() => handleButtonPress(button.id)}
      >
        <Text style={styles.buttonText}>{button.label}</Text>
      </TouchableOpacity>
    ));
  };

  return <View style={styles.container}>{renderButtons()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    flexWrap: "wrap",

  },
  button: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 3,
    borderColor: "#D9D9D9",
    borderWidth: 1.5,

  },
  selectedButton: {
    backgroundColor: '#AFE4F9',
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16
  },
});
