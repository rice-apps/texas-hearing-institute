import { SvgXml } from 'react-native-svg';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import ProfileIconView from '../../components/ProfileIconView';
import pencil from '../../icons/pencil';
import FormView from '../../components/FormView/FormView';
import { UserContext, UserContextType } from '../../user/UserContext';
import { supabase } from '../../lib/supabase';
import FloatingButton from '../../components/FloatingButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../AppNavigator';

export default function AccountPage() {
	const { user } = useContext(UserContext) as UserContextType;

	type AppNav = StackNavigationProp<AppStackParamList>;
	const appNavigation = useNavigation<AppNav>();

	const [editMode, setEditMode] = useState(false);

	const [userName, setUserName] = useState(() => {
		return user.getName();
	});

	const [userGroupID, setUserGroupID] = useState(() => {
		return user.getGroupId();
	});

	const [userChildID] = useState(() => {
		return user.getChildId();
	});

	function firstNameOnly(name: string) {
		name = name.trim();
		if (name.includes(' ')) {
			name = name.substring(0, name.indexOf(' '));
		}
		return name;
	}

	const commitChangesToUser = async () => {
		const { error: nameError } = await supabase
			.from('children')
			.update({ name: firstNameOnly(userName) })
			.eq('id', user.getId());
		if (nameError) {
			console.log('DB error on attempt to update child name: ', nameError);
			alert('Failed to update; try again later!');
			setUserName(user.getName());
			return;
		}
		user.setName(firstNameOnly(userName));

		const { data, error: cIdError } = await supabase
			.from('clinicians')
			.select('id')
			.eq('groupId', userGroupID)
			.maybeSingle();
		if (!data) {
			// invalid groupID
			console.log('Invalid Group ID entered');
			alert('Incorrect Group ID entered');
			setUserGroupID(user.getGroupId());
			return;
		} else if (cIdError) {
			console.log('DB error on attempt to retrieve clinician id: ', cIdError);
			alert('Failed to update; try again later!');
			setUserGroupID(user.getGroupId());
			return;
		}
		const { error: gIdError } = await supabase
			.from('children')
			.update({ clinician: data!.id })
			.eq('id', user.getId());

		if (gIdError) {
			console.log('DB error on attempt to update group ID: ', gIdError);
			alert('Failed to update; try again later!');
			return;
		}
		user.setGroupId(userGroupID);
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			throw new Error('Error signing out');
		}
		user.clearUser();
		appNavigation.reset({
			index: 0,
			routes: [{ name: 'Auth' }],
		});
	};

	return (
		<View /* Main container */
			style={{
				flexDirection: 'column',
				alignItems: 'flex-start',
				marginTop: 24,
				marginHorizontal: 24,
				height: '100%',
				backgroundColor: 'white',
			}}
		>
			<View /* Profile view and edit button */
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginBottom: 34,
					width: '100%',
					alignItems: 'center',
				}}
			>
				<View /* Profile */
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<ProfileIconView iconPath={require('../../assets/turtle.png')} />
					<Text
						style={{
							marginLeft: 12,
							fontSize: 16,
							fontWeight: '600',
							color: '#333',
						}}
					>
						{userName + "'s Profile"}
					</Text>
				</View>

				<TouchableOpacity /* Edit button */
					onPress={() => {
						setEditMode(true);
					}}
				>
					<View /* Edit button container */
						style={{
							height: 35,
							paddingVertical: 8,
							paddingHorizontal: 12,
							backgroundColor: 'rgba(217, 217, 217, 0.50)',
							borderRadius: 10,
							flexDirection: 'row',
							alignItems: 'center',
							opacity: editMode ? 0 : 1,
						}}
					>
						<SvgXml
							xml={pencil}
							width={18}
							height={18}
							style={{
								marginRight: 10,
							}}
						/>
						<Text
							style={{
								color: '#333',
								fontSize: 16,
								fontWeight: '500',
							}}
						>
							Edit
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View
				style={{
					width: '100%',
					marginBottom: 32,
				}}
			>
				<FormView
					heading="Account information"
					labels={['Name', 'Group ID']}
					data={[
						{
							text: userName,
							properties: {
								placeholder: 'Johnny Appleseed',
							},
						},
						{
							text: userGroupID.toString(),
							properties: {
								placeholder: 'Obtain from your clinician',
								numbers: true,
							},
						},
					]}
					readonly={!editMode}
					setData={[
						(newValue: string) => {
							setUserName(newValue);
						},
						(newValue: string) => {
							setUserGroupID(newValue);
						},
					]}
				/>
				<Text> </Text>
				<FormView
					heading="Unique Child ID (cannot edit)"
					labels={['Child ID']}
					data={[
						{
							text: userChildID.toString(),
							properties: {
								placeholder: '-1',
							},
						},
					]}
					readonly={true}
					setData={[]}
				/>
			</View>

			<View
				style={{
					width: '100%',
					opacity: editMode ? 1 : 0,
				}}
			>
				<View style={{ marginTop: 132 }}>
					<FloatingButton
						label={'Save Changes'}
						onPress={() => {
							setEditMode(false);
							commitChangesToUser();
						}}
					/>
				</View>
			</View>
			<View
				style={{
					width: '100%',
				}}
			>
				<View style={{ marginTop: 132 }}>
					<FloatingButton
						label={'Log Out'}
						onPress={() => {
							signOut();
						}}
					/>
				</View>
			</View>
		</View>
	);
}
