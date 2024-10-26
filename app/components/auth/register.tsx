import { Link } from "expo-router"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Checkbox from "../common/checkbox"
import RoundedButton from "../common/rounded-button"
import RoundedInput from "../common/rounded-input"

export default function Register() {
	const [registerData, setRegisterData] = useState<IRegister>({
		email: "",
		password: "",
		confirmPassword: "",
		expoPushToken: "",
	})
	const [isChecked, setChecked] = useState<boolean>(false)

	return (
		<View style={styles.container}>
			<Text>Don't have an account yet?</Text>
			<Text style={styles.title}>Sign Up</Text>
			<RoundedInput
				placeholder="Email"
				secureTextEntry={false}
				value={registerData.email}
				onChangeText={() => {
					setRegisterData({ ...registerData, email: registerData.email })
				}}
			/>
			<RoundedInput
				placeholder="Password"
				secureTextEntry={true}
				value={registerData.password}
				onChangeText={() => {
					setRegisterData({ ...registerData, password: registerData.password })
				}}
			/>
			<RoundedInput
				placeholder="Confirm Password"
				secureTextEntry={true}
				value={registerData.confirmPassword}
				onChangeText={() => {
					setRegisterData({
						...registerData,
						confirmPassword: registerData.confirmPassword,
					})
				}}
			/>
			<Checkbox
				checked={isChecked}
				onChange={() => setChecked(!isChecked)}
				label={<Link href="/terms">Terms and Conditions</Link>}
			/>
			<RoundedButton
				title="Sign Up"
				color="yellow"
				onPress={() => alert("Yellow button pressed")}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		width: "90%",
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 24,
		marginBottom: 24,
		fontFamily: "Exo2_400Regular",
	},
})
