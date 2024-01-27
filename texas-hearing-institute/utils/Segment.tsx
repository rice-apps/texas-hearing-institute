class Segment {
	name = '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ConsonantSegment extends Segment {
	categories: ConsonantCategories[] = [];
	mannerPetalGroups: number[] = [];
	placePetalGroups: number[] = [];
	voicePetalGroups: number[] = [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class VowelSegment extends Segment {}

enum ConsonantCategories {
	Initial,
	Final,
}
