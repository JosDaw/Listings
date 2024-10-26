import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import RoundedButton from "../common/rounded-button"
import RoundedInput from "../common/rounded-input"

export default function Login() {
	const [loginData, setLoginData] = useState<ILogin>({
		email: "",
		password: "",
	})
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign In</Text>
			<RoundedInput
				placeholder="Email"
				secureTextEntry={false}
				value={loginData.email}
				onChangeText={() => {
					setLoginData({ ...loginData, email: loginData.email })
				}}
			/>
			<RoundedInput
				placeholder="Password"
				secureTextEntry={true}
				value={loginData.password}
				onChangeText={() => {
					setLoginData({ ...loginData, password: loginData.password })
				}}
			/>
			<RoundedButton
				title="Sign In"
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
