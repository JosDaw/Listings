import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store"
import { create } from "zustand"
import { persist, PersistStorage } from "zustand/middleware"
import { IFilter } from "../types"

// Define the state structure
interface FilterState {
	filter: IFilter
}

// Define the actions
interface FilterActions {
	updateFilter: (values: IFilter) => void
}

// Combine state and actions for the complete store type
type FilterStore = FilterState & FilterActions

const initalFilter: IFilter = {
	location: "Richmond",
	state: "Virginia",
	homeType: "House",
	bedrooms: 1,
	bathrooms: 1,
	minCost: 250000,
	maxCost: 500000,
	floors: 2,
	minSquareFootage: 10,
	laundry: false,
	pool: false,
	porch: false,
	backyard: false,
	fireplace: false,
	garage: false,
	HOA: false,
	wheelchairAccessible: false,
	elevator: false,
	setHomeType: () => {},
	setBedrooms: () => {},
	setBathrooms: () => {},
	setMinCost: () => {},
	setMaxCost: () => {},
	setFloors: () => {},
	setMinSquareFootage: () => {},
}

// Custom secure storage adapter for zustand persist middleware
const secureStorage: PersistStorage<FilterStore> = {
	setItem: async (name, value) => {
		await setItemAsync(name, JSON.stringify(value))
	},
	getItem: async (name) => {
		const result = await getItemAsync(name)
		return result ? JSON.parse(result) : null
	},
	removeItem: async (name) => {
		await deleteItemAsync(name)
	},
}

const useFilter = create<FilterStore>()(
	persist(
		(set, get) => ({
			filter: initalFilter,
			updateFilter: (values: IFilter) => {
				set({ filter: values })
			},
		}),
		{
			name: "filter",
			storage: secureStorage,
		}
	)
)

export default useFilter
