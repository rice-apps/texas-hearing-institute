import { Alert, StyleSheet, View, AppState, Platform } from 'react-native';
import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import CryptoJS from 'crypto-es';
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '../lib/supabase';
import { useContext } from 'react';
import { UserContext, UserContextType } from '../user/UserContext';
import { User } from '../user/User';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../pages/Onboarding/AuthNavigator';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../pages/AppNavigator';

AppState.addEventListener('change', (state) => {
	if (state === 'active') {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});  	

export default function Auth() {
  const { setUser } = useContext(UserContext) as UserContextType;

	type AppNav = StackNavigationProp<AppStackParamList>;
	const appNavigation = useNavigation<AppNav>();
	type AuthNav = StackNavigationProp<AuthStackParamList>;
	const authNavigation = useNavigation<AuthNav>();
  
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
								if (!error && user) {
									// TODO: lots of error handling in this block
									// User is signed in.
									const currUser = new User();
									currUser.setID(user.id);

									// search for user.id in parentuser in children
									const { data } = await supabase
										.from('children')
										.select('name, clinician')
										.eq('parentuser', user.id)
										.maybeSingle();
									if (data) {
										// existing user
										currUser.setName(data.name);
										// fetch group id from clinicians
										const { data: clinicianData } = await supabase
											.from('clinicians')
											.select('groupId')
											.eq('id', data.clinician)
											.single();
										currUser.setGroupId(clinicianData?.groupId);
										setUser(currUser);
										// navigate home
										appNavigation.navigate('Home');
									} else {
										setUser(currUser);
										// new user
										authNavigation.navigate('InfoInput');
									}
								} else if (error) {
									throw error;
								} else {
									throw new Error('Unknown sign-in error');
								}
							} else {
								throw new Error('No identityToken.');
							}
						} catch (e: unknown) {
							console.log(e);
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
