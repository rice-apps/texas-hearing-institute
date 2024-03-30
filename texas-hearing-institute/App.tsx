import React from 'react';
// import TabNavigator from './components/TabNavigator'; -

// export default function App() { -

// } -

//====================================================

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import Swiper from 'react-native-deck-swiper';
// import ProgressBar from 'react-native-progress/Bar';
// import { RootStackParamList } from './pages/Home/types';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { Phoneme, PhonemeListProps, ReportInfo } from './pages/Home/types'
import { ApplicationProvider } from '@ui-kitten/components';
import TabNavigator from './components/TabNavigator';
import * as eva from '@eva-design/eva';

export default function App() {
	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<TabNavigator />
		</ApplicationProvider>
	);
}
