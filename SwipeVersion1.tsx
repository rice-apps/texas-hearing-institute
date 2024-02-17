// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Swiper from 'react-native-deck-swiper';

// const DATA = [1,2,3,4]; // Your array of data items

// const App: React.FC = () => {
//   const renderCard = (item: any) => {
//     return (
//       <View style={styles.cardContainer}>
//         <View style={styles.card}>
//           <View style={styles.cardContent}>
//             <Text style={styles.cardText}>{item.title}</Text>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const onSwiped = () => {
//     // Handle swipe action
//   };

//   const onSwipedAll = () => {
//     // Handle when all cards have been swiped
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white' }}>
//       <Swiper
//         cards={DATA}
//         renderCard={renderCard}
//         onSwiped={onSwiped}
//         onSwipedAll={onSwipedAll}
//         cardIndex={0}
//         stackSize={2}
//         stackSeparation={15}
//         overlayLabels={{
//           left: {
//             title: 'still learning',
//             style: {
//               label: {
//                 backgroundColor: 'red',
//                 borderColor: 'red',
//                 color: 'white',
//                 borderWidth: 1,
//               },
//               wrapper: {
//                 flexDirection: 'column',
//                 alignItems: 'flex-end',
//                 justifyContent: 'flex-start',
//                 marginTop: 100,
//                 marginLeft: 90,
//               },
//             },
//           },
//           right: {
//             title: 'correct!',
//             style: {
//               label: {
//                 backgroundColor: 'green',
//                 borderColor: 'green',
//                 color: 'white',
//                 borderWidth: 1,
//               },
//               wrapper: {
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 justifyContent: 'flex-start',
//                 marginTop: 100,
//                 marginLeft: 10,
//               },
//             },
//           },
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     //backgroundColor: 'black',
//   },
//   cardContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     //backgroundColor: 'white',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     borderWidth: 4,
//     borderColor: 'lightgray',
//     elevation: 5,
//     width: 250,
//     aspectRatio:0.8,
//   },
//   cardContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%', // Set the height of the card content
//   },
//   cardText: {
//     textAlign: 'center',
//   },
// });

// export default App;