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
		practiceTarget?: ConsonantCategories | null,
	): ConsonantSegment[] {
		const petalIds = this.getPetalIds(flower);

		// Use filter to ensure x is of type ConsonantSegment
		const consonantSegments: ConsonantSegment[] = canSayInventory.filter(
			(x: Segment): x is ConsonantSegment => x instanceof ConsonantSegment,
		);

		// Use filter and intersection logic to check if there are common petalIds
		const consonantSiblings = consonantSegments.filter(
			(x: ConsonantSegment) => {
				// Don't include our own ConsonantSegment as a sibling
				if (x.name == this.name) {
					return false;
				}
				// If it doesn't match the requested .initial or .final, return false
				if (practiceTarget != null) {
					if (!x.categories.includes(practiceTarget)) {
						return false;
					}
				}
				// If it's not a sibling, return false
				if (
					!x
						.getPetalIds(flower)
						.some((petalId: number) => petalIds.includes(petalId))
				) {
					return false;
				}

				return true;
			},
		);
		return consonantSiblings;
	}

	constructor(
		name: string,
		categories: ConsonantCategories[],
		petalIds: {
			manner?: number[];
			voice?: number[];
			place?: number[];
			all?: number[];
		} = {},
	) {
		super(name);
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
	All,
}
