import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { database } from "../config/firebase"
import useUser from "../store/useUser"
import { IMessage } from "../types"

interface UseMessagesResult {
  messages: IMessage[] | null
  loading: boolean
  error: string | null
}

const useMessages = (): UseMessagesResult => {
  const [messages, setMessages] = useState<IMessage[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useUser()

  useEffect(() => {
    if (!user || !user.userID) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    // Query for messages where the user is the recipient
    const messagesRef = collection(database, "message")
    const recipientQuery = query(messagesRef, where("recipientID", "==", user.userID))

    const unsubscribeRecipient = onSnapshot(
      recipientQuery,
      (snapshot) => {
        const recipientMessages = snapshot.docs.map((doc) => formatMessage(doc))
        handleCombinedMessages(recipientMessages)
      },
      (error) => handleSnapshotError(error)
    )

    return () => {
      unsubscribeRecipient()
    }
  }, [user?.userID])

  // Format message from Firestore doc
  const formatMessage = useCallback((doc: any): IMessage => {
    const data = doc.data()
    return {
      id: doc.id,
      senderID: data.senderID,
      senderName: data.senderName || "Anonymous",
      recipientID: data.recipientID,
      recipientName: data.recipientName || "Anonymous",
      text: data.text,
      dateCreated: data.dateCreated,
    }
  }, [])

  // Function to handle combining and filtering messages
  const handleCombinedMessages = useCallback((newMessages: IMessage[]) => {
    setMessages((prevMessages) => {
      const combinedMessages = [...(prevMessages || []), ...newMessages]
      return getUniqueMessagesByOtherParty(combinedMessages)
    })
    setLoading(false)
  }, [])

  // Handle snapshot error
  const handleSnapshotError = useCallback((error: any) => {
    console.error("Error fetching messages:", error)
    setError("Failed to fetch messages.")
    setLoading(false)
  }, [])

  // Filter unique messages by the other party (either sender or recipient)
  const getUniqueMessagesByOtherParty = useCallback((messages: IMessage[]) => {
    const uniqueMessages: { [key: string]: IMessage } = {}
    messages.forEach((message) => {
      const otherPartyID = message.senderID === user.userID ? message.recipientID : message.senderID
      if (!uniqueMessages[otherPartyID]) {
        uniqueMessages[otherPartyID] = message
      }
    })
    return Object.values(uniqueMessages)
  }, [user.userID])

  return { messages, loading, error }
}

export default useMessages
