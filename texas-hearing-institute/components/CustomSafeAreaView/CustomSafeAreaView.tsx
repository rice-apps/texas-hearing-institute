import { View } from 'react-native';
import React, { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomSafeAreaViewType {
	children: ReactNode;
}

const CustomSafeAreaView: React.FC<CustomSafeAreaViewType> = ({ children }) => {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				paddingLeft: insets.left,
				paddingRight: insets.right,
				height: '100%',
			}}
		>
			{children}
		</View>
	);
};

export default CustomSafeAreaView;
