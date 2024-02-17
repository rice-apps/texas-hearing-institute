import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { AccountPage } from './pages/AccountPage/AccountPageMain';
import { User } from './user/User';

export default function App() {
	return (
		<View style={styles.container}>
			<SafeAreaView
				style={{
					width: '100%',
				}}
			>
				<AccountPage user={new User()} />
			</SafeAreaView>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
