import { Timestamp } from "firebase/firestore"

export interface IProfile {
	id: string;
	name: string;
	email: string;
	profilePictureUrl: string;
}

export interface IUser {
	email: string
	userID: string
	expoPushToken: string
	allowPushNotifications: boolean
	isRealtor: boolean
	name: string
}

export interface ILogin {
	email: string
	password: string
}

export interface IRegister {
	email: string
	password: string
	expoPushToken: string
	confirmPassword: string
	name: string
}

export interface IMessage {
	recipientName: string
	recipientID: string
	senderID: string
	senderName: string
	text: string
	dateCreated: Timestamp
	id: string
}

export interface IListing {
	id: string
	title: string
	description: string
	dateCreated: Timestamp
	filters: string[]
	images: string[]
	location: string
	realtorID: string
	realtorName: string
}

export interface IFilter {
	location: string
	state: string
	homeType: string
	bedrooms: number
	bathrooms: number
	minCost: number
	maxCost: number
	floors: number
	minSquareFootage: number
	laundry: boolean
	pool: boolean
	porch: boolean
	backyard: boolean
	fireplace: boolean
	garage: boolean
	HOA: boolean
	wheelchairAccessible: boolean
	elevator: boolean
	setHomeType: (value: string) => void
	setBedrooms: (value: number) => void
	setBathrooms: (value: number) => void
	setMinCost: (value: number) => void
	setMaxCost: (value: number) => void
	setFloors: (value: number) => void
	setMinSquareFootage: (value: number) => void
}

export type ToastType = "success" | "error"
