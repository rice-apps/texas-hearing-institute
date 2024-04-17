import { View, Platform } from 'react-native';
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
	// GoogleSignin.configure({
	// 	scopes: ['https://www.googleapis.com/auth/drive.readonly'],
	// 	webClientId:
	// 		'238625413111-ps04v28r5o19v7lssabudkr123cjtnrf.apps.googleusercontent.com',
	// 	iosClientId:
	// 		'238625413111-n13uhletv4i0q5b85kvat11jcp1e11la.apps.googleusercontent.com',
	// });

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
				{/* <GoogleSigninButton
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
				/> */}
			</View>
		);
	}

	// return (
	// 	<GoogleSigninButton
	// 		size={GoogleSigninButton.Size.Wide}
	// 		color={GoogleSigninButton.Color.Dark}
	// 		onPress={async () => {
	// 			try {
	// 				await GoogleSignin.hasPlayServices();
	// 				const userInfo = await GoogleSignin.signIn();
	// 				if (userInfo.idToken) {
	// 					const { data, error } = await supabase.auth.signInWithIdToken({
	// 						provider: 'google',
	// 						token: userInfo.idToken,
	// 					});
	// 					console.log(error, data);
	// 				} else {
	// 					throw new Error('no ID token present!');
	// 				}
	// 				//
	// 				// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// 			} catch (error: any) {
	// 				if (error.code === statusCodes.SIGN_IN_CANCELLED) {
	// 					// user cancelled the login flow
	// 				} else if (error.code === statusCodes.IN_PROGRESS) {
	// 					// operation (e.g. sign in) is in progress already
	// 				} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
	// 					// play services not available or outdated
	// 				} else {
	// 					// some other error happened
	// 				}
	// 			}
	// 		}}
	// 	/>
	// );
}
