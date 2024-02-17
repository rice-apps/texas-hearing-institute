//SWIPE VERSION 2, this one logs swipe history
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useState } from 'react';


const App = () => {
  const cards = ['lol', 'lmao', 'rofl', 'wtf', 'omw', 'ngl','tbh'];
  const [isSwipedRight, setIsSwipedRight] = useState(false);
  const [isSwipedLeft, setIsSwipedLeft] = useState(false);

  const handleOnSwipedRight = () => {
    setIsSwipedRight(true);
  };
  const handleOnSwipedLeft = () => {
    setIsSwipedLeft(true);
  }
  return (
    <View style={styles.container}>
      <Swiper
        cards={cards}
        renderCard={(card) => (
          <View style={[styles.card, isSwipedRight && styles.greenBorder, 
          isSwipedLeft && styles.yellowBorder]}>
            <Text style={styles.text}>{card}</Text>
          </View>

        )}
        onSwiped={(cardIndex) => {
          console.log(`Swiped card index: ${cardIndex}`);
        }}
        onSwipedAll={() => {
          console.log('All cards have been swiped');
        }}
        // onSwipedRight={(cardIndex)=> {
        //   console.log(`Swiped card index: ${cardIndex} RIGHT`)
        // }}
        onSwipedRight={handleOnSwipedRight}
        onSwipedLeft={handleOnSwipedLeft}
        //cardIndex={0}
        backgroundColor="#F5F5F5" // background outside card
        stackSize={3}
      >
      </Swiper>
      <Text>Swipe right to mark <Text style={{ fontWeight: 'bold', color: '#34A853' }}>CORRECT</Text></Text>
      <Text>Swipe left to mark <Text style={{ fontWeight: 'bold', color: '#FBBC05' }}>STILL LEARNING</Text></Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  card: {
    flex: 0.4,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    
    borderWidth: 2,
    borderColor: 'lightgray',
    // width: 200,
    // length: 250,
    //aspectRatio:0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
  greenBorder: {
    borderColor: '#34A853', // Change border color to green when swipe right
  },
  yellowBorder: {
    borderColor: '#FBBC05', // Change border color to yellow when swipe left
  },
});

export default App;
