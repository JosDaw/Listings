import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native"

import { addDoc, collection, Timestamp, where } from "firebase/firestore"
import { useMemo } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Error from "../components/common/error"
import LoadingAnimationScreen from "../components/common/loading-spinner"
import ListingCard from "../components/listing/listing-card"
import { database } from "../config/firebase"
import useSingleListing from "../hooks/useSingleListing"
import useFilter from "../store/useFilter"
import useUser from "../store/useUser"
import { IListing } from "../types"
import { showToast } from "../utils/common"

export default function HomeScreen() {
	const { filter } = useFilter()
	const { user } = useUser()

	// Memoize the custom filters to ensure they remain stable across renders
	const customFilters = useMemo(() => {
		const filters = [where("isDeleted", "==", false)]

		// Construct custom filters based on input values from the `filter` prop
		if (filter.homeType)
			filters.push(where("filters.homeType", "==", filter.homeType))
		// if (filter.bedrooms) filters.push(where('filters.bedrooms', '==', filter.bedrooms));
		// if (filter.bathrooms) filters.push(where('filters.bathrooms', '==', filter.bathrooms));
		// if (filter.minCost) filters.push(where('filters.cost', '>=', filter.minCost));
		// if (filter.maxCost) filters.push(where('filters.cost', '<=', filter.maxCost));
		// if (filter.floors) filters.push(where('filters.floors', '==', filter.floors));
		// if (filter.minSquareFootage) filters.push(where('filters.footage', '>=', filter.minSquareFootage));

		return filters
	}, [filter])

	// Pass the customFilters to useSingleListing
	const { listing, loading, error } = useSingleListing({
		customFilters: customFilters,
	})

	const handleSwipeRight = async (listing: IListing) => {
		try {
			// Add to favourites collection on Firebase
			await addDoc(collection(database, "favorite"), {
				userID: user.userID,
				listingID: listing.id,
				dateCreated: Timestamp.now(),
			})
			showToast("Favorited!", "success")
		} catch (error) {
			showToast("Error adding to favorites collection", "error")
		}
	}

	const handleSwipeLeft = async (listing: IListing) => {
		try {
			// Add to hidden collection on Firebase
			await addDoc(collection(database, "hidden"), {
				userID: user.userID,
				listingID: listing.id,
				dateCreated: Timestamp.now(),
			})
			showToast("Hidden!", "error")
		} catch (error) {
			showToast("Error adding to hidden collection", "error")
		}
	}

	if (loading) {
		return <LoadingAnimationScreen />
	}

	if (error) {
		return <Error error={error} />
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				{listing ? (
					<ListingCard
						listing={listing}
						onSwipeLeft={handleSwipeLeft}
						onSwipeRight={handleSwipeRight}
					/>
				) : (
					<Text>No listings found</Text>
				)}
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0EEEE",
		alignItems: "center",
		justifyContent: "center",
	},
})
