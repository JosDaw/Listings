import { useLocalSearchParams } from "expo-router"
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { FlatList, TextInput, TouchableOpacity, View } from "react-native"
import { database } from "../config/firebase"
import useUser from "../store/useUser"

export default function MessageScreen() {
	const { slug } = useLocalSearchParams()
	const itemId = slug as string

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const { user } = useUser() // Assuming this provides the current user's info

  useEffect(() => {
    // Set up a Firestore query to fetch messages in order by their creation time
    const messagesRef = collection(database, "messages")
    const q = query(messagesRef, orderBy("dateCreated"))

    // Real-time listener for messages
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setMessages(messagesData)
    })

    // Cleanup subscription on unmount
    return unsubscribe
  }, [])

  const handleSend = async () => {
    if (newMessage.trim() === "") return

    try {
      const messagesRef = collection(database, "messages")
      await addDoc(messagesRef, {
        text: newMessage,
        userID: user.userID, // Assuming user object contains `userID`
        senderName: user.name || "User", // Assuming user object contains `name`
        dateCreated: Timestamp.now(),
        recipientID: "otherUserID", // Replace this with actual recipient ID if applicable
      })
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message: ", error)
    }
  }

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.userID === user.userID ? styles.userMessage : styles.otherMessage]}>
      <View style={item.userID === user.userID ? styles.userAvatar : styles.otherAvatar} />
      <View style={[styles.messageBubble, item.userID === user.userID ? styles.userBubble : styles.otherBubble]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        inverted // So newest messages appear at the bottom
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
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
    alignItems: "center",
    marginVertical: 8,
  },
  otherMessage: {
    flexDirection: "row",
  },
  userMessage: {
    flexDirection: "row-reverse",
  },
  otherAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#A9DFBF",
    marginRight: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FBBF24",
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 12,
  },
  otherBubble: {
    backgroundColor: "#FFFFFF",
    borderColor: "#B9D9C3",
    borderWidth: 1,
  },
  userBubble: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FBBF24",
    borderWidth: 1,
  },
  messageText: {
    color: "#1E2E2E",
    fontSize: 16,
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
  },
  sendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#5271FF",
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
})