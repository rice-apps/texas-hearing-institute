import {
	Segment,
	ConsonantFlower,
	ConsonantCategories,
	VowelSegment,
	ConsonantSegment,
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
	let petalConsonants: Segment[] = [];
	// Each array in syllable really represents a word.
	let syllables: string[][] = [];
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
		segment = getRandomElement(consonants)!;
	}

    if (segment instanceof VowelSegment) {
        let randomConsonantSegment = getRandomElement(consonants);
        petalConsonants = randomConsonantSegment!.fetchConsonantSiblings(consonantFlower);
    } else if (segment instanceof ConsonantSegment) {
        petalConsonants = segment!.fetchConsonantSiblings(consonantFlower);
    } else {
        throw "segment is neither Vowel or Consonant segments!";
    }

    if (segment instanceof VowelSegment) {
        let randomConsonantSegment = getRandomElement(consonants.filter(consonant => consonant.getPetalIds(consonantFlower).length != 0));
        words[0] = randomConsonantSegment!.name + segment.name;
        let petalConsonants = randomConsonantSegment!.fetchConsonantSiblings(consonantFlower);
        console.log("petalConsonats:", petalConsonants);
        if (isVariegatedVowel) {
            words[1] = getRandomElement(petalConsonants)!.name + getRandomElement(vowels.filter(vowel => vowel.name !== segment!.name))!.name; // TODO -- hopefully it actually filters it out!
            console.log("words[1]:", words)
        } else { 
            words[1] = getRandomElement(petalConsonants)!.name + segment.name;
        }
    } else {
        petalConsonants = petalConsonants.filter(segment => {
            let consonantSegment = segment as ConsonantSegment;
            return consonantSegment.categories.includes(practiceTarget!)});
        console.log("petalConsoants:", petalConsonants);

        // Store random vowel in case isVariegatedVowel is false.
        let randomVowel = getRandomElement(vowels)!.name;
        words[0] = segment!.name + randomVowel;
        console.log("words[0]:", words)
        if (isVariegatedVowel) {
            words[1] = getRandomElement(petalConsonants)!.name + getRandomElement(vowels.filter(vowel => vowel.name !== randomVowel))!.name; // TODO -- hopefully it actually filters it out!
            console.log("words[1]:", words)
        } else { 
            words[1] = getRandomElement(petalConsonants)!.name + randomVowel;
        }
    }
    console.log("words:", words)
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

// Testing:
// console.log("result:",
//     syllableGeneration(
//         new ConsonantSegment('t', [ConsonantCategories.Initial], {
//             manner: [0],
//             voice: [3],
//             place: [3],
//         }),
//         ConsonantFlower.Manner,
//         true,
//         ConsonantCategories.Initial,
//         2
//     )
// )

console.log(
	'result:',
	syllableGeneration(
		new VowelSegment('oo'),
		ConsonantFlower.Manner,
		true,
		ConsonantCategories.Final,
		2,
	),
);
