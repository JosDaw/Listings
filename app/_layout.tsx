import { useColorScheme } from "@/hooks/useColorScheme"
import { Exo2_400Regular } from "@expo-google-fonts/exo-2"
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native"
import * as Font from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import "react-native-reanimated"
import { RootSiblingParent } from 'react-native-root-siblings'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
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
		<RootSiblingParent>
			<SafeAreaProvider>
				<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
					<View onLayout={onLayoutRootView} style={{ flex: 1 }}>
						<SafeAreaView
							style={{
								flex: 1,
								backgroundColor: '#B9D9C3'
							}}
							edges={["right", "top", "left"]}
						>
							<StatusBar style="light" />
							<Stack>
								<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
								<Stack.Screen name="+not-found" />
								<Stack.Screen name="auth" />
							</Stack>
						</SafeAreaView>
					</View>
				</ThemeProvider>
			</SafeAreaProvider>
		</RootSiblingParent>
	)
}
