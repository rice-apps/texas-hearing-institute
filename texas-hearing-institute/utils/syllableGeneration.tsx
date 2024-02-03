import {
	ConsonantCategories,
	ConsonantFlower,
	ConsonantSegment,
	Segment,
	VowelSegment,
} from './Segment';
import { AllSegments } from './AllSegmentsHardcoded';

// syllableGeneration returns an array of 2-4 words (i.e. [pee, paw]).
// Inputs:
// segment: is null during listening practice.
// practiceTarget: is null to represent vowel targetting
export function syllableGeneration(
	segment: Segment | null,
	consonantFlower: ConsonantFlower,
	isVariegatedVowel: boolean,
	practiceTarget: ConsonantCategories | null,
	numberOfWords: number,
): string[] {
	let petalConsonants: ConsonantSegment[] = [];
	const words: string[] = [];
	const vowels: VowelSegment[] = AllSegments.getAllSegmentsHardcoded().filter(
		(seg) => seg instanceof VowelSegment,
	); // dummy data
	const consonants: ConsonantSegment[] =
		AllSegments.getAllSegmentsHardcoded().filter(
			(seg) => seg instanceof ConsonantSegment,
		) as ConsonantSegment[];

	if (segment === null) {
		segment = getRandomElement(consonants)!;
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
		words[0] = randomConsonantSegment!.name + segment.name;

		// Generate the other words
		const petalConsonants =
			randomConsonantSegment!.fetchConsonantSiblings(consonantFlower);

		// If we're doing variegated vowels, keep track of the vowels used.
		// We don't want a vowel to repeat more than once.
		const vowelsUsed: VowelSegment[] = [segment];

		// i starts at 1 because we want to start with the 2nd word. The first word is already completed
		for (let i = 1; i < numberOfWords; i++) {
			words[i] = generateWordWithVowelSegment(
				isVariegatedVowel,
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
		words[0] = segment!.name + randomVowel.name;

		// Generate other words

		// If we're doing variegated vowels, keep track of the vowels used.
		// We don't want a vowel to repeat more than once.
		const vowelsUsed: VowelSegment[] = [randomVowel];

		// i starts at 1 because we want to start with the 2nd word. The first word is already completed
		for (let i = 1; i < numberOfWords; i++) {
			words[i] = generateWordWithVowelSegment(
				isVariegatedVowel,
				petalConsonants,
				vowels,
				vowelsUsed,
				randomVowel,
			);
		}
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

function generateWordWithVowelSegment(
	isVariegatedVowel: boolean,
	petalConsonants: ConsonantSegment[],
	vowels: VowelSegment[],
	vowelsUsed: VowelSegment[],
	vowelSegment: VowelSegment,
) {
	if (isVariegatedVowel) {
		// Generate a word with any vowel EXCEPT our segment's vowel
		const newVowel = getRandomElement(
			vowels.filter((vowel) => {
				// Compare "name" of every vowelsUsed to our vowel.name
				return !vowelsUsed.map((value) => value.name).includes(vowel.name);
			}),
		)!;
		vowelsUsed.push(newVowel);
		return getRandomElement(petalConsonants)!.name + newVowel.name;
	} else {
		// Generate a word with our segment's vowel
		return getRandomElement(petalConsonants)!.name + vowelSegment.name;
	}
}

// Testing:
console.log(
	'result:',
	syllableGeneration(
		new ConsonantSegment('t', [ConsonantCategories.Initial], {
			manner: [0],
			voice: [3],
			place: [3],
		}),
		ConsonantFlower.Manner,
		false,
		ConsonantCategories.Initial,
		4,
	),
);

// console.log("result:",
//     syllableGeneration(
//         new VowelSegment('eye'),
//         ConsonantFlower.Manner,
//         true,
//         ConsonantCategories.Initial,
//         4
//     )
// )
