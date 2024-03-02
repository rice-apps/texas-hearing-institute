import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	consonantInventoryPersistenceKey,
	vowelInventoryPersistenceKey,
} from './soundInventoryDataAndKeys';
import {
	ConsonantCategories,
	ConsonantSegment,
	Segment,
	VowelSegment,
} from './Segment';
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

		const itemsSelected: boolean[] = items.map(
			(item) => itemSelectionMap.get(item) ?? false,
		);
		return itemsSelected;
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
	try {
		const vowelSelectionJson = await AsyncStorage.getItem(
			vowelInventoryPersistenceKey,
		);

		let vowelSelectionMap = new Map<string, boolean>();

		if (vowelSelectionJson !== null) {
			const vowelSelectionArray: [string, boolean][] =
				JSON.parse(vowelSelectionJson);
			vowelSelectionMap = new Map(vowelSelectionArray);
		}

		const selectedVowels = Array.from(vowelSelectionMap.keys()).filter((s) =>
			vowelSelectionMap.get(s),
		);

		const segments = AllSegments.getAllSegmentsHardcoded();

		return segments.filter((seg: Segment) => selectedVowels.includes(seg.name));
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const retrieveInitialConsonants = async (): Promise<
	ConsonantSegment[]
> => {
	try {
		const consonantSelectionJson = await AsyncStorage.getItem(
			consonantInventoryPersistenceKey,
		);
		let consonantSelectionMap = new Map<string, boolean>();

		if (consonantSelectionJson !== null) {
			const consonantSelectionArray: [string, boolean][] = JSON.parse(
				consonantSelectionJson,
			);
			consonantSelectionMap = new Map(consonantSelectionArray);
		}

		const selectedConsonants = Array.from(consonantSelectionMap.keys()).filter(
			(s) => consonantSelectionMap.get(s),
		);

		const segments = AllSegments.getAllSegmentsHardcoded();

		const consonantSegments: ConsonantSegment[] = segments.filter(
			(seg) => seg instanceof ConsonantSegment,
		) as ConsonantSegment[];

		return consonantSegments.filter(
			(seg: ConsonantSegment) =>
				selectedConsonants.includes(seg.name) &&
				seg.categories.includes(ConsonantCategories.Initial),
		);
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const retrieveFinalConsonants = async (): Promise<
	ConsonantSegment[]
> => {
	try {
		const consonantSelectionJson = await AsyncStorage.getItem(
			consonantInventoryPersistenceKey,
		);
		let consonantSelectionMap = new Map<string, boolean>();

		if (consonantSelectionJson !== null) {
			const consonantSelectionArray: [string, boolean][] = JSON.parse(
				consonantSelectionJson,
			);
			consonantSelectionMap = new Map(consonantSelectionArray);
		}

		const selectedConsonants = Array.from(consonantSelectionMap.keys()).filter(
			(s) => consonantSelectionMap.get(s),
		);

		const segments = AllSegments.getAllSegmentsHardcoded();

		const consonantSegments: ConsonantSegment[] = segments.filter(
			(seg) => seg instanceof ConsonantSegment,
		) as ConsonantSegment[];

		return consonantSegments.filter(
			(seg: ConsonantSegment) =>
				selectedConsonants.includes(seg.name) &&
				seg.categories.includes(ConsonantCategories.Final),
		);
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const retrieveConsonants = async (): Promise<ConsonantSegment[]> => {
	try {
		const consonantSelectionJson = await AsyncStorage.getItem(
			consonantInventoryPersistenceKey,
		);
		let consonantSelectionMap = new Map<string, boolean>();

		if (consonantSelectionJson !== null) {
			const consonantSelectionArray: [string, boolean][] = JSON.parse(
				consonantSelectionJson,
			);
			consonantSelectionMap = new Map(consonantSelectionArray);
		}

		const selectedConsonants = Array.from(consonantSelectionMap.keys()).filter(
			(s) => consonantSelectionMap.get(s),
		);

		const segments = AllSegments.getAllSegmentsHardcoded();

		const consonantSegments: ConsonantSegment[] = segments.filter(
			(seg) => seg instanceof ConsonantSegment,
		) as ConsonantSegment[];

		return consonantSegments.filter((seg: ConsonantSegment) =>
			selectedConsonants.includes(seg.name),
		);
	} catch (e) {
		console.log(e);
		return [];
	}
};
