import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { database } from "../config/firebase"
import useUser from "../store/useUser"
import { IMessage } from "../types"

interface UseMessagesResult {
	messages: IMessage[]
	loading: boolean
	error: string | null
}

const useMessage = (recipientID: string): UseMessagesResult => {
	const [messages, setMessages] = useState<IMessage[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const { user } = useUser()

	useEffect(() => {
		if (!user || !user.userID) return

		const fetchMessages = async () => {
			setLoading(true)
			setError(null)

			try {
				const messagesRef = collection(database, "message")

				let sentMessages: IMessage[] = []
				let receivedMessages: IMessage[] = []

				// Query for messages sent by the user
				try {
					const sentMessagesQuery = query(
						messagesRef,
						where("senderID", "==", user.userID),
						where("recipientID", "==", recipientID)
					)

					const sentMessagesSnapshot = await getDocs(sentMessagesQuery)

					sentMessages = sentMessagesSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					})) as IMessage[]
				} catch (error) {
					console.error("Error executing sent messages query:", error)
				}

				// Query for messages received by the user
				try {
					const receivedMessagesQuery = query(
						messagesRef,
						where("senderID", "==", recipientID),
						where("recipientID", "==", user.userID)
					)

					const receivedMessagesSnapshot = await getDocs(receivedMessagesQuery)

					receivedMessages = receivedMessagesSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					})) as IMessage[]
				} catch (error) {
					console.error("Error executing received messages query:", error)
				}

				// Combine and sort by dateCreated in ascending order
				const allMessages = [...sentMessages, ...receivedMessages]

				const sortedMessages = allMessages.sort((a, b) => {
					const dateA = (a.dateCreated as any).toMillis
						? (a.dateCreated as any).toMillis()
						: 0
					const dateB = (b.dateCreated as any).toMillis
						? (b.dateCreated as any).toMillis()
						: 0
					return dateB - dateA
				})

				setMessages(sortedMessages)
			} catch (error) {
				console.error("Error fetching messages:", error)
				setError("Failed to fetch messages.")
			} finally {
				setLoading(false)
			}
		}

		fetchMessages()
	}, [user, recipientID])

	return { messages, loading, error }
}

export default useMessage
