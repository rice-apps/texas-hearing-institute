import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth.native';
//import Account from './components/Account'
import { View, Text } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { Button } from 'react-native-elements';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

async function signOut() {
	const { error } = await supabase.auth.signOut();
	if (error) {
		throw error;
	}
	await GoogleSignin.signOut();
}

export default function App() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<View>
			<Text>Hello</Text>
			<Text>Hello</Text>
			<Text>Hello</Text>
			<Text>Hello</Text>
			<Text>Hello</Text>
			<Text>Hello</Text>
			<Text>Hello</Text>
			<Auth />
			{session && session.user && <Button title="Sign Out" onPress={signOut} />}
		</View>
	);
}
