import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from '@react-native-google-signin/google-signin';
import { View, Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '../lib/supabase';

export default function Auth() {
	GoogleSignin.configure({
		scopes: [],
		webClientId:
			'238625413111-ps04v28r5o19v7lssabudkr123cjtnrf.apps.googleusercontent.com',
		iosClientId:
			'238625413111-n13uhletv4i0q5b85kvat11jcp1e11la.apps.googleusercontent.com',
	});

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
								requestedScopes: [],
							});
							console.log('Apple credentials');
							console.log(credential);
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
				<GoogleSigninButton
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Dark}
					onPress={async () => {
						try {
							await GoogleSignin.hasPlayServices();
							const userInfo = await GoogleSignin.signIn();
							if (userInfo.idToken) {
								const { data, error } = await supabase.auth.signInWithIdToken({
									provider: 'google',
									token: userInfo.idToken,
								});
								console.log(error, data);
							} else {
								throw new Error('no ID token present!');
							}
							//
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
						} catch (error: any) {
							if (error.code === statusCodes.SIGN_IN_CANCELLED) {
								// user cancelled the login flow
							} else if (error.code === statusCodes.IN_PROGRESS) {
								// operation (e.g. sign in) is in progress already
							} else if (
								error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
							) {
								// play services not available or outdated
							} else {
								// some other error happened
							}
						}
					}}
				/>
			</View>
		);
	}

	return (
		<GoogleSigninButton
			size={GoogleSigninButton.Size.Wide}
			color={GoogleSigninButton.Color.Dark}
			onPress={async () => {
				try {
					await GoogleSignin.hasPlayServices();
					const userInfo = await GoogleSignin.signIn();
					if (userInfo.idToken) {
						const { data, error } = await supabase.auth.signInWithIdToken({
							provider: 'google',
							token: userInfo.idToken,
						});
						console.log(error, data);
					} else {
						throw new Error('no ID token present!');
					}
					//
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (error: any) {
					if (error.code === statusCodes.SIGN_IN_CANCELLED) {
						// user cancelled the login flow
					} else if (error.code === statusCodes.IN_PROGRESS) {
						// operation (e.g. sign in) is in progress already
					} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
						// play services not available or outdated
					} else {
						// some other error happened
					}
				}
			}}
		/>
	);
}
