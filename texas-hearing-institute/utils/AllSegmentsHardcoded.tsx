import { ConsonantSegment, ConsonantCategories, VowelSegment } from './Segment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export class AllSegments {
	static getAllSegmentsHardcoded() {
		return [
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
			new ConsonantSegment(
				't',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [0],
					voice: [3],
					place: [3],
					all: [0],
				},
			),
			new ConsonantSegment(
				's',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [0],
					voice: [0],
					place: [1],
					all: [0],
				},
			),
			new ConsonantSegment(
				'sh',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [0],
					place: [1],
					all: [0],
				},
			),
			new ConsonantSegment('y', [ConsonantCategories.Initial], {
				manner: [0, 1],
				all: [0],
			}),
			new ConsonantSegment(
				'n',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [0, 1],
					place: [0],
					all: [0],
				},
			),
			new ConsonantSegment(
				'l',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [0, 1],
					all: [0],
				},
			),
			new ConsonantSegment(
				'z',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [1],
					voice: [0],
					place: [2],
					all: [0],
				},
			),
			new ConsonantSegment(
				'd',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [1],
					voice: [3],
					place: [4],
					all: [0],
				},
			),
			new ConsonantSegment('zh', [ConsonantCategories.Final], {
				manner: [1],
				place: [2],
				all: [0],
			}),
			new ConsonantSegment(
				'g',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [2, 3],
					voice: [1],
					place: [4],
					all: [0],
				},
			),
			new ConsonantSegment(
				'r',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [2, 3, 4, 5],
					all: [0],
				},
			),
			new ConsonantSegment(
				'j',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [2, 4],
					all: [0],
				},
			),
			new ConsonantSegment('ng', [ConsonantCategories.Final], {
				manner: [2, 3, 4, 5],
				place: [0],
				all: [0],
			}),
			new ConsonantSegment(
				'ch',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [3, 5],
					all: [0],
				},
			),
			new ConsonantSegment(
				'k',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [4, 5],
					voice: [1],
					place: [3],
					all: [0],
				},
			),
			new ConsonantSegment(
				'p',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [6],
					voice: [4],
					place: [3],
					all: [0],
				},
			),
			new ConsonantSegment('h', [ConsonantCategories.Initial], {
				manner: [6, 7],
				place: [1],
				all: [0],
			}),
			new ConsonantSegment('w', [ConsonantCategories.Initial], {
				manner: [6, 7],
				all: [0],
			}),
			new ConsonantSegment(
				'm',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [6, 7],
					place: [0],
					all: [0],
				},
			),
			new ConsonantSegment(
				'b',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [7],
					voice: [4],
					place: [4],
					all: [0],
				},
			),
			new ConsonantSegment(
				'f',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					voice: [2],
					place: [1],
					all: [0],
				},
			),
			new ConsonantSegment(
				'v',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					voice: [2],
					place: [2],
					all: [0],
				},
			),
			new ConsonantSegment(
				'th',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					place: [2],
					all: [0],
				},
			),
		];
	}
}
