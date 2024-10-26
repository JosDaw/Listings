interface IUser {
	name: string
	email: string
	userID: string
	phoneNumber: string
	expoPushToken: string
	allowPushNotifications: boolean
	isRealtor: boolean
}

interface ILogin {
	email: string
	password: string
}

interface IRegister {
	email: string
	password: string
	expoPushToken: string
	confirmPassword: string
}
