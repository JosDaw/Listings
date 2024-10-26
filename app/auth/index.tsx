import { StyleSheet, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Login from "../components/auth/login"
import Register from "../components/auth/register"

export default function Signup() {
	return (
		<KeyboardAwareScrollView
			contentContainerStyle={styles.scrollContainer}
			style={styles.background}
		>
			<View style={styles.container}>
				<View style={styles.childContainer}>
					<Login />
					<Register />
				</View>
			</View>
		</KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: "#BEDBBE",
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	childContainer: {
		backgroundColor: "#F0EEEE",
		padding: 16,
		borderRadius: 8,
		borderWidth: 5,
		borderColor: "#EBA743",
	},
})
