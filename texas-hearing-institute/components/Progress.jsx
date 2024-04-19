import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const ProgressBar = ({ value, max }) => {
	return (
		<View>
			<progress value={value} max={max} />
			<span> {(value / max) * 100}%</span>
		</View>
	);
};

ProgressBar.propTypes = {
	value: PropTypes.number.isRequired,
	max: PropTypes.number,
};
ProgressBar.defualtProps = {
	max: 100,
};
export default ProgressBar;
