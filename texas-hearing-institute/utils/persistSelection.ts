import AsyncStorage from '@react-native-async-storage/async-storage';

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
