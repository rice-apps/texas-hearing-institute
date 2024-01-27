class Segment {
	name = '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ConsonantSegment extends Segment {
	// Categories can contain either ConsonantCategories.initial, .final, or both
	categories: ConsonantCategories[] = [];

	// Maps "ConsonantFlower.XXX" to the petal IDs that this consonant belongs to in that flower
	flowerToPetalId = new Map<ConsonantFlower, number[]>([
		[ConsonantFlower.Manner, []],
		[ConsonantFlower.Voice, []],
		[ConsonantFlower.Place, []],
	]);

	getPetalIds(consonantFlower: ConsonantFlower): number[] | undefined {
		return this.flowerToPetalId.get(consonantFlower);
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class VowelSegment extends Segment {}

enum ConsonantCategories {
	Initial,
	Final,
}

enum ConsonantFlower {
	Manner,
	Voice,
	Place,
}
