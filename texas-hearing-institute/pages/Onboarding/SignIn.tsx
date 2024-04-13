import React from 'react';
import { View, Button, Image, Pressable } from 'react-native';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { OnboardingStackParamList } from './OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import { TabParamList } from '../../components/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import Auth from '../../components/Auth.native';
import { supabase } from '../../lib/supabase';

type TabNav = BottomTabNavigationProp<TabParamList>;
type OnboardingNav = StackNavigationProp<OnboardingStackParamList>;

export default function SignIn() {
	const tabNavigation = useNavigation<TabNav>();
	const onboardingNavigation = useNavigation<OnboardingNav>();

	// const signIn = async() => {
	// 	const data = (await AppleAuthentication.signInAsync()).identityToken

	// 	await supabase.auth.signInWithIdToken({
	// 	  provider: 'apple',
	// 	  token: data.id_token,
	// 	  nonce: '<nonce used in AppleID.auth.init>',
	// 	})
	//   }

	/**
	 * ASSUMING SIGN IN WORKS -- NEED TO REVISIT
	 * @returns
	 */
	const isExistingUser = async () => {
		//get from user object
		//supabase sign in

		const {
			data: { user },
		} = await supabase.auth.getUser();
		// const uuid = (await AppleAuthentication.signInAsync()).identityToken
		// const { data, error } = await supabase
		// .from('children')
		// .select()
		// .eq('parentuser', uuid);

		// if (error) {
		// 	alert(error);
		// }
		if (user != null) {
			return true;
		}
		return false;
	};
	return (
		<CustomSafeAreaView>
			<View
				style={{
					marginHorizontal: 32,
					justifyContent: 'space-between',
					alignItems: 'center',
					flexGrow: 1,
				}}
			>
				<View style={{ marginTop: 260 }}>
					<Image
						source={require('../../icons/thi-logo.png')}
						style={{ width: 270, height: 121 }}
					/>
				</View>
				<View style={{ marginBottom: 80 }}>
					{/* TODO: add sign in buttons here, route to onboarding or home as appropriate */}
					<Pressable
						onPress={async () =>
							(await isExistingUser()) == true
								? tabNavigation.navigate('Practice')
								: onboardingNavigation.navigate('InfoInput')
						}
					>
						<Auth></Auth>
					</Pressable>
					<Button
						title="Test Onboarding"
						onPress={() => {
							onboardingNavigation.navigate('InfoInput');
						}}
					/>
					<View style={{ marginBottom: 20 }} />
					<Button
						title="Test Signed In"
						onPress={() => {
							tabNavigation.navigate('Practice');
						}}
					/>
				</View>
			</View>
		</CustomSafeAreaView>
	);
}
