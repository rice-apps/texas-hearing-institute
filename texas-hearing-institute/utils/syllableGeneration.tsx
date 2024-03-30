import {
	Segment,
	ConsonantFlower,
	ConsonantCategories,
	VowelSegment,
	ConsonantSegment,
} from './Segment';
import { retrieveConsonants, retrieveVowels } from './persistSelection';

// syllableGeneration returns an array of `numberOfWords` words (i.e. ['pee', 'paw']).
// Inputs:
// - segment: is the desired `Segment` to practice for speaking practice; null for listening practice.
// - consonantFlower: one of Voice/Manner/Place, or All for listening practice's "Variegated Vowels" mode
// - isUniqueVowels: Select Vowel Type: "Same Vowels"? Set this to false; "Different Vowels"? Set this to true.
//   - Always set this to true if you're doing "Variegated Vowels" listening babble practice
// - practiceTarget: is initial/final in speaking practice; null to represent vowel targeting
// - numberOfWords: # of words to generate. Will deadlock if >10 and `isUniqueVowels` is true.

export async function syllableGeneration(
	segment: Segment | null,
	consonantFlower: ConsonantFlower,
	isUniqueVowels: boolean,
	practiceTarget: ConsonantCategories | null,
	numberOfWords: number,
): Promise<string[]> {
	let petalConsonants: ConsonantSegment[] = [];
	// Each array in syllable represents a word. Each item in the subarray represents a segment (as a string).
	// The subarray will always have two items: the first is a consonant, the second is a vowel.
	// If we're doing "final consonant" practice, we'll swap the order **at the end**.
	const syllables: string[][] = [];
	const vowels = await retrieveVowels();
	// List of consonants for our practiceTarget (initial/final)
	const consonants = await retrieveConsonants();
	// TODO - listening practice has practiceTarget null! something about the line above has to be fixed.

	// If we're not targeting a specific Segment (listening practice), choose a random "target"
	if (segment === null) {
		segment = pickRandomConsonant(consonants, consonantFlower, practiceTarget)!;
	}

	// This bundle of expressions generates all `syllables` to be practiced.
	if (segment instanceof VowelSegment) {
		// —— Generate the first word ——

		// Pick a random consonant to go with our vowel in the first word.
		const randomConsonantSegment = pickRandomConsonant(
			consonants,
			consonantFlower,
			practiceTarget,
		);
		// If our input targeted `segment` is a vowel, it won't have siblings.
		// Thus, we will assign petalConsonants = this random ConsonantSegment's siblings.
		petalConsonants = randomConsonantSegment!.fetchConsonantSiblings(
			consonantFlower,
			consonants,
		);

		// Consonant first, then vowel (our targeted segment)
		// This guarantees our target segment is in the first word.
		syllables[0] = [randomConsonantSegment!.name, segment.name];

		// —— Generate the other words ——

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
	} else if (segment instanceof ConsonantSegment) {
		// —— Generate the first word ——

		// Fetch the petalConsonants (sibling consonants) to our ConsonantSegment, of
		// .initial or .final depending on `practiceTarget`.
		petalConsonants = segment!.fetchConsonantSiblings(
			consonantFlower,
			consonants,
			practiceTarget,
		);

		// Pick a random vowel to go with our consonant in the first word
		const randomVowel = getRandomElement(vowels)!;

		// Consonant first (our targeted segment), then vowel
		// This guarantees our target segment is in the first word.
		syllables[0] = [segment!.name, randomVowel.name];

		// —— Generate the other words ——

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

	// This bundle of expressions converts `syllables` into a list of `words` (strings).
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

// A word is an array of two segments.
// EG: Would return ['z', 'oo']
function generateWordWithVowelSegment(
	isUniqueVowels: boolean,
	petalConsonants: ConsonantSegment[],
	vowels: VowelSegment[],
	vowelsUsed: VowelSegment[],
	vowelSegment: VowelSegment,
) {
	if (isUniqueVowels) {
		// Generate a word with any vowel EXCEPT those already used (in the list `vowelsUsed`)
		const newVowel = getRandomElement(
			vowels.filter((vowel) => {
				// Ensure the current iteration's `vowel.name` is not in `vowelsUsed` (mapped into names)
				return !vowelsUsed.map((value) => value.name).includes(vowel.name);
			}),
		)!;
		// We're using this vowel now! So add it to the `vowelsUsed` list.
		vowelsUsed.push(newVowel);
		// Return a word: This newly chosen vowel, with a random sibling consonant prepended
		return [getRandomElement(petalConsonants)!.name, newVowel.name];
	} else {
		// Return a word: Our target VowelSegment, with a random sibling consonant prepended
		return [getRandomElement(petalConsonants)!.name, vowelSegment.name];
	}
}

// Picks a random consonant from provided `consonants`, ensuring that it matches the `practiceTarget`
// and has siblings in `consonantFlower`.
function pickRandomConsonant(
	consonants: ConsonantSegment[],
	consonantFlower: ConsonantFlower,
	practiceTarget:
		| ConsonantCategories
		| null
		| ConsonantCategories.Initial
		| ConsonantCategories.Final,
) {
	return getRandomElement(
		// Before we pick a random consonant:
		consonants.filter((consonant) => {
			// Filter out consonants that don't have a petal in the provided consonantFlower.
			// - EG: "ch" doesn't exist in Place or Voice flowers.
			if (consonant.getPetalIds(consonantFlower).length == 0) {
				return false;
			}
			// Filter out consonants that don't match our practiceTarget
			if (
				practiceTarget != null &&
				!consonant.categories.includes(practiceTarget)
			) {
				return false;
			}
			// Filter out consonants with no siblings
			// Make sure we have at least one sibling. numOfSiblings includes self.
			const numOfSiblings = consonant.fetchConsonantSiblings(
				consonantFlower,
				consonants,
				practiceTarget,
			).length;
			if (numOfSiblings == null || numOfSiblings < 1) {
				return false;
			}

			return true;
		}),
	);
}

// Testing:
// ================ SPEECH GENERATION =================

// console.log(
// 	'result:',
// 	syllableGeneration(
// 		new VowelSegment('eye'),
// 		ConsonantFlower.Manner,
// 		true,
// 		ConsonantCategories.Initial,
// 		4,
// 	),
// );

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
