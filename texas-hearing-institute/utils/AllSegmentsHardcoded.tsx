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
		place: [3],
	}),
	new ConsonantSegment('s', [ConsonantCategories.Initial], {
		manner: [0],
		voice: [0],
		place: [1],
	}),
	new ConsonantSegment('sh', [ConsonantCategories.Initial], {
		manner: [0],
		place: [1],
	}),
	new ConsonantSegment('y', [ConsonantCategories.Initial], {
		manner: [0, 1],
	}),
	new ConsonantSegment('n', [ConsonantCategories.Initial], {
		manner: [0, 1],
		place: [0],
	}),
	new ConsonantSegment('l', [ConsonantCategories.Initial], {
		manner: [0, 1],
	}),
];
