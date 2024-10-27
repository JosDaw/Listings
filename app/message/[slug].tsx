import { FontAwesome } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { PacmanIndicator } from "react-native-indicators"
import LoadingAnimationScreen from "../components/common/loading-spinner"
import RoundedInput from "../components/common/rounded-input"
import { database } from "../config/firebase"
import useMessage from "../hooks/useMessage"
import useUser from "../store/useUser"
import { IMessage } from "../types"
import { showToast } from "../utils/common"

// TODO: show timestamps, show names

export default function MessageScreen() {
	const { slug } = useLocalSearchParams()
	const recipientID = slug as string

	const [newMessage, setNewMessage] = useState<string>("")
	const [isSending, setIsSending] = useState<boolean>(false)
	const { user } = useUser()
	const { messages, loading, error } = useMessage(recipientID.trim())

	// Local state to manage messages (optimistic update)
	const [localMessages, setLocalMessages] = useState<IMessage[]>(messages)

	// Update localMessages whenever messages from the hook changes
	useEffect(() => {
		setLocalMessages(messages)
	}, [messages])

	if (loading) return <LoadingAnimationScreen />
	if (error) return <Text>Error: {error}</Text>

	const handleSend = async (): Promise<void> => {
		if (!newMessage.trim()) {
			showToast("Please enter a message.", "error")
			return
		}

		setIsSending(true)

		// Create a new message object
		const newMessageObj: IMessage = {
			id: (localMessages.length + 1).toString(),
			text: newMessage,
			senderID: user.userID,
			senderName: user.name,
			recipientID,
			recipientName: messages[0]?.recipientName || "Unknown",
			dateCreated: Timestamp.now(),
		}

		try {
			// Optimistically update the UI by prepending the message at the start (the list is inverted!)
			setLocalMessages((prevMessages) => [newMessageObj, ...prevMessages])
			setNewMessage("")

			// Add new message to Firebase
			await addDoc(collection(database, "message"), {
				...newMessageObj,
				dateCreated: newMessageObj.dateCreated,
			})
		} catch (error) {
			console.error("Error sending message:", error)
			showToast("Failed to send message.", "error")

			// Revert optimistic update if error occurs
			setLocalMessages((prevMessages) =>
				prevMessages.filter((msg) => msg.id !== newMessageObj.id)
			)
		} finally {
			setIsSending(false)
		}
	}

	const renderMessage = ({ item }: { item: IMessage }) => (
		<View
			style={[
				styles.messageContainer,
				item.senderID === user.userID
					? styles.userMessage
					: styles.otherMessage,
			]}
		>
			<View
				style={
					item.senderID === user.userID ? styles.userAvatar : styles.otherAvatar
				}
			/>
			<View
				style={[
					styles.messageBubble,
					item.senderID === user.userID
						? styles.userBubble
						: styles.otherBubble,
				]}
			>
				<Text style={styles.text}>{item.text}</Text>
			</View>
		</View>
	)

	return (
		<View style={styles.container}>
			<FlatList
				data={localMessages}
				keyExtractor={(item) => item.id}
				renderItem={renderMessage}
				contentContainerStyle={styles.messagesList}
				inverted // So newest messages appear at the bottom
			/>
			<View style={styles.inputContainer}>
				{isSending ? (
					<PacmanIndicator color="#15392F" />
				) : (
					<>
						<RoundedInput
							placeholder="Type a message"
							secureTextEntry={false}
							value={newMessage}
							onChangeText={setNewMessage}
						/>
						<TouchableOpacity onPress={handleSend} style={styles.sendButton}>
							<FontAwesome name="send" size={24} color="#fff" />
						</TouchableOpacity>
					</>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F3F4F6",
	},
	messagesList: {
		padding: 16,
	},
	messageContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginVertical: 8,
	},
	otherMessage: {
		flexDirection: "row",
	},
	userMessage: {
		flexDirection: "row-reverse",
	},
	otherAvatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "#FBBF24",
		marginRight: 8,
	},
	userAvatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "#B9D9C3",
		marginLeft: 8,
	},
	messageBubble: {
		maxWidth: "75%",
		padding: 12,
		borderRadius: 12,
	},
	otherBubble: {
		backgroundColor: "#FFFFFF",
		borderColor: "#FBBF24",
		borderWidth: 3,
	},
	userBubble: {
		backgroundColor: "#FFFFFF",
		borderColor: "#B9D9C3",
		borderWidth: 3,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		borderTopWidth: 1,
		borderTopColor: "#ddd",
		backgroundColor: "#fff",
	},
	input: {
		flex: 1,
		padding: 12,
		borderRadius: 25,
		borderWidth: 1,
		borderColor: "#B9D9C3",
		backgroundColor: "#fff",
		marginRight: 8,
		fontFamily: "Exo2_400Regular",
	},
	sendButton: {
		padding: 10,
		backgroundColor: "#1E2E2E",
		borderRadius: 20,
	},
	text: {
		fontSize: 16,
		color: "#15392F",
		fontFamily: "Exo2_400Regular",
	},
})
