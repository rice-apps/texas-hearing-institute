const prompt1 = 'What phenoms can your child **say**?';
const prompt2 = 'What vowels can your child **say**?';

export const consonants = [
	'b',
	'm',
	'w',
	'f',
	'v',
	'th',
	'TH',
	't',
	'd',
	'n',
	's',
	'z',
	'l',
	'sh',
	'zh',
	'ch',
	'dg',
	'y',
	'r',
	'k',
	'g',
	'ng',
	'h',
];
export const vowels = [
	'ee',
	'I',
	'A',
	'E',
	'a',
	'ah',
	'uh',
	'aw',
	'o',
	'oo',
	'ow',
	'eye',
	'oi',
];

export const consonantInventoryPersistenceKey = 'consonantInventory';
export const vowelInventoryPersistenceKey = 'vowelInventory';

export const setupPrompts = [prompt1, prompt2];
export const setupPersistenceKeys = [
	consonantInventoryPersistenceKey,
	vowelInventoryPersistenceKey,
];
export const setupPageElements = [consonants, vowels];
