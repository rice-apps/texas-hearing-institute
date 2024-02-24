export interface TextProperties {
	placeholder?: string;
	readonly?: boolean;
	password?: boolean;
	email?: boolean;
	numbers?: boolean /* numbers only, no decimals */;
	phoneNumber?: boolean;
}

export function getTextContentType(props?: TextProperties): undefined | string {
	if (props === undefined) {
		return undefined;
	}

	if (props.email) {
		return 'emailAddress';
	} else if (props.password) {
		return 'password';
	} else if (props.phoneNumber) {
		return 'telephoneNumber';
	}
	// No specific match for 'numbers' in textContentType
	return undefined;
}

export function getKeyboardType(
	props?: TextProperties,
): 'default' | 'email-address' | 'numeric' | 'phone-pad' {
	if (props === undefined) {
		return 'default';
	}

	if (props.email) {
		return 'email-address';
	} else if (props.numbers) {
		return 'numeric';
	} else if (props.phoneNumber) {
		return 'phone-pad';
	}
	// Default keyboardType for other cases, including 'password'
	return 'default';
}
