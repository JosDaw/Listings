import { Exo2_400Regular } from "@expo-google-fonts/exo-2"
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native"
import * as Font from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useCallback, useEffect, useState } from "react"
import "react-native-reanimated"

import { useColorScheme } from "@/hooks/useColorScheme"
import { View } from "react-native"
import AuthScreen from "./auth"
import useUser from "./store/useUser"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const [fontsLoaded, setFontsLoaded] = useState(false)
	const { isLoggedIn } = useUser()

	const loadResourcesAsync = async () => {
		try {
			// Load fonts
			await Font.loadAsync({
				Exo2_400Regular,
			})
			setFontsLoaded(true)
		} catch (error) {
			console.error("Error loading resources:", error)
		}
	}

	// Hide splash screen once resources are loaded
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	useEffect(() => {
		loadResourcesAsync()
	}, [])

	// Render null until fonts are loaded
	if (!fontsLoaded) {
		return null
	}

	if (!isLoggedIn) {
		return <AuthScreen />
	}

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<View onLayout={onLayoutRootView} style={{ flex: 1 }}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
					<Stack.Screen name="auth" />
				</Stack>
			</View>
		</ThemeProvider>
	)
}
