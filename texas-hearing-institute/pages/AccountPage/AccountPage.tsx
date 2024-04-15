import { SvgXml } from 'react-native-svg';
import leftArrow from '../../icons/leftarrow';
import send from '../../icons/send';
import {
	Pressable,
	View,
	Text,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import React, { useContext, useState } from 'react';
import ProfileIconView from '../../components/ProfileIconView';
import pencil from '../../icons/pencil';
import FormView from '../../components/FormView/FormView';
import PillButtonView from '../../components/PillButtonView';
import { UserContext } from '../../user/UserContext';
import { resetPassword } from '../../utils/resetPassword';

export default function AccountPage() {
	const user = useContext(UserContext);

	const [editMode, setEditMode] = useState(false);
	// const [userEmail] = useState(() => {
	// 	return user.getEmail();
	// });

	const [userName, setUserName] = useState(() => {
		return user.getName();
	});

	const [userGroupID, setUserGroupID] = useState(() => {
		return user.getGroupId();
	});

	const [resetPW, setResetPW] = useState(false);

	const [email, setEmail] = useState('');

	const commitChangesToUser = () => {
		user.setName(userName);
		user.setGroupId(userGroupID);
	};

	return (
		<View /* Main container */
			style={{
				flexDirection: 'column',
				alignItems: 'flex-start',
				marginTop: 20,
				marginHorizontal: 24,
				height: '100%',
			}}
		>
			<View /* Top back arrow */
				style={{
					flexDirection: 'column',
					marginLeft: 3,
					marginBottom: 24,
				}}
			>
				<Pressable
					onPress={() => {
						// TODO: actually reroute back to wherever one needs to go
					}}
				>
					<SvgXml xml={leftArrow} width={24} height={24} />
				</Pressable>
			</View>
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
					<ProfileIconView
						iconPath={require('../../assets/testdata/profileicon.png')}
					/>
					<Text
						style={{
							marginLeft: 12,
							fontSize: 16,
							fontWeight: '600',
							color: '#333',
						}}
					>
						{editMode ? 'Edit Avatar' : userName + "'s Profile"}
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
							text: userGroupID,
							properties: {
								placeholder: 'Obtain from your clinician',
								numbers: true,
							},
						},
					]}
					readonly={!editMode}
					setData={[
						() => {
							// email is immutable
						},
						(newValue: string) => {
							setUserName(newValue);
						},
						(newValue: string) => {
							setUserGroupID(newValue);
						},
					]}
				/>
			</View>
			{/* TODO: only show if android */}
			<TouchableOpacity
				onPress={() => {
					setResetPW(!resetPW);
				}}
			>
				<Text style={{ color: 'red', fontWeight: 500, marginBottom: 10 }}>
					Reset password
				</Text>
			</TouchableOpacity>
			{resetPW && (
				<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
					<TextInput
						style={{
							borderWidth: 2,
							borderColor: '#E1E1E1',
							padding: 10,
							height: 54,
							width: 326,
							borderRadius: 10,
							marginBottom: 16,
						}}
						placeholder="example@gmail.com"
						onChangeText={setEmail}
					/>
					<TouchableOpacity
						onPress={
							() => resetPassword(email, '90486113-899b-4f70-acf2-039ab5b9a8b0') // TODO: make curr user id
						}
					>
						<View
							style={{
								height: 54,
								width: 50,
								backgroundColor: 'rgba(217, 217, 217, 0.50)',
								borderRadius: 10,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								opacity: editMode ? 0 : 1,
							}}
						>
							<SvgXml xml={send} width={18} height={18} />
						</View>
					</TouchableOpacity>
				</View>
			)}

			<View
				style={{
					width: '100%',
					opacity: editMode ? 1 : 0,
				}}
			>
				<TouchableOpacity /* Edit button */
					onPress={() => {
						setEditMode(false);
						commitChangesToUser();
					}}
				>
					<PillButtonView title={'Save Changes'} type={'primary'} />
				</TouchableOpacity>
			</View>
		</View>
	);
}
