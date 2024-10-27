import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function Header() {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>listings.</Text>
			<TouchableOpacity
				style={styles.iconContainer}
				onPress={() => Alert.alert("Filter options")}
			>
				<Ionicons name="options-outline" size={35} color="#1E2E2E" />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		backgroundColor: "#B9D9C3",
		borderBottomWidth: 4,
		borderColor: "#EBA743",
	},
	headerText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#1E2E2E",
		fontFamily: "serif",
	},
	iconContainer: {
		padding: 8,
	},
})
