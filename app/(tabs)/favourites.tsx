import { FontAwesome } from "@expo/vector-icons"
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	Timestamp,
	where,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import Error from "../components/common/error"
import LoadingAnimationScreen from "../components/common/loading-spinner"
import { database } from "../config/firebase"
import useUser from "../store/useUser"
import { IListing } from "../types"
import { showToast } from "../utils/common"

const screenWidth = Dimensions.get("window").width

export default function FavouritesScreen() {
	const [favorites, setFavorites] = useState<IListing[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const { user } = useUser()

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				setLoading(true)

				// Step 1: Get favorite listing IDs from `favorite` collection for the current user
				const favoritesQuery = query(
					collection(database, "favorite"),
					where("userID", "==", user.userID)
				)
				const favoriteDocs = await getDocs(favoritesQuery)

				// Extract listing IDs from the favorites
				const listingIDs = favoriteDocs.docs.map((doc) => doc.data().listingID)

				// Step 2: Fetch listings based on listing IDs
				const listings = await Promise.all(
					listingIDs.map(async (listingID) => {
						const listingDoc = await getDoc(doc(database, "listing", listingID))
						if (listingDoc.exists()) {
							return { id: listingDoc.id, ...listingDoc.data() } as IListing
						}
						return null
					})
				)

				// Filter out null values (in case any listings were missing)
				setFavorites(
					listings.filter((listing): listing is IListing => listing !== null)
				)
			} catch (err) {
				setError("Failed to load favorites.")
			} finally {
				setLoading(false)
			}
		}

		if (user) {
			fetchFavorites()
		}
	}, [user])

	if (loading) {
		return <LoadingAnimationScreen />
	}

	if (error) {
		return <Error error={error} />
	}

	const handleContact = async (item: IListing) => {
		// Add new message to Firebase
		try {
			// Add to message collection on Firebase
			await addDoc(collection(database, "message"), {
				text: "I am interested in your listing for " + item.title,
				senderID: user.userID,
				senderName: user.name,
				recipientID: item.realtorID,
				recipientName: item.realtorName,
				dateCreated: Timestamp.now(),
			})
			showToast("Realtor contacted!", "success")
		} catch (error) {
			showToast("Error adding to favorites collection", "error")
		}
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={favorites}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<Image source={{ uri: item.images[0] }} style={styles.image} />
						<TouchableOpacity
							onPress={() => handleContact(item)}
							style={styles.iconButton}
						>
							<FontAwesome name="send" size={24} color="#15392F" />
						</TouchableOpacity>
					</View>
				)}
				ListEmptyComponent={<Text>No favorites found.</Text>}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F9FA",
		padding: 10,
	},
	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#BEDBBE",
		marginBottom: 15,
		overflow: "hidden",
		position: "relative",
	},
	image: {
		width: screenWidth - 20, // Full width minus padding
		height: 200,
		borderRadius: 10,
	},
	iconButton: {
		position: "absolute",
		top: 10,
		right: 10,
		padding: 8,
		borderRadius: 15,
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#BEDBBE",
	},
	icon: {
		fontSize: 16,
		color: "#2D423D",
	},
})
