import { AllSegments } from './AllSegmentsHardcoded';

export class Segment {
	name = '';

	constructor(name: string) {
		this.name = name;
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ConsonantSegment extends Segment {
	// Categories can contain either ConsonantCategories.initial, .final, or both
	categories: ConsonantCategories[] = [];

	// Maps "ConsonantFlower.XXX" to the petal IDs that this consonant belongs to in that flower
	flowerToPetalIds = new Map<ConsonantFlower, number[]>([
		[ConsonantFlower.Manner, []],
		[ConsonantFlower.Voice, []],
		[ConsonantFlower.Place, []],
	]);

	getPetalIds(consonantFlower: ConsonantFlower): number[] {
		// Return the corresponding petal IDs (or, for null safety, an empty array if the value doesn't exist)
		return this.flowerToPetalIds.get(consonantFlower) ?? [];
	}

	// Fetch other ConsonantSegments from canSayInventory that share any of the petalIds in this.getPetalIds
	fetchConsonantSiblings(flower: ConsonantFlower): ConsonantSegment[] {
		const petalIds = this.getPetalIds(flower);

		// TODO: Assuming canSayInventory is an array of Segments
		//  We would want to read this from async storage
		const canSayInventory: Segment[] = AllSegments.getAllSegmentsHardcoded();

		console.log('4', canSayInventory);

		// Use filter to ensure x is of type ConsonantSegment
		const consonantSegments: ConsonantSegment[] = canSayInventory.filter(
			(x: Segment): x is ConsonantSegment => x instanceof ConsonantSegment,
		);

		console.log('5:', consonantSegments);

		// Use filter and intersection logic to check if there are common petalIds
		const consonantSiblings = consonantSegments.filter(
			(x: ConsonantSegment) =>
				x.name != this.name && // Don't include our own ConsonantSegment as a sibling
				x
					.getPetalIds(flower)
					.some((petalId: number) => petalIds.includes(petalId)),
		);
		console.log('6:', consonantSiblings);
		return consonantSiblings;
	}

	constructor(
		name: string,
		categories: ConsonantCategories[],
		petalIds: {
			manner?: number[];
			voice?: number[];
			place?: number[];
		} = {},
	) {
		super(name);
		this.categories = categories;
		this.flowerToPetalIds = new Map<ConsonantFlower, number[]>([
			[ConsonantFlower.Manner, petalIds.manner ?? []],
			[ConsonantFlower.Voice, petalIds.voice ?? []],
			[ConsonantFlower.Place, petalIds.place ?? []],
		]);
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class VowelSegment extends Segment {
	constructor(name: string) {
		super(name);
	}
}

export enum ConsonantCategories {
	Initial,
	Final,
}

export enum ConsonantFlower {
	Manner,
	Voice,
	Place,
}
