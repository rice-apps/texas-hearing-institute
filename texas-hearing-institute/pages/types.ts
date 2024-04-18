import { ConsonantFlower } from '../utils/Segment';

export interface PracticeResult {
	phonemes: string[];
	correct: boolean;
}

export type Type = 'speech' | 'listening';

export type Subtype = 'vowels' | 'initial consonants' | 'final consonants';

export function modeToString(mode: ConsonantFlower) {
	switch (mode) {
		case ConsonantFlower.Manner:
			return 'manner';
		case ConsonantFlower.Place:
			return 'place cue';
		case ConsonantFlower.Voice:
			return 'voicing';
		case ConsonantFlower.All:
			return 'variegated vowels';
	}
}
export type Mode = 'variegated vowels' | 'voicing' | 'place cue' | 'manner';

export type VowelType = 'same' | 'different';
export interface PracticeSettings {
	type: Type;
	subtype: Subtype;
	mode: Mode;
	vowels: VowelType;
	target: string;
	syllables: number;
}

export interface ReportInfo {
	child: string;
	createdAt: string;
	type: Type;
	subtype: Subtype;
	mode: Mode;
	vowels: VowelType;
	target: string;
	syllables: number;
	combinations: string[];
	correct: boolean[];
}
