import { IMessage } from "@/app/types"
import { Entypo, Ionicons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, Text, View } from "react-native"

interface MessageCardProps {
  message: IMessage
}

export default function MessageCard({ message }: MessageCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.senderName}>{message.senderName || "Realtor 1"}</Text>
      <Entypo name="message" size={35} color="#FBBF24" style={styles.icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 3,
    borderColor: "#B9D9C3",
    marginVertical: 8,
  },
  senderName: {
    fontSize: 22,
    color: "#1E2E2E",
    fontFamily: "Exo2_400Regular",
  },
  icon: {
    marginLeft: 8,
  },
})
