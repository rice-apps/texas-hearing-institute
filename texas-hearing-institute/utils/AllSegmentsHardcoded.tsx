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
	new ConsonantSegment('z', [ConsonantCategories.Initial], {
		manner: [1],
		voice: [0],
		place: [2],
	}),
	new ConsonantSegment('d', [ConsonantCategories.Initial], {
		manner: [1],
		voice: [3],
		place: [4],
	}),
	new ConsonantSegment('zh', [ConsonantCategories.Initial], {
		manner: [1],
		place: [2],
	}),
	new ConsonantSegment('g', [ConsonantCategories.Initial], {
		manner: [2, 3],
		voice: [1],
		place: [4],
	}),
	new ConsonantSegment('r', [ConsonantCategories.Initial], {
		manner: [2, 3, 4, 5],
	}),
	new ConsonantSegment('j', [ConsonantCategories.Initial], {
		manner: [2, 4],
	}),
	new ConsonantSegment('ng', [ConsonantCategories.Initial], {
		manner: [2, 3, 4, 5],
		place: [0],
	}),
	new ConsonantSegment('ch', [ConsonantCategories.Initial], {
		manner: [3, 5],
	}),
	new ConsonantSegment('k', [ConsonantCategories.Initial], {
		manner: [4, 5],
		voice: [1],
		place: [3],
	}),
	new ConsonantSegment('p', [ConsonantCategories.Initial], {
		manner: [6],
		voice: [4],
		place: [3],
	}),
	new ConsonantSegment('h', [ConsonantCategories.Initial], {
		manner: [6, 7],
		place: [1],
	}),
	new ConsonantSegment('w', [ConsonantCategories.Initial], {
		manner: [6, 7],
	}),
	new ConsonantSegment('m', [ConsonantCategories.Initial], {
		manner: [6, 7],
		place: [0],
	}),
	new ConsonantSegment('b', [ConsonantCategories.Initial], {
		manner: [7],
		voice: [4],
		place: [4],
	}),
	new ConsonantSegment('f', [ConsonantCategories.Initial], {
		voice: [2],
		place: [1],
	}),
	new ConsonantSegment('v', [ConsonantCategories.Initial], {
		voice: [2],
		place: [2],
	}),
	new ConsonantSegment('th', [ConsonantCategories.Initial], {
		place: [2],
	}),
];
