import 'react-native-gesture-handler';
import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import AppNavigator from './pages/AppNavigator';
import { UserProvider } from './user/UserContext';

export default function App() {
	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<UserProvider>
				<AppNavigator />
			</UserProvider>
		</ApplicationProvider>
	);
}
