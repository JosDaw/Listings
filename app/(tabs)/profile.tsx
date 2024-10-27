import React from "react"
import { useState } from "react"
import { View, Text, ActivityIndicator, Button, TextInput, StyleSheet } from 'react-native';
import useProfile from '../hooks/useProfile';
import LoadingAnimationScreen from "../components/common/loading-spinner"

export default function ProfileScreen() {
  const { profile, loading, error, updateProfile } = useProfile();
  const [newFirstName, setNewFirstName] = useState(profile?.firstName || '');

  const handleProfile = async () => {
    await updateProfile({ firstName: newFirstName });
  };

  if (loading) {
	return <LoadingAnimationScreen />
	}
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.card}>
      <Text style={styles.senderName}>Name: {profile?.firstName}</Text>
	 <Text style={styles.senderName}>User ID: {profile?.lastName}</Text>
      <Text style={styles.senderName}>Email: {profile?.phone}</Text>
      
      <TextInput 
        value={newFirstName}
        onChangeText={setNewFirstName}
        placeholder="Update First Name"
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />
      <Button title="Update Profile" onPress={handleProfile} />
    </View>
  );
};

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
	}
})