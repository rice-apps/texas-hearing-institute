import React from 'react';
import { Text } from 'react-native-elements';

interface SubHeadingProps {
	title: string;
}

const SubHeading = ({ title }: SubHeadingProps) => {
	return (
		<Text
			style={{
				color: '#747474',
				fontSize: 12,
				fontWeight: '400',
				textTransform: 'uppercase',
			}}
		>
			{title}
		</Text>
	);
};

export default SubHeading;
