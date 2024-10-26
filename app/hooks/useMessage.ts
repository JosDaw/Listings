import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
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
    console.log("🚀 ~ useEffect ~ user.userID:", user.userID)
    const senderQuery = query(messagesRef, where("senderID", "==", user.userID))

    const unsubscribeRecipient = onSnapshot(
      recipientQuery,
      (snapshot) => {
        const recipientMessages = snapshot.docs.map((doc) => formatMessage(doc))
        handleCombinedMessages(recipientMessages)
      },
      (error) => handleSnapshotError(error)
    )

    const unsubscribeSender = onSnapshot(
      senderQuery,
      (snapshot) => {
        const senderMessages = snapshot.docs.map((doc) => formatMessage(doc))
        handleCombinedMessages(senderMessages)
      },
      (error) => handleSnapshotError(error)
    )

    return () => {
      unsubscribeRecipient()
      unsubscribeSender()
    }
  }, [user])

  // Format message from Firestore doc
  const formatMessage = (doc: any): IMessage => {
    const data = doc.data()
    return {
      id: doc.id,
      senderID: data.userID,
      senderName: data.senderName || "Anonymous",
      recipientID: data.recipientID,
      recipientName: data.recipientName || "Anonymous",
      text: data.text,
      dateCreated: data.dateCreated,
    }
  }

  // Function to handle combining and filtering messages
  const handleCombinedMessages = (newMessages: IMessage[]) => {
    setMessages((prevMessages) => {
      const combinedMessages = [...(prevMessages || []), ...newMessages]
      return getUniqueMessagesByOtherParty(combinedMessages)
    })
    setLoading(false)
  }

  // Handle snapshot error
  const handleSnapshotError = (error: any) => {
    console.error("Error fetching messages:", error)
    setError("Failed to fetch messages.")
    setLoading(false)
  }

  // Filter unique messages by the other party (either sender or recipient)
  const getUniqueMessagesByOtherParty = (messages: IMessage[]) => {
    const uniqueMessages: { [key: string]: IMessage } = {}
    messages.forEach((message) => {
      const otherPartyID = message.senderID === user.userID ? message.recipientID : message.senderID
      // Only add the first message per unique other party
      if (!uniqueMessages[otherPartyID]) {
        uniqueMessages[otherPartyID] = message
      }
    })
    return Object.values(uniqueMessages)
  }

  return { messages, loading, error }
}

export default useMessages
