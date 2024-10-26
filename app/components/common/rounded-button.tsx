import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

interface RoundedButtonProps {
	title: string
	color?: "yellow" | "blue"
	onPress: () => void
}

export default function RoundedButton({
	title,
	color = "yellow",
	onPress,
}: RoundedButtonProps) {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				color === "yellow" ? styles.yellowButton : styles.blueButton,
			]}
			onPress={onPress}
		>
			<Text
				style={[
					styles.buttonText,
					color === "yellow" ? styles.blackText : styles.whiteText,
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 25,
		paddingVertical: 8,
		paddingHorizontal: 30,
		alignItems: "center",
		marginVertical: 10,
	},
	yellowButton: {
		backgroundColor: "#EBA743",
		borderWidth: 2,
		borderColor: "#000",
	},
	blueButton: {
		backgroundColor: "#BEDBBE",
	},
	buttonText: {
		fontSize: 16,
		fontFamily: "Exo2_400Regular",
	},
	blackText: {
		color: "#000",
	},
	whiteText: {
		color: "#FFF",
	},
})
