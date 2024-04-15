import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import AppNavigator from './pages/Onboarding/AppNavigator';
export default function App() {
	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<AppNavigator />
		</ApplicationProvider>
	);
}
