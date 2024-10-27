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
				tabBarStyle: {
					backgroundColor: Colors[colorScheme ?? "light"].background,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarShowLabel: false,
					title: "Home",
					tabBarActiveTintColor: "#EBA743",
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome6
							name="house-chimney"
							size={24}
							color={focused ? "#EBA743" : color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="favourites"
				options={{
					title: "Favourites",
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#EBA743",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={"heart"} color={focused ? "#EBA743" : color} />
					),
				}}
			/>
			<Tabs.Screen
				name="messages"
				options={{
					title: "Messages",
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#EBA743",
					tabBarIcon: ({ color, focused }) => (
						<Entypo
							name="message"
							size={24}
							color={focused ? "#EBA743" : color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#EBA743",
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome
							name="user-circle"
							size={24}
							ccolor={focused ? "#EBA743" : color}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
