import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from '@react-native-google-signin/google-signin';
import { supabase } from '../lib/supabase';

export default function Auth() {
	GoogleSignin.configure({
		scopes: ['https://www.googleapis.com/auth/drive.readonly'],
		webClientId:
			'238625413111-ps04v28r5o19v7lssabudkr123cjtnrf.apps.googleusercontent.com',
	});

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
