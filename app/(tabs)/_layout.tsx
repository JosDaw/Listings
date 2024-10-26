import { Tabs } from "expo-router"
import React from "react"

import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"
import { Entypo, FontAwesome, FontAwesome6 } from "@expo/vector-icons"
import Header from "../components/layout.tsx/header"

export default function TabLayout() {
	const colorScheme = useColorScheme()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				header: () => <Header />,
				tabBarStyle: { backgroundColor: Colors[colorScheme ?? "light"].background },
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
					<FontAwesome6 name="house-chimney" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="favourites"
				options={{
					title: "Favourites",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "heart" : "heart-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="messages"
				options={{
					title: "Messages",
					tabBarIcon: ({ color, focused }) => (
						<Entypo name="message" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome name="user-circle" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
