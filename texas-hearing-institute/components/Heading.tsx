import React from 'react';
import { Text } from 'react-native-elements';

interface HeaderProps {
	title: string;
}

const Heading = ({ title }: HeaderProps) => {
	return (
		<Text
			style={{
				color: '#333',
				fontSize: 24,
				fontWeight: 'bold',
				marginTop: 32,
				marginBottom: 28,
				paddingHorizontal: 8,
			}}
		>
			{title}
		</Text>
	);
};

export default Heading;
