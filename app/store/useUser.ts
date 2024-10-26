import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store"
import { create } from "zustand"
import { persist, PersistStorage } from "zustand/middleware"
import { IUser } from "../types"

// Define the state structure
interface UserState {
	user: IUser
	isLoggedIn: boolean
}

// Define the actions
interface UserActions {
	loginUser: (values: IUser) => void
	logoutUser: () => void
	updatePushNotifications: (value: boolean) => void
}

// Combine state and actions for the complete store type
type UserStore = UserState & UserActions

const initialUser: IUser = {
	email: "",
	name: "",
	userID: "",
	expoPushToken: "",
	allowPushNotifications: true,
	isRealtor: false,
}

// Custom secure storage adapter for zustand persist middleware
const secureStorage: PersistStorage<UserStore> = {
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

const useUser = create<UserStore>()(
	persist(
		(set, get) => ({
			user: initialUser,
			isLoggedIn: false,

			loginUser: (values: IUser) => {
				set({ user: values, isLoggedIn: true })
			},
			logoutUser: () => {
				set({ user: initialUser, isLoggedIn: false })
			},
			updatePushNotifications: (value: boolean) => {
				const currentUser = get().user
				if (currentUser) {
					set({ user: { ...currentUser, allowPushNotifications: value } })
				}
			},
		}),
		{
			name: "user",
			storage: secureStorage,
		}
	)
)

export default useUser
