// eslint-disable-next-line @typescript-eslint/no-unused-vars
const allSegmentsHardcoded = [
	// Vowels
	new VowelSegment('oo'),
	new VowelSegment('ee'),
	new VowelSegment('uh'),
	new VowelSegment('ow'),
	new VowelSegment('eye'),
	new VowelSegment('oh'),
	new VowelSegment('oy'),
	new VowelSegment('ih'),
	new VowelSegment('ah'),
	new VowelSegment('ay'),

	// Consonants
	new ConsonantSegment('t', [ConsonantCategories.Initial], {
		manner: [0],
		voice: [3],
	}),
];
