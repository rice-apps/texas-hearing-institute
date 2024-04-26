import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './pages/AppNavigator';
import { UserProvider } from './user/UserContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<UserProvider>
				<AppNavigator />
			</UserProvider>
		</GestureHandlerRootView>
	);
}
