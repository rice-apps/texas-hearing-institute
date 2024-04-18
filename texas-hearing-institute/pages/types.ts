export interface Phoneme {
	name: string;
	correct: boolean;
}
export interface PhonemeListProps {
	phonemes: Phoneme[];
	user: string;
}

export interface ReportInfo {
	child: string;
	createdAt: string;
	type: string;
	subtype: string;
	sound: string;
	mode: string;
	voweltype: string;
	combinations: string[];
	numSyllables: number;
	correct: boolean[];
}
