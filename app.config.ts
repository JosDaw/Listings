export default ({ config }: { config: any }) => ({
	...config,
	expo: {
		name: "Listings",
		slug: "Listings",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/images/icon.png",
		scheme: "myapp",
		userInterfaceStyle: "automatic",
		splash: {
			image: "./assets/images/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/images/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
		},
		web: {
			bundler: "metro",
			output: "static",
			favicon: "./assets/images/favicon.png",
		},
		plugins: ["expo-router", "expo-secure-store"],
		experiments: {
			typedRoutes: true,
		},
		extra: {
			EXPO_PUBLIC_FIREBASE_APIKEY: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
			EXPO_PUBLIC_FIREBASE_PROJECTID:
				process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
			EXPO_PUBLIC_FIREBASE_STORAGEBUCKET:
				process.env.EXPO_PUBLIC_FIREBASE_STORAGEBUCKET,
			EXPO_PUBLIC_FIREBASE_MESSAGINGSENDERID:
				process.env.EXPO_PUBLIC_FIREBASE_MESSAGINGSENDERID,
			EXPO_PUBLIC_FIREBASE_AUTHDOMAIN:
				process.env.EXPO_PUBLIC_FIREBASE_AUTHDOMAIN,
			EXPO_PUBLIC_FIREBASE_APPID: process.env.EXPO_PUBLIC_FIREBASE_APPID,
		},
	},
	extra: {
		EXPO_PUBLIC_FIREBASE_APIKEY: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
		EXPO_PUBLIC_FIREBASE_PROJECTID: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
		EXPO_PUBLIC_FIREBASE_STORAGEBUCKET:
			process.env.EXPO_PUBLIC_FIREBASE_STORAGEBUCKET,
		EXPO_PUBLIC_FIREBASE_MESSAGINGSENDERID:
			process.env.EXPO_PUBLIC_FIREBASE_MESSAGINGSENDERID,
		EXPO_PUBLIC_FIREBASE_APPID: process.env.EXPO_PUBLIC_FIREBASE_APPID,
		EXPO_PUBLIC_FIREBASE_AUTHDOMAIN:
			process.env.EXPO_PUBLIC_FIREBASE_AUTHDOMAIN,
	},
})
