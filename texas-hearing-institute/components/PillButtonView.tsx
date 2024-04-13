import React from 'react';
import { View, Text } from 'react-native';

interface PillButtonProps {
	title: string;
	type: 'primary' | 'secondary';
}

const PillButtonView = ({ title, type }: PillButtonProps) => {
	return (
		<View
			style={{
				...{
					height: 54,
					width: 278,
					borderRadius: 27,
					alignItems: 'center',
					justifyContent: 'center',
				},
				...(type == 'primary' ? primaryStyle : secondaryStyle),
			}}
		>
			<Text
				style={{
					...{
						fontSize: 18,
					},
					...(type == 'primary'
						? {
								fontWeight: '700',
							}
						: {
								fontWeight: '600',
							}),
				}}
			>
				{title}
			</Text>
		</View>
	);
};

const primaryShadowStyle = {
	shadowColor: '#000000',
	shadowOffset: {
		width: 0, // X offset
		height: 0, // Y offset
	},
	shadowOpacity: 0.12,
	shadowRadius: 8,
	elevation: 8, // for Android
};

const primaryStyle = {
	...primaryShadowStyle,
	...{
		backgroundColor: '#AFE4F9',
	},
};

const secondaryShadowStyle = {
	shadowColor: '#000000',
	shadowOffset: {
		width: 0, // X offset
		height: 0, // Y offset
	},
	shadowOpacity: 0.16,
	shadowRadius: 14,
	elevation: 14, // for Android
};

const secondaryStyle = {
	...secondaryShadowStyle,
	...{
		borderWidth: 2,
		borderColor: '#AFE4F9',
		backgroundColor: '#FFFFFF',
	},
};

export default PillButtonView;
