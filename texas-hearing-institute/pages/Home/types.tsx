export interface RootStackParamList {
	Home: undefined; // undefined because you aren't passing any params to the home screen
	App: undefined;
	ReportScreen: { phonemes: PhonemeListProps; report: ReportInfo };
	InitialConsonants: undefined;
	PlaceCueTab: undefined;
	VariegatedVowels: undefined;
	Manner: undefined;
	Voicing: undefined;
	Active: undefined;
}

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
// export type RootStackParamList = {
//     Home: undefined, // undefined because you aren't passing any params to the home screen
//     InitialConsonants: undefined;
//     PlaceCueTab: undefined;
//     VariegatedVowels: undefined;
//     Manner: undefined;
//     Voicing: undefined;
//   };
