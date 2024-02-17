import React from 'react';
import { StatusBar } from 'react-native';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import PracticeNavigator from './pages/PracticeNavigator';

export default function App() {
	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<StatusBar barStyle="dark-content" />
			<PracticeNavigator />
		</ApplicationProvider>
	);
}
