import { useLocalSearchParams } from "expo-router"
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { database } from "../config/firebase"
import useUser from "../store/useUser"

export default function MessageScreen() {
  const { slug } = useLocalSearchParams()
  const itemId = slug as string

  const [messages, setMessages] = useState<{ id: string; text: string; userID: string; senderName: string; dateCreated: Timestamp; recipientID: string }[]>([])
  const [newMessage, setNewMessage] = useState("")
  const { user } = useUser() // Assuming this provides the current user's info


  return (
    <View style={styles.container}>
    
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