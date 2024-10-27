import { database } from "@/app/config/firebase"
import useUser from "@/app/store/useUser"
import { IRegister } from "@/app/types"
import { showToast } from "@/app/utils/common"
import { Link, router } from "expo-router"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore"
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
		name: "",
	})
	const [isChecked, setChecked] = useState<boolean>(false)
	const [isSaving, setIsSaving] = useState<boolean>(false)
	const { loginUser } = useUser()

	const handleInputChange = (field: keyof IRegister, value: string) => {
		setRegisterData({ ...registerData, [field]: value })
	}

	/**
	 * Handle sign up
	 * @returns
	 */
	const handleSignup = async () => {
		if (!isChecked) {
			showToast("Please read and accept the terms and conditions.", "error")
			return
		}

		if (
			registerData.email === "" ||
			registerData.password === "" ||
			registerData.confirmPassword === ""
		) {
			return showToast("Please fill in all the fields.", "error")
		}

		// Basic validation
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{6,}$/

		if (!passwordRegex.test(registerData.password)) {
			showToast(
				"Password must be at least 6 characters long and contain at least one uppercase letter and one number.",
				"error"
			)
			setIsSaving(false)
			return
		}

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

		if (!emailRegex.test(registerData.email)) {
			showToast("Please enter a valid email address.", "error")
			return
		}

		if (registerData.password !== registerData.confirmPassword) {
			showToast("Passwords do not match.", "error")
			setIsSaving(false)
			return
		}

		const auth = getAuth()

		// Register with Firebase auth
		await createUserWithEmailAndPassword(
			auth,
			registerData.email,
			registerData.password
		)
			.then(async (userCredential: { user: { uid: string } }) => {
				// Save user to Firebase
				try {
					await setDoc(doc(database, "user", userCredential.user.uid), {
						email: registerData.email,
						dateCreated: Timestamp.now(),
						isRealtor: false,
						expoPushToken: "",
						allowPushNotifications: true,
					}).then((userDoc) => {
						console.log("🚀 ~ awaitaddDoc ~ userDoc:", userDoc)
						// Save user details with zustand
						loginUser({
							email: registerData.email,
							isRealtor: false,
							expoPushToken: "",
							allowPushNotifications: true,
							userID: userCredential.user.uid,
							name: registerData.name,
						})

						// Navigate to home
						router.push("/")
					})
				} catch (error: any) {
					showToast(
						"An error occurred. Please try again. Error: " +
							JSON.stringify(error),
						"error"
					)
					setIsSaving(false)
				}
			})
			.catch((error: any) => {
				showToast(
					"An error occurred. Please try again. Error: " +
						JSON.stringify(error),
					"error"
				)
				setIsSaving(false)
			})
	}

	return (
		<View style={styles.container}>
			<Text style={styles.subtitle}>Don't have an account yet?</Text>
			<Text style={styles.title}>Sign Up</Text>

			<RoundedInput
				placeholder="Email"
				secureTextEntry={false}
				value={registerData.email}
				onChangeText={(text) => handleInputChange("email", text)}
			/>
			<RoundedInput
				placeholder="Password"
				secureTextEntry={true}
				value={registerData.password}
				onChangeText={(text) => handleInputChange("password", text)}
			/>
			<RoundedInput
				placeholder="Confirm Password"
				secureTextEntry={true}
				value={registerData.confirmPassword}
				onChangeText={(text) => handleInputChange("confirmPassword", text)}
			/>

			<Checkbox
				checked={isChecked}
				onChange={() => setChecked(!isChecked)}
				label={<Link href="/terms">Terms and Conditions</Link>}
			/>

			<RoundedButton title="Sign Up" color="yellow" onPress={handleSignup} />
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
		color: "#15392F",
	},
	subtitle: {
		fontSize: 16,
		marginBottom: 8,
		fontFamily: "Exo2_400Regular",
		color: "#15392F",
	},
})
