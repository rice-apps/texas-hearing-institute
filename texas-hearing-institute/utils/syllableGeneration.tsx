import {
	Segment,
	ConsonantFlower,
	ConsonantCategories,
	VowelSegment,
	ConsonantSegment,
} from './Segment';
import { AllSegments } from './AllSegmentsHardcoded';

// syllableGeneration returns an array of `numberOfWords` words (i.e. ['pee', 'paw']).
// Inputs:
// - segment: is the desired `Segment` to practice for speaking practice; null for listening practice.
// - consonantFlower: one of Voice/Manner/Place, or All for listening practice, "Variegated Vowels" mode
// - isUniqueVowels: Select Vowel Type: "Same Vowels"? Set this to false; "Different Vowels"? Set this to true.
//   - Always set this to true if you're doing "Variegated Vowels" listening babble practice
// - practiceTarget: is initial/final in speaking practice; null to represent vowel targeting
// - numberOfWords: # of words to generate. Will deadlock if >10 and `isUniqueVowels` is true.

export function syllableGeneration(
	segment: Segment | null,
	consonantFlower: ConsonantFlower,
	isUniqueVowels: boolean,
	practiceTarget: ConsonantCategories | null,
	numberOfWords: number,
): string[] {
	let petalConsonants: ConsonantSegment[] = [];
	// Each array in syllable really represents a word.
	const syllables: string[][] = [];
	const vowels: VowelSegment[] = AllSegments.getAllSegmentsHardcoded().filter(
		(seg) => seg instanceof VowelSegment,
	); // dummy data
	const consonants: ConsonantSegment[] =
		AllSegments.getAllSegmentsHardcoded().filter(
			(seg) =>
				seg instanceof ConsonantSegment &&
				seg.categories.includes(practiceTarget!),
		) as ConsonantSegment[];
	// TODO - listening practice has practiceTarget null! something about the line above has to be fixed.

	if (segment === null) {
		segment = getRandomElement(
			// Filter out empty consonant flowers b/c otherwise we have nothing to pick from for the other consonant.
			consonants.filter(
				(consonant) => consonant.getPetalIds(consonantFlower).length != 0,
			),
		)!;
	}

	if (segment instanceof VowelSegment) {
		const randomConsonantSegment = getRandomElement(consonants);
		petalConsonants =
			randomConsonantSegment!.fetchConsonantSiblings(consonantFlower);
	} else if (segment instanceof ConsonantSegment) {
		petalConsonants = segment!.fetchConsonantSiblings(consonantFlower);
	} else {
		throw 'segment is neither Vowel or Consonant segments!';
	}

	if (segment instanceof VowelSegment) {
		// Generate the first word
		const randomConsonantSegment = getRandomElement(
			consonants.filter(
				(consonant) => consonant.getPetalIds(consonantFlower).length != 0,
			),
		);
		syllables[0] = [randomConsonantSegment!.name, segment.name];

		// Generate the other words
		const petalConsonants =
			randomConsonantSegment!.fetchConsonantSiblings(consonantFlower);

		// If we're doing `isUniqueVowels`, keep track of the vowels used.
		// We don't want a vowel to repeat more than once.
		const vowelsUsed: VowelSegment[] = [segment];

		// i starts at 1 because we want to start with the 2nd word. The first word is already completed
		for (let i = 1; i < numberOfWords; i++) {
			syllables[i] = generateWordWithVowelSegment(
				isUniqueVowels,
				petalConsonants,
				vowels,
				vowelsUsed,
				segment,
			);
		}
	} else {
		// Filter petalConsonants to be of .initial or .final depending on practiceTarget
		petalConsonants = petalConsonants.filter((segment) => {
			const consonantSegment = segment as ConsonantSegment;
			return consonantSegment.categories.includes(practiceTarget!);
		});

		// Pick a random vowel for the first word
		const randomVowel = getRandomElement(vowels)!;

		// Generate the first word
		syllables[0] = [segment!.name, randomVowel.name];

		// Generate other words

		// If we're doing `isUniqueVowels`, keep track of the vowels used.
		// We don't want a vowel to repeat more than once.
		const vowelsUsed: VowelSegment[] = [randomVowel];

		// i starts at 1 because we want to start with the 2nd word. The first word is already completed
		for (let i = 1; i < numberOfWords; i++) {
			syllables[i] = generateWordWithVowelSegment(
				isUniqueVowels,
				petalConsonants,
				vowels,
				vowelsUsed,
				randomVowel,
			);
		}
	}

	let words: string[];
	if (practiceTarget == ConsonantCategories.Initial) {
		words = syllables.map((wordArray) => wordArray[0] + wordArray[1]);
	} else {
		words = syllables.map((wordArray) => wordArray[1] + wordArray[0]);
	}

	return words;
}

// Example usage:
// const myArray = [1, 2, 3, 4, 5];
// const randomElement = getRandomElement(myArray);
// console.log(randomElement); // This will log a random element from myArray
function getRandomElement<T>(array: T[]): T | undefined {
	if (array.length === 0) return undefined;
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

// A word is an array of two segments. EG: ['z', 'oo']
function generateWordWithVowelSegment(
	isUniqueVowels: boolean,
	petalConsonants: ConsonantSegment[],
	vowels: VowelSegment[],
	vowelsUsed: VowelSegment[],
	vowelSegment: VowelSegment,
) {
	if (isUniqueVowels) {
		// Generate a word with any vowel EXCEPT our segment's vowel
		const newVowel = getRandomElement(
			vowels.filter((vowel) => {
				// Compare "name" of every vowelsUsed to our vowel.name
				return !vowelsUsed.map((value) => value.name).includes(vowel.name);
			}),
		)!;
		vowelsUsed.push(newVowel);
		return [getRandomElement(petalConsonants)!.name, newVowel.name];
	} else {
		// Generate a word with our segment's vowel
		return [getRandomElement(petalConsonants)!.name, vowelSegment.name];
	}
}

// Testing:
// ================ SPEECH GENERATION =================

// console.log("result:",
//     syllableGeneration(
//         new VowelSegment('eye'),
//         ConsonantFlower.Manner,
//         true,
//         ConsonantCategories.Initial,
//         4
//     )
// )

// console.log(
// 	'result:',
// 	syllableGeneration(
// 		new VowelSegment('oo'),
// 		ConsonantFlower.Manner,
// 		true,
// 		ConsonantCategories.Final,
// 		2,
// 	),
// );

// console.log(
// 	'result:',
// 	syllableGeneration(
// 		new ConsonantSegment(
// 			'z',
// 			[ConsonantCategories.Initial, ConsonantCategories.Final],
// 			{
// 				manner: [1],
// 				voice: [0],
// 				place: [2],
// 				all: [0],
// 			},
// 		),
// 		ConsonantFlower.Voice,
// 		false,
// 		ConsonantCategories.Final,
// 		2,
// 	),
// );

// console.log(
// 	'result:',
// 	syllableGeneration(
// 		new ConsonSegment('t', [ConsonantCategories.Initial], {
//             manner: [0],
//             voice: [3],
//             place: [3],
//         }),
// 		ConsonantFlower.Voice,
// 		true,
// 		ConsonantCategories.Initial,
// 		2,
// 	),
// );

// ================ LISTENING GENERATION =================

// console.log(
// 	'result:',
// 	syllableGeneration(
// 		null,
// 		ConsonantFlower.All,
// 		true,
// 		ConsonantCategories.Final,
// 		3,
// 	),
// );

// console.log(
// 	'result:',
// 	syllableGeneration(
// 		null,
// 		ConsonantFlower.Voice,
// 		false,
// 		ConsonantCategories.Final,
// 		2,
// 	),
// );

// console.log(
// 	'result:',
// 	syllableGeneration(
// 		null,
// 		ConsonantFlower.All,
// 		true,
// 		ConsonantCategories.Initial,
// 		3,
// 	),
// );
