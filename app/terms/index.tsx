import { ScrollView, StyleSheet, View } from "react-native"

// TODO: fix this
export default function Terms() {
	return (
		<ScrollView
			contentContainerStyle={styles.scrollContainer}
			style={styles.background}
		>
			<View style={styles.container}>
				<View style={styles.childContainer}></View>
			</View>
		</ScrollView>
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
