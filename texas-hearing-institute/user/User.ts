/**
 Design priorities
 - Efficient data syncing minimizing calls to the server while ensuring that data is persisted in a reasonable amount of time
 - Some offline caching
 - Data security is not considered
 - Multiple users modfiying the user structure on the server at once is not a priority
 - Allow some parts of the app to be used offline (e.g. practice)
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

export class User {
	// Data about syncing
	#lastFetchedFromServer: Date = new Date(0);
	#lastSyncedToServer: Date = new Date(0);
	#lastSyncedData: User | undefined = undefined;

	// Actual fields
	#id = '%0';
	#email = '%0';
	#name = '%0'; // user-updatable
	#clinicianId = '%0';
	#clinicianUserId = '%0';
	#groupId = '%0'; // user-updatable
	#reports: string[] = []; // user-updatable

	deepCopy(): User {
		const copy = new User();

		// Copying all fields
		copy.#lastFetchedFromServer = new Date(
			this.#lastFetchedFromServer.getTime(),
		);
		copy.#lastSyncedToServer = new Date(this.#lastSyncedToServer.getTime());

		copy.#id = this.#id;
		copy.#email = this.#email;
		copy.#name = this.#name;
		copy.#clinicianId = this.#clinicianId;
		copy.#clinicianUserId = this.#clinicianUserId;
		copy.#groupId = this.#groupId;
		copy.#reports = [...this.#reports]; // Creates a shallow copy of the array

		return copy;
	}

	// Local Persistence
	async initializeFromDisk() {
		// This should run on app start and load the user's ID and whatever authentication tokens from disk.
		// Basically any data that is required to fetch from the server.

		try {
			const dataFromDisk = await this.#fetchFromDiskCache();
			if (dataFromDisk !== null) {
				Object.assign(this, dataFromDisk);
			}
		} catch (e) {
			console.log(e);
		}
	}

	// This should also run on app start, essentially ensuring that some data is available even when the app is offline.
	#serialize(): string {
		return JSON.stringify(this);
	}

	#deserializeFrom(data: string): User | null {
		return JSON.parse(data);
	}

	async #fetchFromDiskCache(): Promise<User | null> {
		const dataFromDisk = await AsyncStorage.getItem('userDataCache');
		if (dataFromDisk !== null) {
			const deserialized = this.#deserializeFrom(dataFromDisk);
			return deserialized;
		} else {
			return null;
		}
	}

	async #saveToDiskCache() {
		try {
			const serialized = this.#serialize();
			await AsyncStorage.setItem('userDataCache', serialized);
		} catch (e) {
			console.log(e);
		}
	}

	async initialize() {
		await this.initializeFromDisk();
		if (this.#id === null) {
			return;
		} else {
			await this.#fetchFromDiskCache();
			this.fetchFromServer();
		}
	}

	// Setters
	setName(newValue: string) {
		this.#name = newValue;
		// const newUser = this.deepCopy();
		// newUser.#name = newValue;
		// return this.#syncImmediatelyWithServer(newUser).then((success) => {
		// 	if (success) {
		// 		this.#name = newValue;
		// 		this.#saveToDiskCache();
		// 	}

		// 	return success;
		// });
	}

	setID(newValue: string) {
		this.#id = newValue;
	}

	setEmail(newValue: string) {
		this.#email = newValue;
	}

	setGroupId(newGroupId: string) {
		// TODO: this function
		// IMPORTANT: Extra logic related to group ID

		if (newGroupId !== this.#groupId) {
			// TODO
			this.#groupId = newGroupId;
		}

		// return this.#syncImmediatelyWithServer().then((success) => {
		//     if (success) {
		//         this.#groupId = newGroupId
		//     }
		//
		//     return success
		// })
	}

	addReport(newItem: string) {
		this.#reports.push(newItem);
		this.#saveToDiskCache();
		this.#syncImmediatelyWithServer(this);
	}

	getId(): string {
		return this.#id;
	}

	getEmail(): string {
		return this.#email;
	}

	getName(): string {
		return this.#name;
	}

	getGroupId() {
		return this.#groupId;
	}

	getReports(): string[] {
		return this.#reports;
	}

	syncWithServer() {
		// Public sync with server function
		this.#syncImmediatelyWithServer(this);
	}

	async #debouncedSyncWithServer() {
		// Smartly waits
		// not implemented and used for now, but could be a good idea.
		await this.#syncImmediatelyWithServer(this);
	}

	async #syncImmediatelyWithServer(object: User): Promise<boolean> {
		// Syncs with the server immediately; returns whether sync was successful
		// TODO: Sync to the server

		// Use the delta between this and this.lastSyncedDatato upload deltas

		this.#lastSyncedToServer = new Date();
		this.#lastSyncedData = this.deepCopy();
		Object.assign(this, object);

		await this.fetchFromServer();
		return true;
	}

	async fetchFromServer(): Promise<User> {
		// TODO: actually fetch from the server
		// Fetches data from the server, overwriting all local data
		this.#lastFetchedFromServer = new Date();
		return this.deepCopy();
	}
}
