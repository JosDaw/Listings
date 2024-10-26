import { Ionicons } from "@expo/vector-icons"
import React, { ReactNode } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface CheckboxProps {
	checked: boolean
	onChange: () => void
	label?: any // Accept any React element, not just text
	labelStyle?: object
	boxStyle?: object
}

export default function Checkbox({
	checked,
	onChange,
	label,
	labelStyle,
	boxStyle,
}: CheckboxProps) {
	return (
		<TouchableOpacity onPress={onChange} style={[styles.container, boxStyle]}>
			<View
				style={[
					styles.checkbox,
					{ backgroundColor: checked ? "#5271FF" : "#FFF" }, // Inline style for background color
				]}
			>
				{checked && <Ionicons name="checkmark" size={16} color="#FFF" />}
			</View>
			{label && (
				<View style={styles.labelContainer}>
					{typeof label === "string" ? (
						<Text style={[styles.label, labelStyle]}>{label}</Text>
					) : (
						label // Render the label directly if it's not a string (e.g., <Link> component)
					)}
				</View>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	checkbox: {
		width: 24,
		height: 24,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: "#5271FF",
		alignItems: "center",
		justifyContent: "center",
	},
	labelContainer: {
		marginLeft: 8,
	},
	label: {
		fontSize: 16,
		color: "#333",
	},
})
