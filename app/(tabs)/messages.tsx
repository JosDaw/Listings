import React from "react"
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native"
import LoadingAnimationScreen from "../components/common/loading-spinner"
import MessageCard from "../components/messages/message-card"
import useMessages from "../hooks/useMessages"

export default function MessagesScreen() {
	const { messages, loading, error } = useMessages()

	if (loading) {
		return <LoadingAnimationScreen />
	}

	return (
		<View style={styles.container}>
			{error && <Text style={styles.errorText}>{error}</Text>}
			<FlatList
				data={messages}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <MessageCard message={item} />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	errorText: {
		color: "red",
		textAlign: "center",
		marginBottom: 16,
	},
})
