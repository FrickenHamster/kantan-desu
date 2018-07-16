import React, { Component} from 'react';

import {
	TextInput
} from 'react-native';

export default FormTextInput = ({value, onChangeText, name, ...props}) => (
	<TextInput
		value={value}
		onChangeText={(value) => onChangeText(name, value)}
		underlineColorAndroid= 'rgba(0,0,0,0)'
		{...props}
	/>
)


