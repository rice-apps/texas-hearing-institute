import { Alert, View, Platform } from 'react-native';
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
					buttonType={
						AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
					}
					buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
					cornerRadius={25}
					style={{ width: 300, height: 52 }}
					onPress={async () => {
						try {
							const credential = await AppleAuthentication.signInAsync({
								requestedScopes: [],
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

									// search for user.id in parentuser in children
									const { data } = await supabase
										.from('children')
										.select('id, name, clinician, child_id')
										.eq('parentuser', user.id)
										.maybeSingle();
									if (data) {
										// existing user
										currUser.setName(data.name);
										currUser.setID(data.id);
										currUser.setChildID(data.child_id);
										// fetch group id from clinicians
										const { data: clinicianData } = await supabase
											.from('clinicians')
											.select('groupId')
											.eq('id', data.clinician)
											.single();
										currUser.setGroupId(clinicianData?.groupId);
										setUser(currUser);
										// navigate home
										appNavigation.reset({
											index: 0,
											routes: [{ name: 'Home' }],
										});
									} else {
										currUser.setShowTutorial(true);
										setUser(currUser);
										// new user
										authNavigation.navigate('InfoInput', { id: user.id });
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
		const {
			data: { user },
			error,
		} = await supabase.auth.signInWithPassword({
			email: encryptedEmail,
			password: password,
		});

		if (!error && user) {
			// TODO: lots of error handling in this block
			// User is signed in.
			const currUser = new User();

			// search for user.id in parentuser in children
			const { data } = await supabase
				.from('children')
				.select('id, name, clinician, child_id')
				.eq('parentuser', user.id)
				.maybeSingle();
			if (data) {
				// existing user
				currUser.setName(data.name);
				currUser.setID(data.id);
				currUser.setChildID(data.child_id);
				// fetch group id from clinicians
				const { data: clinicianData } = await supabase
					.from('clinicians')
					.select('groupId')
					.eq('id', data.clinician)
					.single();
				currUser.setGroupId(clinicianData?.groupId);
				setUser(currUser);
				// navigate home
				setLoading(false);
				appNavigation.reset({
					index: 0,
					routes: [{ name: 'Home' }],
				});
			} else {
				setUser(currUser);
				// new user
				setLoading(false);
				authNavigation.navigate('InfoInput', { id: user.id });
			}
		} else if (error) {
			setLoading(false);
			throw error;
		} else {
			setLoading(false);
			throw new Error('Unknown sign-in error');
		}
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
		const {
			data: { user },
			error,
		} = await supabase.auth.signUp({
			email: encryptedEmail,
			password: password,
		});

		if (!error && user) {
			// TODO: lots of error handling in this block
			// User is signed in.
			const currUser = new User();

			// search for user.id in parentuser in children
			const { data } = await supabase
				.from('children')
				.select('id, name, clinician, child_id')
				.eq('parentuser', user.id)
				.maybeSingle();
			if (data) {
				// existing user
				currUser.setName(data.name);
				currUser.setID(data.id);
				currUser.setChildID(data.child_id);
				// fetch group id from clinicians
				const { data: clinicianData } = await supabase
					.from('clinicians')
					.select('groupId')
					.eq('id', data.clinician)
					.single();
				currUser.setGroupId(clinicianData?.groupId);
				setUser(currUser);
				// navigate home
				setLoading(false);
				appNavigation.reset({
					index: 0,
					routes: [{ name: 'Home' }],
				});
			} else {
				setUser(currUser);
				// new user
				setLoading(false);
				authNavigation.navigate('InfoInput', { id: user.id });
			}
		} else if (error) {
			setLoading(false);
			throw error;
		} else {
			setLoading(false);
			throw new Error('Unknown sign-up error');
		}

		setLoading(false);
	}
	return (
		<View style={{ width: 326, marginBottom: 20 }}>
			<View>
				<Input
					label="Email"
					onChangeText={(text) => emailSetter(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={'none'}
					labelStyle={{ color: '#333', marginBottom: 12, fontWeight: '300' }}
					inputContainerStyle={{
						borderWidth: 2,
						borderBottomWidth: 2,
						borderColor: '#DBDBDB',
						borderRadius: 10,
						padding: 10,
						height: 48,
					}}
					inputStyle={{ fontSize: 14 }}
					containerStyle={{ height: 100 }}
				/>
			</View>
			<View style={{ marginBottom: 12 }}>
				<Input
					label="Password"
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={'none'}
					labelStyle={{ color: '#333', marginBottom: 12, fontWeight: '300' }}
					inputContainerStyle={{
						borderWidth: 2,
						borderBottomWidth: 2,
						borderColor: '#DBDBDB',
						borderRadius: 10,
						padding: 10,
						height: 48,
					}}
					inputStyle={{ fontSize: 14 }}
					containerStyle={{ height: 100 }}
				/>
			</View>
			<View style={{ marginBottom: 16, alignItems: 'center' }}>
				<Button
					title="Log In"
					disabled={loading}
					onPress={() => signInWithEmail()}
					buttonStyle={{
						borderRadius: 32,
						backgroundColor: '#AFE4F9',
						height: 48,
						width: 200,
					}}
					titleStyle={{ color: '#333', fontWeight: 'bold', fontSize: 18 }}
				/>
			</View>
			<View style={{ alignItems: 'center' }}>
				<Button
					title="Create Account"
					disabled={loading}
					onPress={() => signUpWithEmail()}
					buttonStyle={{
						borderRadius: 32,
						backgroundColor: '#AFE4F9',
						height: 48,
						width: 200,
					}}
					titleStyle={{ color: '#333', fontWeight: 'bold', fontSize: 18 }}
				/>
			</View>
		</View>
	);
}
