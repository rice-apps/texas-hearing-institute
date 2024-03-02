import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	consonantInventoryPersistenceKey,
	consonants,
	vowelInventoryPersistenceKey,
	vowels,
} from './soundInventoryDataAndKeys';
import { ConsonantSegment, VowelSegment } from './Segment';
import { AllSegments } from './AllSegmentsHardcoded';

// Store selection
export const storeItemSelection = async (
	storageKey: string,
	items: string[],
	itemsSelected: boolean[],
) => {
	const itemSelectionMap = new Map<string, boolean>();
	for (let i = 0; i < items.length; i++) {
		itemSelectionMap.set(items[i], itemsSelected[i]);
	}
	try {
		await AsyncStorage.setItem(
			storageKey,
			JSON.stringify(Array.from(itemSelectionMap.entries())),
		);
	} catch (e) {
		console.log(e);
	}
};

// Retrieve selection
export const retrieveItemSelections = async (
	storageKey: string,
	items: string[],
): Promise<boolean[]> => {
	try {
		const itemSelectionJson = await AsyncStorage.getItem(storageKey);
		let itemSelectionMap = new Map<string, boolean>();

		if (itemSelectionJson !== null) {
			const itemSelectionArray: [string, boolean][] =
				JSON.parse(itemSelectionJson);
			itemSelectionMap = new Map(itemSelectionArray);
		}

		// Items selected =
		return items.map((item) => itemSelectionMap.get(item) ?? false);
	} catch (e) {
		console.log(e);
		return items.map(() => false);
	}
};

export const retrieveSelectedItems = async (
	storageKey: string,
	items: string[] | undefined = undefined,
): Promise<string[]> => {
	try {
		const itemSelectionJson = await AsyncStorage.getItem(storageKey);
		let itemSelectionMap = new Map<string, boolean>();

		if (itemSelectionJson !== null) {
			const itemSelectionArray: [string, boolean][] =
				JSON.parse(itemSelectionJson);
			itemSelectionMap = new Map(itemSelectionArray);
		}

		const keys = Object.keys(itemSelectionMap);

		if (items == undefined) {
			return keys;
		}

		return keys.filter((item) => {
			return items.includes(item);
		});
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const retrieveVowels = async (): Promise<VowelSegment[]> => {
	const result = await retrieveItemSelections(
		vowelInventoryPersistenceKey,
		vowels,
	);
	// `result` is a boolean array — it maps to the `vowels` you can select
	// EG: vowels            = ['oo', 'eye', 'ay']
	//     result            = [false, true, true]
	//     enabledVowels     =       ['eye', 'ah']
	const enabledVowels = vowels.filter((_, index) => result[index]);
	// We want to map this string array of `enabledVowels` to actual VowelSegment objects.
	// Get all segments and then filter by the string / phoneme

	return AllSegments.getAllSegmentsHardcoded().filter((value) => {
		enabledVowels.includes(value.name);
	}) as VowelSegment[]; // We can map to VowelSegment[] bc we know `enabledVowels` are only vowels
};

export const retrieveConsonants = async (): Promise<ConsonantSegment[]> => {
	const result = await retrieveItemSelections(
		consonantInventoryPersistenceKey,
		consonants,
	);
	// `result` is a boolean array — it maps to the `consonants` you can select
	// EG: consonants        = ['t', 'ch', 'zh']
	//     result            = [false, true, true]
	//     enabledConsonants =      ['ch', 'zh']
	const enabledConsonants = consonants.filter((_, index) => result[index]);
	// We want to map this string array of `enabledConsonants` to actual ConsonantSegment objects.
	// Get all segments and then filter by the string / phoneme

	return AllSegments.getAllSegmentsHardcoded().filter((value) => {
		enabledConsonants.includes(value.name);
	}) as ConsonantSegment[]; // We can map to ConsonantSegment[] bc we know `enabledConsonants` are only consonants
};
