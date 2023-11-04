import { View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import SelectionButton from './SelectionButton';
import { useState } from 'react';

type SelectionProps = {
	buttonNames: string[];
};

const Selection = ({ buttonNames }: SelectionProps) => {
	const [mode, setMode] = useState(-1);

	const selectionButtons = buttonNames.map((buttonName, i) => (
		<SelectionButton
			key={i} // It's a good practice to provide a unique key when mapping over components
			label={buttonName}
			checkedState={mode}
			id={i}
			onPress={() => setMode(i)}
		/>
	));

	return <View style={tw`px-2`}>{selectionButtons}</View>;
};

export default Selection;
