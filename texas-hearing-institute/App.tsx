import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';
const App = () => {
  const cards = [1,2,3,4];

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
