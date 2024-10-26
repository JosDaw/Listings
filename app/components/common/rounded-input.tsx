import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"

interface RoundedInputProps {
	value: string
	onChangeText: (text: string) => void
	placeholder: string
	secureTextEntry?: boolean
}

export default function RoundedInput({
	value,
	onChangeText,
	placeholder,
	secureTextEntry = false,
}: RoundedInputProps) {
	const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry)

	const togglePasswordVisibility = () => {
		setPasswordVisible(!isPasswordVisible)
	}

	return (
		<View style={styles.inputContainer}>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				placeholderTextColor="#888"
				secureTextEntry={isPasswordVisible}
				value={value}
				onChangeText={onChangeText}
			/>
			{secureTextEntry && (
				<TouchableOpacity
					onPress={togglePasswordVisibility}
					style={styles.icon}
				>
					<Ionicons
						name={isPasswordVisible ? "eye-off" : "eye"}
						size={24}
						color="#888"
					/>
				</TouchableOpacity>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	inputContainer: {
		width: "90%",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 25,
		borderWidth: 1,
		borderColor: "#000",
		paddingHorizontal: 15,
		marginVertical: 5,
	},
	input: {
		flex: 1,
		paddingVertical: 12,
		fontSize: 16,
		fontFamily: "Exo2_400Regular",
	},
	icon: {
		padding: 5,
	},
})
