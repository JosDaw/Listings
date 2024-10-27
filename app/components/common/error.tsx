import { StyleSheet, Text, View } from "react-native"

export default function Error({ error }: { error: string }) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{error}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0EEEE",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 24,
		fontFamily: "Exo2_400Regular",
		color: "#42302D",
	},
})
