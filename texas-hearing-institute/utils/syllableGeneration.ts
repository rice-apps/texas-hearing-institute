import { Segment, ConsonantFlower, ConsonantCategories, VowelSegment, ConsonantSegment } from "./Segment";
import { allSegmentsHardcoded } from "./AllSegmentsHardcoded";

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
    let words: string[] = [];
    const vowels: VowelSegment[] = allSegmentsHardcoded.filter(seg => seg instanceof VowelSegment); // dummy data
    const consonants: ConsonantSegment[] = allSegmentsHardcoded.filter (seg => seg instanceof ConsonantSegment).map(seg => seg as ConsonantSegment);

    if (segment === null) {
        segment = getRandomElement(consonants)!;
    }

    if (segment instanceof VowelSegment) {
        let randomConsonantSegment = getRandomElement(consonants);
        petalConsonants = randomConsonantSegment!.fetchConsonantSiblings(consonantFlower);
    } else if (segment instanceof ConsonantSegment) {
        petalConsonants = segment!.fetchConsonantSiblings(consonantFlower);
    } else {
        console.debug("segment is neither Vowel or Consonant segments!");
    }

    if (segment instanceof VowelSegment) {

    } else {
        petalConsonants = petalConsonants.filter(segment => {
            let consonantSegment = segment as ConsonantSegment;
            consonantSegment.categories.includes(practiceTarget!)});
        let words = [];

        // Store random vowel in case isVariegatedVowel is false.
        let randomVowel = getRandomElement(vowels)!;
        words[0] = segment!.name + randomVowel;
        if (isVariegatedVowel) {
            words[1] = getRandomElement(petalConsonants)!.name + getRandomElement(vowels.filter(vowel => vowel !== randomVowel))!.name; // TODO -- hopefully it actually filters it out!
        } else {
            words[1] = getRandomElement(petalConsonants)!.name + randomVowel;
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

// Testing:
// console.log(
//     syllableGeneration(
//     new ConsonantSegment('t', [ConsonantCategories.Initial], {
//         manner: [0],
//         voice: [3],
//         place: [3],
//      }),
//     ConsonantFlower.Manner,
//     true,
//     ConsonantCategories.Initial,
//     2
//     )
// )