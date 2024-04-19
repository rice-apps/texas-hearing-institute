import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { getKeyboardType, TextProperties } from '../../utils/TextProperties';
import Subheading from '../Subheading';

interface RichText {
	text: string;
	properties?: TextProperties;
}

interface FormViewProps {
	heading?: string;
	labels: string[];
	data: RichText[];
	readonly: boolean;
	setData: ((newValue: string) => void)[];
}

const FormView = ({
	heading,
	labels,
	data,
	readonly,
	setData,
}: FormViewProps) => {
	if (
		labels.length !== data.length ||
		(labels.length !== setData.length && !readonly)
	) {
		return (
			<View
				style={{
					width: '100%',
					backgroundColor: 'red',
					padding: 15,
					borderRadius: 10,
				}}
			>
				<Text
					style={{
						color: 'white',
						textAlign: 'center',
						fontWeight: '700',
					}}
				>
					Error: Label length ({labels.length}) does not match data length (
					{data.length}) or does not match set data length ({setData.length})
				</Text>
			</View>
		);
	}

	return (
		<View /* Main container */
			style={{
				flexDirection: 'column',
				alignItems: 'flex-start',
				width: '100%',
			}}
		>
			{heading == null ? null : (
				<View
					style={{
						marginLeft: 10,
						marginBottom: 16,
					}}
				>
					<Subheading title={heading} />
				</View>
			)}
			<View /* Main Form Content */
				style={{
					flexDirection: 'column',
					borderRadius: 12,
					borderColor: 'rgba(217, 217, 217, 0.50)',
					borderWidth: 2,
					width: '100%',
				}}
			>
				{labels.map((item, index) => (
					<View
						/* Each row in the form */ key={index}
						style={{
							borderColor: 'rgba(217, 217, 217, 0.50)',
							borderTopWidth: index === 0 ? 0 : 2,
						}}
					>
						<View /* the row itself */
							style={{
								height: 48,
								marginHorizontal: 16,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<Text
								style={{
									color: '#333',
									fontSize: 16,
									fontWeight: '500',
								}}
							>
								{labels[index]}
							</Text>
							<TextInput
								secureTextEntry={data[index].properties?.password === true}
								value={data[index].text}
								onChangeText={(newValue) => {
									setData[index](newValue);
								}}
								placeholder={data[index].properties?.placeholder}
								editable={
									!readonly && !(data[index].properties?.readonly === true)
								}
								keyboardType={getKeyboardType(data[index].properties)}
								style={{
									width: 170,
									textAlign: 'right',
								}}
							/>
						</View>
					</View>
				))}
			</View>
		</View>
	);
};

export default FormView;
