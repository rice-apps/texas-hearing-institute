import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth.native';
//import Account from './components/Account'
import { View } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { Button } from 'react-native-elements';
import React from 'react';
import 'react-native-url-polyfill/auto';
import { StatusBar } from 'react-native';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import PracticeNavigator from './pages/PracticeNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './components/TabNavigator';
//import Account from './components/Account'

/*
async function signOut() {
	const { error } = await supabase.auth.signOut();
	if (error) {
		throw error;
	}
}
*/

export default function App() {
	/*
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);
	*/

	return (
		<SafeAreaProvider>
			<ApplicationProvider {...eva} theme={eva.light}>
				<StatusBar barStyle="dark-content" />
				<TabNavigator />
			</ApplicationProvider>
		</SafeAreaProvider>
	);
}
