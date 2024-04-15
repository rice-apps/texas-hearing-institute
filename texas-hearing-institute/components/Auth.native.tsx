import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Alert, StyleSheet, View, AppState } from 'react-native';
import { Button, Input } from 'react-native-elements';
import CryptoJS from 'crypto-es';
import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';

AppState.addEventListener('change', (state) => {
	if (state === 'active') {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

export default function Auth() {
	if (Platform.OS === 'ios') {
		return (
			<View>
				<AppleAuthentication.AppleAuthenticationButton
					buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
					buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
					cornerRadius={5}
					style={{ width: 200, height: 64 }}
					onPress={async () => {
						try {
							const credential = await AppleAuthentication.signInAsync({
								requestedScopes: [
									AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
									AppleAuthentication.AppleAuthenticationScope.EMAIL,
								],
							});
							// Sign in via Supabase Auth.
							if (credential.identityToken) {
								const {
									error,
									data: { user },
								} = await supabase.auth.signInWithIdToken({
									provider: 'apple',
									token: credential.identityToken,
								});
								console.log(JSON.stringify({ error, user }, null, 2));
								if (!error) {
									// User is signed in.
								}
							} else {
								throw new Error('No identityToken.');
							}
						} catch (e) {
							if (e.code === 'ERR_REQUEST_CANCELED') {
								// handle that the user canceled the sign-in flow
							} else {
								// handle other errors
							}
						}
					}}
				/>
			</View>
		);
	}

	const [email, setEmail] = useState('');
	const [encryptedEmail, setEncryptedEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	function emailSetter(email: string) {
		setEmail(email);
		if (email.indexOf('@') > 0) {
			let part1 = email.substring(0, email.indexOf('@'));
			const part2 = email.substring(email.indexOf('@'));
			part1 = CryptoJS.SHA256(part1).toString();
			setEncryptedEmail(part1 + part2);
		}
	}

	async function checkExists(encrypted: string) {
		const { data, error } = await supabase
			.from('users')
			.select('email')
			.eq('email', encrypted);

		if (error) {
			throw error;
		}

		return data.length > 0;
	}

	async function signInWithEmail() {
		setLoading(true);
		const flag = await checkExists(encryptedEmail);
		if (!flag) {
			Alert.alert('This user does not exist');
			setLoading(false);
			return;
		}
		const { error } = await supabase.auth.signInWithPassword({
			email: encryptedEmail,
			password: password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	}
	async function signUpWithEmail() {
		setLoading(true);
		const flag = await checkExists(encryptedEmail);
		if (flag) {
			Alert.alert('This user already exists');
			setLoading(false);
			return;
		}
		const { error: error } = await supabase.auth.signUp({
			email: encryptedEmail,
			password: password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	}
	const styles = StyleSheet.create({
		container: {
			marginTop: 40,
			padding: 12,
		},
		verticallySpaced: {
			paddingTop: 4,
			paddingBottom: 4,
			alignSelf: 'stretch',
		},
		mt20: {
			marginTop: 20,
		},
	});
	return (
		<View style={styles.container}>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Input
					label="Email"
					leftIcon={{ type: 'font-awesome', name: 'envelope' }}
					onChangeText={(text) => emailSetter(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={'none'}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Password"
					leftIcon={{ type: 'font-awesome', name: 'lock' }}
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={'none'}
				/>
			</View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					title="Sign in"
					disabled={loading}
					onPress={() => signInWithEmail()}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Button
					title="Sign up"
					disabled={loading}
					onPress={() => signUpWithEmail()}
				/>
			</View>
		</View>
	);
}
