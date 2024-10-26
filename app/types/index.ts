import { Timestamp } from "firebase/firestore"

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

export type ToastType = "success" | "error"
