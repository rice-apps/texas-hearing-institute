class Segment {
	name = '';
	ipa = '';

	constructor(name: string, ipa: string) {
		this.name = name;
		this.ipa = ipa;
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ConsonantSegment extends Segment {
	// Categories can contain either ConsonantCategories.initial, .final, or both
	categories: ConsonantCategories[] = [];

	// Maps "ConsonantFlower.XXX" to the petal IDs that this consonant belongs to in that flower
	flowerToPetalIds = new Map<ConsonantFlower, number[]>([
		[ConsonantFlower.Manner, []],
		[ConsonantFlower.Voice, []],
		[ConsonantFlower.Place, []],
		[ConsonantFlower.All, []],
	]);

	getPetalIds(consonantFlower: ConsonantFlower): number[] {
		// Return the corresponding petal IDs (or, for null safety, an empty array if the value doesn't exist)
		return this.flowerToPetalIds.get(consonantFlower) ?? [];
	}

	// Fetch other ConsonantSegments from canSayInventory that share any of the petalIds in this.getPetalIds
	fetchConsonantSiblings(
		flower: ConsonantFlower,
		canSayInventory: ConsonantSegment[],
	): ConsonantSegment[] {
		const petalIds = this.getPetalIds(flower);

		// Use filter to ensure x is of type ConsonantSegment
		const consonantSegments: ConsonantSegment[] = canSayInventory.filter(
			(x: Segment): x is ConsonantSegment => x instanceof ConsonantSegment,
		);

		// Use filter and intersection logic to check if there are common petalIds
		const consonantSiblings = consonantSegments.filter(
			(x: ConsonantSegment) =>
				x.name != this.name && // Don't include our own ConsonantSegment as a sibling
				x
					.getPetalIds(flower)
					.some((petalId: number) => petalIds.includes(petalId)),
		);
		return consonantSiblings;
	}

	constructor(
		name: string,
		ipa: string,
		categories: ConsonantCategories[],
		petalIds: {
			manner?: number[];
			voice?: number[];
			place?: number[];
			all?: number[];
		} = {},
	) {
		super(name, ipa);
		this.categories = categories;
		this.flowerToPetalIds = new Map<ConsonantFlower, number[]>([
			[ConsonantFlower.Manner, petalIds.manner ?? []],
			[ConsonantFlower.Voice, petalIds.voice ?? []],
			[ConsonantFlower.Place, petalIds.place ?? []],
			[ConsonantFlower.All, petalIds.all ?? []],
		]);
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class VowelSegment extends Segment {
	constructor(name: string, ipa: string) {
		super(name, ipa);
	}
}

enum ConsonantCategories {
	Initial,
	Final,
}

enum ConsonantFlower {
	Manner,
	Voice,
	Place,
	All,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars

class AllSegments {
	static getAllSegmentsHardcoded() {
		return [
			// Vowels
			new VowelSegment('oo', 'u'),
			new VowelSegment('ee', 'i'),
			new VowelSegment('uh', 'ʌ'),
			new VowelSegment('ow', 'əʊ'),
			new VowelSegment('eye', 'aɪ'),
			new VowelSegment('oh', 'o'),
			new VowelSegment('oy', 'ɔɪ'),
			new VowelSegment('ih', 'ɪ'),
			new VowelSegment('ah', 'ɑ'),
			new VowelSegment('ay', 'ɛ'),

			// Consonants
			new ConsonantSegment(
				't',
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
				'ʃ',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [0],
					place: [1],
					all: [0],
				},
			),
			new ConsonantSegment('y', 
				'j',
				[ConsonantCategories.Initial], {
				manner: [0, 1],
				all: [0],
			}),
			new ConsonantSegment(
				'n',
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
				'l',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [0, 1],
					all: [0],
				},
			),
			new ConsonantSegment(
				'z',
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
				'd',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [1],
					voice: [3],
					place: [4],
					all: [0],
				},
			),
			new ConsonantSegment('zh', 
			'ʒ',
			[ConsonantCategories.Final], {
				manner: [1],
				place: [2],
				all: [0],
			}),
			new ConsonantSegment(
				'g',
				'ɡ',
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
				'ɾ',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [2, 3, 4, 5],
					all: [0],
				},
			),
			new ConsonantSegment(
				'j',
				'dʒ',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [2, 4],
					all: [0],
				},
			),
			new ConsonantSegment('ng', 
				'ŋ',
			[ConsonantCategories.Final], {
				manner: [2, 3, 4, 5],
				place: [0],
				all: [0],
			}),
			new ConsonantSegment(
				'ch',
				'tʃ⁠',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [3, 5],
					all: [0],
				},
			),
			new ConsonantSegment(
				'k',
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
				'p',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					manner: [6],
					voice: [4],
					place: [3],
					all: [0],
				},
			),
			new ConsonantSegment('h', 'h', [ConsonantCategories.Initial], {
				manner: [6, 7],
				place: [1],
				all: [0],
			}),
			new ConsonantSegment('w', 'w', [ConsonantCategories.Initial], {
				manner: [6, 7],
				all: [0],
			}),
			new ConsonantSegment(
				'm',
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
				'θ',
				[ConsonantCategories.Initial, ConsonantCategories.Final],
				{
					place: [2],
					all: [0],
				},
			),
		];
	}
}


// ---- NEW ----




// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function generateAudio() {
  // The text to synthesize

  for (const vowel of AllSegments.getAllSegmentsHardcoded().filter(value => {
    return value instanceof VowelSegment
  })) {
    for (const consonant of AllSegments.getAllSegmentsHardcoded().filter(value => {
      return value instanceof ConsonantSegment
    })) {
      const text = consonant.name + vowel.name;
	  const ipa = consonant.ipa + vowel.ipa;

      // Construct the request
      const request = {
        input: {
			'ssml': '<phoneme alphabet=ipa ph="a">a</phoneme>'
		},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
      };
    
      // Performs the text-to-speech request
      const [response] = await client.synthesizeSpeech(request);
      // Write the binary audio content to a local file
      const writeFile = util.promisify(fs.writeFile);
      const fileName = text + '.mp3'
      await writeFile(fileName, response.audioContent, 'binary');
      console.log('Audio content written to file: output.mp3');
    }
  }
}

generateAudio();

