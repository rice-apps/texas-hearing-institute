const prompt1 = 'What phenomes can your child **say**?';
const prompt2 = 'What vowels can your child **say**?';

export const consonants = [
	't',
	's',
	'sh',
	'y',
	'n',
	'l',
	'z',
	'd',
	'zh',
	'g',
	'r',
	'j',
	'ng',
	'ch',
	'k',
	'p',
	'h',
	'w',
	'm',
	'b',
	'f',
	'v',
	'th',
];
export const vowels = [
	'oo',
	'ee',
	'uh',
	'ow',
	'eye',
	'oh',
	'oy',
	'ih',
	'ah',
	'ay',
];

export const consonantInventoryPersistenceKey = 'consonantInventory';
export const vowelInventoryPersistenceKey = 'vowelInventory';

export const setupPrompts = [prompt1, prompt2];
export const setupPersistenceKeys = [
	consonantInventoryPersistenceKey,
	vowelInventoryPersistenceKey,
];
export const setupPageElements = [consonants, vowels];
