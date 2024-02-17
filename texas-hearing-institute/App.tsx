//SWIPE VERSION 2, this one logs swipe history
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';


const App = () => {
  const cards = ['lol', 'lmao', 'rofl', 'wtf', 'omw'];
  return (
    <View style={styles.container}> 
      <Swiper
        cards={cards}
        renderCard={(card) => (
          <View style={styles.card}>
            <Text style={styles.text}>{card}</Text>
          </View>

        )}
        onSwiped={(cardIndex) => {
          console.log(`Swiped card index: ${cardIndex}`);
        }}
        onSwipedAll={() => {
          console.log('All cards have been swiped');
        }}
        cardIndex={0}
        backgroundColor="#4FD0E9"
        stackSize={3}
      >
      </Swiper>
      <Text>Swipe right to mark <Text style={{ fontWeight: 'bold', color: '#A4C639' }}>CORRECT</Text></Text>
      <Text></Text>
      <Text>Swipe left to mark <Text style={{ fontWeight: 'bold', color: 'red' }}>STILL LEARNING</Text></Text>

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
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'lightgray',
  },
  text: {
    fontSize: 30,
    //fontWeight: 'bold',
  },
});

export default App;
